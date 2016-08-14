const Utils = require('./Utils');

class Skill {
	constructor(data) {
		this.data = data;
		this.data.cdRemain = 0;
		return this;
	}

	applyRecipe(ctrl) {
		for (let i = 0; i < ctrl.recipes.length; i++) {
			if (ctrl.recipes[i].active) {
				switch (ctrl.recipes[i].effect) {
				case 'frameMinus':
					this.ota = this.ota - ctrl.recipes[i].value;
					break;
				case 'damageAddPercent':
					this.extraAttr.damage = this.extraAttr.damage + ctrl.recipes[i].value;
					break;
				case 'costMinusPercent':
						// this.cost
					break;
				case 'critAddPercent':
					this.extraAttr.critAddPercent = this.extraAttr.critAddPercent + ctrl.recipes[i].value;
					break;
				case 'cdMinus':
					this.cd = this.cd - ctrl.recipes[i].value;
					break;
				case 'hitAddPercent':
					this.extraAttr.hitAddPercent = this.extraAttr.hitAddPercent + ctrl.recipes[i].value;
					break;
				default:
					break;
				}
			}
		}
	}

	calc(ctrl) {
		// 面板攻击 = 基础攻击 + 最受益属性 * 最受益属性加成 * (Buff 攻击百分比加成 + 自身攻击百分比加成) + Buff 攻击加成 + 自身攻击加成
		const attack = parseInt(ctrl.self.attributes.basicAttack, 10) +
			(ctrl.self.attributes.spunk * 1.95 *						// TODO: 支持多心法最受益属性
				(1 + (this.extraAttr.attackAddPercent / 100) +
				(ctrl.self.extra.attackAddPercent / 100))) +
			this.extraAttr.attackAddBase +
			ctrl.self.extra.attackAddBase;
		// 会心率 = 自身会心率 + (Buff 会心等级加成 + 自身会心等级加成) / 41.43925 + Buff 会心率加成 + 自身会心率加成
		const crit = parseFloat(ctrl.self.attributes.crit) +
			((this.extraAttr.critAddBase + ctrl.self.extra.critAddBase) / 41.43925) +
			this.extraAttr.critAddPercent + ctrl.self.extra.critAddPercent;
		// 会效率 = 自身会效率 + (Buff 会效等级加成 + 自身会效等级加成) / 15.066 + Buff 会效率加成 + 自身会效率加成
		const critEff = parseFloat(ctrl.self.attributes.critEff) +
			((this.extraAttr.critEffAddBase + ctrl.self.extra.critEffAddBase) / 15.066) +
			this.extraAttr.critEffAddPercent + ctrl.self.extra.critEffAddPercent;
		// 命中率 = 自身命中率 + (Buff 命中等级加成 + 自身命中等级加成) / 34.24725 + Buff 命中率加成 + 自身命中率加成
		const hit = parseFloat(ctrl.self.attributes.hit) +
			((this.extraAttr.hitAddBase + ctrl.self.extra.hitAddBase) / 34.24725) +
			this.extraAttr.hitAddPercent + ctrl.self.extra.hitAddPercent;
		// 无双率 = 自身无双率 + (Buff 无双等级加成 + 自身无双等级加成) / 25.6835 + Buff 无双率加成 + 自身无双率加成
		const strain = parseFloat(ctrl.self.attributes.strain) +
			((this.extraAttr.strainAddBase + ctrl.self.extra.strainAddBase) / 25.6835) +
			this.extraAttr.strainAddPercent + ctrl.self.extra.strainAddPercent;
		// 破防 = 自身破防等级 + 基础破防等级 * (Buff 破防百分比加成 + 自身破防百分比加成) + Buff 破防等级加成 + 自身破防等级加成
		const overcome = parseInt(ctrl.self.attributes.overcome, 10) +
			((ctrl.self.attributes.overcome - (ctrl.self.attributes.spunk * 0.34)) *
				((this.extraAttr.overcomeAddPercent / 100) + ctrl.self.extra.overcomeAddPercent)) +
			parseInt(this.extraAttr.overcomeAddBase, 10) +
			parseInt(ctrl.self.extra.overcomeAddBase, 10);

		const onFightAttr = {
			attack,
			crit,
			critEff,
			hit,
			strain,
			overcome,
			basicAttack: parseInt(ctrl.self.attributes.basicAttack, 10),
			haste: parseInt(ctrl.self.attributes.haste, 10),
			extraHaste: parseInt(ctrl.self.extra.haste, 10),
			damageAddPercent: this.extraAttr.damage + parseInt(ctrl.self.extra.damage, 10),
		};

		let damage = 0;
		const hitRequire = ctrl.target.hitRequire;
		const strainRequire = ctrl.target.strainRequire;
		let missRate = hitRequire - onFightAttr.hit;
		missRate = parseFloat(missRate < 0 ? 0 : missRate);
		let insightRate = strainRequire - onFightAttr.strain;
		insightRate = parseFloat(insightRate < 0 ? 0 : insightRate);
		const roll = Math.random() * 100;
		const flag = {
			miss: false,
			insight: false,
			crit: false,
			hit: false,
		};
		if (this.target) {
			if (roll <= missRate) {
				flag.miss = true;
			} else if (roll <= missRate + insightRate) {
				flag.insight = true;
				this.onSkillHitEvent(onFightAttr, ctrl);
			} else if (roll <= missRate + insightRate + parseFloat(onFightAttr.crit)) {
				flag.crit = true;
				this.onSkillCritEvent(onFightAttr, ctrl);
			} else {
				flag.hit = true;
				this.onSkillHitEvent(onFightAttr, ctrl);
			}
		} else {
			flag.hit = true;
			this.onSkillHitEvent(onFightAttr, ctrl);
		}

		if ((!flag.miss) && (ctrl.target.curLife / ctrl.target.life) < 0.35) {
			// TODO: 斩杀控制
		}
		// 水雷特效触发
		if (!flag.miss && this.damageInstant) {
			// // 水特效触发
			// if ($rootScope.effects.water !== 0) {
			// 	Utils.addBuff(Buff.getBuffById($rootScope.effects.water), onFightAttr);
			// }
			// // 雷特效触发
			// if ($rootScope.effects.thunder !== 0) {
			// 	const leiCD = $rootScope.originalBuffList.leiCD;
			// 	if (leiCD.id in buffController.selfBuffs) {}
			// 	else {
			// 		roll = Math.random() * 100;
			// 		if (roll < 10) {
			// 			Utils.addBuff(Buff.getBuffById($rootScope.effects.thunder), onFightAttr);
			// 			Utils.addBuff(leiCD, onFightAttr);
			// 		}
			// 	}
			// }
		}
		this.cdRemain = this.cd;
		let log = '';
		if (this.damageInstant) {
			damage = ((onFightAttr.attack * this.data.cof) +
				((this.data.max - this.data.min) * Math.random()) + this.data.min) *
				((0 * flag.miss) + (0.25 * flag.insight) +
				((onFightAttr.critEff / 100) * flag.crit) + (1 * flag.hit));

			damage = damage * (1 + (onFightAttr.overcome / 3616.925)) *
				(1 - (ctrl.target.shield / 100)) *
				(1 + (onFightAttr.damageAddPercent / 100));
			damage = damage.toFixed(0);
			Utils.calcDamage(damage);
		} else {
			damage = 0;
		}
		const status = (flag.miss > 0 ? '偏离' : '') + (flag.insight > 0 ? '识破' : '') +
			(flag.crit > 0 ? '会心' : '') + (flag.hit > 0 ? '命中' : '');
		log = `${this.data.name} ${status} ${damage}`;
		Utils.logln(log);
		return damage;
	}
}

module.exports = Skill;
