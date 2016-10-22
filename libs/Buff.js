const Utils = require('./Utils');

class Buff {
	constructor(data) {
		// 初始化 Buff 的额外加成
		this.extraAttr = {
			damage: 0,
			attackAddPercent: 0,
			attackAddBase: 0,
			critAddPercent: 0,
			critAddBase: 0,
			hitAddPercent: 0,
			hitAddBase: 0,
			critEffAddPercent: 0,
			critEffAddBase: 0,
			overcomeAddPercent: 0,
			overcomeAddBase: 0,
			strainAddPercent: 0,
			strainAddBase: 0,
		};
		// 载入数据
		for (const key of Object.keys(data)) {
			this[key] = data[key];
		}
		this.level = 1;
		return this;
	}

	calc(ctrl) {
		// 面板攻击 = 基础攻击 + 最受益属性 * 最受益属性加成 * (Buff 攻击百分比加成 + 自身攻击百分比加成) + Buff 攻击加成 + 自身攻击加成
		const attack = parseInt(ctrl.myself.attributes.basicAttack, 10) +
			(ctrl.myself.attributes.spunk * 1.95 *						// TODO: 支持多心法最受益属性
				(1 + (this.extraAttr.attackAddPercent / 100) +
				(ctrl.myself.extra.attackAddPercent / 100))) +
			this.extraAttr.attackAddBase +
			ctrl.myself.extra.attackAddBase;
		// 会心率 = 自身会心率 + (Buff 会心等级加成 + 自身会心等级加成) / 41.43925 + Buff 会心率加成 + 自身会心率加成
		const crit = parseFloat(ctrl.myself.attributes.crit) +
			((this.extraAttr.critAddBase + ctrl.myself.extra.critAddBase) / 41.43925) +
			this.extraAttr.critAddPercent + ctrl.myself.extra.critAddPercent;
		// 会效率 = 自身会效率 + (Buff 会效等级加成 + 自身会效等级加成) / 15.066 + Buff 会效率加成 + 自身会效率加成
		const critEff = parseFloat(ctrl.myself.attributes.critEff) +
			((this.extraAttr.critEffAddBase + ctrl.myself.extra.critEffAddBase) / 15.066) +
			this.extraAttr.critEffAddPercent + ctrl.myself.extra.critEffAddPercent;
		// 命中率 = 自身命中率 + (Buff 命中等级加成 + 自身命中等级加成) / 34.24725 + Buff 命中率加成 + 自身命中率加成
		const hit = parseFloat(ctrl.myself.attributes.hit) +
			((this.extraAttr.hitAddBase + ctrl.myself.extra.hitAddBase) / 34.24725) +
			this.extraAttr.hitAddPercent + ctrl.myself.extra.hitAddPercent;
		// 无双率 = 自身无双率 + (Buff 无双等级加成 + 自身无双等级加成) / 25.6835 + Buff 无双率加成 + 自身无双率加成
		const strain = parseFloat(ctrl.myself.attributes.strain) +
			((this.extraAttr.strainAddBase + ctrl.myself.extra.strainAddBase) / 25.6835) +
			this.extraAttr.strainAddPercent + ctrl.myself.extra.strainAddPercent;
		// 破防 = 自身破防等级 + 基础破防等级 * (Buff 破防百分比加成 + 自身破防百分比加成) + Buff 破防等级加成 + 自身破防等级加成
		const overcome = parseInt(ctrl.myself.attributes.overcome, 10) +
			((ctrl.myself.attributes.overcome - (ctrl.myself.attributes.spunk * 0.34)) *
				((this.extraAttr.overcomeAddPercent / 100) + (ctrl.myself.extra.overcomeAddPercent / 100))) +
			parseInt(this.extraAttr.overcomeAddBase, 10) +
			parseInt(ctrl.myself.extra.overcomeAddBase, 10);

		const onFightAttr = {
			attack,
			crit,
			critEff,
			hit,
			strain,
			overcome,
			basicAttack: parseInt(ctrl.myself.attributes.basicAttack, 10),
			haste: parseInt(ctrl.myself.attributes.haste, 10),
			extraHaste: parseInt(ctrl.myself.extra.haste, 10),
			damageAddPercent: this.extraAttr.damage + parseInt(ctrl.myself.extra.damage, 10),
		};

		let damage = 0;
		const strainRequire = ctrl.target.strainRequire;
		// 识破率 = 无双要求 - 当前无双率
		let insightRate = strainRequire - onFightAttr.strain;
		insightRate = parseFloat(insightRate < 0 ? 0 : insightRate);
		const roll = Math.random() * 100;
		const flag = {
			insight: false,
			crit: false,
			hit: false,
		};
		if (roll <= insightRate) {
			flag.insight = true;
		} else if (roll <= insightRate + parseFloat(onFightAttr.crit)) {
			flag.crit = true;
			this.onSkillCritEvent(ctrl);
		} else {
			flag.hit = true;
			this.onSkillHitEvent(ctrl);
		}

		if ((!flag.miss) && (ctrl.target.curLife / ctrl.target.life) < 0.35) {
			// TODO: 斩杀控制
		}

		// 伤害 = (攻击 * Buff 系数 + 随机浮动伤害 * (识破与否 * 0.25 + 会心与否 * 会效率 + 命中与否)) * 破防加成
		damage = ((onFightAttr.attack * this.cof) +
			((this.max - this.min) * Math.random()) + this.min) *
			((0.25 * flag.insight) + ((onFightAttr.critEff / 100) * flag.crit) + (1 * flag.hit));
		damage = damage * (1 + (onFightAttr.overcome / 3616.925)) *
			(1 - (ctrl.target.shield / 100)) *
			(1 + (onFightAttr.damageAddPercent / 100));
		damage = damage.toFixed(0) * this.level;
		const status = (flag.insight ? '识破' : '') + (flag.crit ? '会心' : '') + (flag.hit ? '命中' : '');
		const log = `${this.name}(buff) ${status} ${damage}`;

		Utils.logln(log);
		ctrl.addDamage(damage);
		return damage;
	}
}

module.exports = Buff;
