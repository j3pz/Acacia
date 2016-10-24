const Buff = require('./Buff');
const Skill = require('./Skill');
const Macro = require('./Macro');
const Utils = require('./Utils');

const targetList = {
	96: {
		id: 0,
		level: 96,
		name: '初级试炼木桩(96)',
		life: 5000000,
		mana: 5000000,
		curLife: 5000000,
		hitRequire: 102.5,
		strainRequire: 15,
		shield: 15,
	},
	97: {
		id: 1,
		level: 97,
		name: '中级试炼木桩(97)',
		life: 5000000,
		mana: 5000000,
		curLife: 5000000,
		hitRequire: 105,
		strainRequire: 20,
		shield: 25,
	},
	98: {
		id: 2,
		level: 98,
		name: '高级试炼木桩(98)',
		life: 5000000,
		mana: 5000000,
		curLife: 5000000,
		hitRequire: 110,
		strainRequire: 30,
		shield: 35,
	},
	99: {
		id: 3,
		level: 99,
		name: '极境试炼木桩(99)',
		life: 5000000,
		mana: 5000000,
		curLife: 5000000,
		hitRequire: 115,
		strainRequire: 40,
		shield: 40,
	},
};

class Controller {
	constructor(options) {
		const school = options.school;
		this.schoolData = {
			buffs: require(`./schools/${school}/buffs`),		// eslint-disable-line global-require
			skills: require(`./schools/${school}/skills`),		// eslint-disable-line global-require
			recipes: require(`./schools/${school}/recipes`),	// eslint-disable-line global-require
			talents: require(`./schools/${school}/talents`),	// eslint-disable-line global-require
			utils: require(`./schools/${school}/utils`),	// eslint-disable-line global-require
		};
		this.buffCtrl = {
			selfList: {},
			targetList: {},
		};
		this.skillCtrl = {
			list: {},
			curSkill: null,
		};
		this.myself = {
			attributes: options.self,
			extra: {
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
				haste: 0,
			},
			status: {
				ota: false,
				otaRemain: 0,
				curOta: 0,
				gcd: 0,
				curInterval: 0,
			},
		};
		this.target = targetList[options.target];
		this.setting = {
			effects: options.effects,
		};
		this.damage = 0;
		this.time = 0;
		this.logs = {};

		this.init(options);
		return this;
	}

	init(options) {
		this.recipes = this.schoolData.recipes;
		for (const key of Object.keys(options.recipes)) {
			for (let i = 0; i < options.recipes[key].length; i++) {
				const recipeId = options.recipes[key][i];
				this.recipes[key][recipeId].active = true;
			}
		}
		this.buffs = {};
		for (const buff of this.schoolData.buffs) {
			this.buffs[buff.name] = buff;
		}
		this.skills = {};
		for (const skill of this.schoolData.skills) {
			this.skillCtrl.list[skill.name] = new Skill(skill);
			this.skillCtrl.list[skill.name].applyRecipe(this);
		}
		this.talents = {};
		for (let i = 0; i < this.schoolData.talents.length; i++) {
			const talentGroup = this.schoolData.talents[i];
			for (let j = 0; j < talentGroup.length; j++) {
				const talent = talentGroup[j];
				if (j == options.talent[i]) {
					talent.active = true;
				}
				this.talents[talent.name] = talent;
			}
		}
	}

	// 控制器接口方法
	/**
	 * 向控制器自身 Buff 列表中添加一个 Buff
	 *
	 * @param {Buff} buff 一个 Buff 对象
	 *
	 * @memberOf Controller
	 */
	addBuff(buff) {
		if (!(buff.name in this.buffCtrl.selfList)) {
			this.buffCtrl.selfList[buff.name] = buff;
		} else {
			const existBuff = this.buffCtrl.selfList[buff.name];
			const level = Math.min(existBuff.level + 1, existBuff.maxLevel);
			this.buffCtrl.selfList[buff.name].level = level;
		}
		this.buffCtrl.selfList[buff.name].remain = buff.duration;
	}

	/**
	 * 向控制器目标 Buff 列表中添加一个 Buff
	 *
	 * @param {Buff} buff 一个 Buff 对象
	 *
	 * @memberOf Controller
	 */
	addDebuff(buff) {
		if (!(buff.name in this.buffCtrl.targetList)) {
			this.buffCtrl.targetList[buff.name] = buff;
		} else {
			const existBuff = this.buffCtrl.targetList[buff.name];
			const level = Math.min(existBuff.level + 1, existBuff.maxLevel);
			this.buffCtrl.targetList[buff.name].level = level;
		}
		this.buffCtrl.targetList[buff.name].remain = buff.duration;
	}

	/**
	 * 从控制器自身 Buff 列表中删除一个 Buff
	 *
	 * @param {string} buffName Buff 的名称
	 *
	 * @memberOf Controller
	 */
	deleteBuff(buffName) {
		if (buffName in this.buffCtrl.selfList) {
			delete this.buffCtrl.selfList[buffName];
		}
	}

	/**
	 * 从控制器目标 Buff 列表中删除一个 Buff
	 *
	 * @param {string} buffName Buff 的名称
	 *
	 * @memberOf Controller
	 */
	deleteDebuff(buffName) {
		if (buffName in this.buffCtrl.targetList) {
			delete this.buffCtrl.targetList[buffName];
		}
	}

	/**
	 * 刷新一个 dot。
	 *
	 * @param {string} buffName Buff 的名称
	 *
	 * @memberOf Controller
	 */
	dotRefresh(buffName) {
		if (buffName in this.buffCtrl.targetList) {
			const buff = this.buffCtrl.targetList[buffName];
			const refreshTime = buff.remain % buff.interval;
			const selfHaste = this.myself.attributes.haste;
			const extraHaste = this.myself.extra.haste;
			buff.remain = (((buff.duration / buff.interval) - 1) *
				Utils.hasteCalc(selfHaste, extraHaste, buff.interval)) +
				Utils.hasteCalc(selfHaste, extraHaste, refreshTime);
			buff.interval = Utils.hasteCalc(selfHaste, extraHaste, buff.interval);
			buff.duration = Utils.hasteCalc(selfHaste, extraHaste, buff.duration);
			if ('addedInterval' in buff) buff.addedInterval = false;
			if (buff.recipeName != 'none') {
				for (const recipe of this.recipes[buff.recipeName]) {
					if (recipe.active && recipe.effect == 'debuffAdd') {
						this.addDebuff(this.getBuff(recipe.value));
					}
				}
			}
		}
	}

	/**
	 * 获得一个正在生效的 Buff 的状态。
	 *
	 * @param {string} buffName Buff 的名称
	 * @returns {Buff|boolean} 如果该 Buff 存在，则返回这个 Buff，反之返回 false。
	 *
	 * @memberOf Controller
	 */
	getActiveBuff(buffName) {
		const buff = this.buffCtrl.selfList[buffName];
		if (buff) return buff;
		return false;
	}

	/**
	 *获得一个正在目标身上生效的 Buff 的状态。
	 *
	 * @param {string} buffName Buff 的名称
	 * @returns {Buff|boolean} 如果该 Buff 存在，则返回这个 Buff，反之返回 false。
	 *
	 * @memberOf Controller
	 */
	getActiveDebuff(buffName) {
		const buff = this.buffCtrl.targetList[buffName];
		if (buff) return buff;
		return false;
	}

	/**
	 * 从技能库中获取一个 Buff 对象
	 *
	 * @param {string} buffName Buff 的名称
	 * @returns {Buff|boolean} 如果该 Buff 存在，则返回这个 Buff，反之返回 false。
	 *
	 * @memberOf Controller
	 */
	getBuff(buffName) {
		const buff = this.buffs[buffName];
		if (buff) return new Buff(buff);
		return false;
	}

	/**
	 * 获取一个技能的状态。
	 *
	 * @param {string} skillName 技能的名称
	 * @returns 如果该技能存在，则返回这个技能本身，反之则返回 false
	 *
	 * @memberOf Controller
	 */
	getSkill(skillName) {
		const skill = this.skillCtrl.list[skillName];
		if (skill) return skill;
		return false;
	}

	/**
	 * 查看自身是否存在某个 Buff
	 *
	 * @param {string} buffName Buff 的名称
	 * @returns {boolean} 存在则返回 true，反之 false。
	 *
	 * @memberOf Controller
	 */
	hasBuff(buffName) {
		const buff = this.buffCtrl.selfList[buffName];
		if (buff) return true;
		return false;
	}

	/**
	 * 查看目标是否存在某个 Buff
	 *
	 * @param {string} buffName Buff 的名称
	 * @returns 存在则返回 true，反之 false。
	 *
	 * @memberOf Controller
	 */
	hasDebuff(buffName) {
		const buff = this.buffCtrl.targetList[buffName];
		if (buff) return true;
		return false;
	}

	/**
	 * 查看某个奇穴是否被激活
	 *
	 * @param {string} name 奇穴名称
	 * @returns {boolean} 返回激活的状态
	 *
	 * @memberOf Controller
	 */
	isTalentActive(name) {
		return this.talents[name].active;
	}

	addDamage(damage) {
		this.damage += damage * 1;
	}

	otaCtrl() {
		if (this.myself.status.ota) {
			this.myself.status.otaRemain--;
			const skill = this.skillCtrl.curSkill;
			if (this.myself.status.otaRemain <= 0) {
				this.myself.status.curOta = 0;
				this.myself.status.ota = false;
				skill.calc(this);
				skill.onSkillFinish(this);
			} else if (skill.type == 'channel') {
				if ((this.myself.status.curOta - this.myself.status.otaRemain)
					% this.myself.status.curInterval === 0) {
					skill.calc(this);
				}
			}
		}
	}

	cdCtrl() {
		for (const skillKey of Object.keys(this.skillCtrl.list)) {
			const skill = this.skillCtrl.list[skillKey];
			if (skill.cdRemain > 0) {
				skill.cdRemain--;
			}
			if (skill.cdRemain < 0) {
				skill.cdRemain = 0;
			}
		}
	}

	buffTimeCtrl() {
		for (const buffKey of Object.keys(this.buffCtrl.selfList)) {
			const buff = this.buffCtrl.selfList[buffKey];
			buff.remain--;
			if ((buff.duration - buff.remain) % buff.interval === 0 && buff.type == 'dot') {
				buff.calc(this);
			}
			if (buff.remain <= 0 || buff.level <= 0) {
				this.deleteBuff(buff.name);
			}
		}

		for (const buffKey of Object.keys(this.buffCtrl.targetList)) {
			const buff = this.buffCtrl.targetList[buffKey];
			buff.remain--;
			if ((buff.duration - buff.remain) % buff.interval === 0 && buff.type == 'dot') {
				buff.calc(this);
			}
			if (buff.remain <= 0 || buff.level <= 0) {
				this.deleteDebuff(buff.name);
			}
		}
	}

	extraAttributeApply() {
		this.myself.extra = {
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
			haste: 0,
		};
		for (const buffKey of Object.keys(this.buffCtrl.selfList)) {
			const buff = this.buffCtrl.selfList[buffKey];
			if (buff.type == 'buff') {
				for (const key of Object.keys(buff.data)) {
					const buffNumber = buff.data[key];
					this.myself.extra[key] += buffNumber * buff.level;
				}
			}
		}
		for (const buffKey of Object.keys(this.buffCtrl.targetList)) {
			const buff = this.buffCtrl.targetList[buffKey];
			if (buff.type == 'buff') {
				for (const key of Object.keys(buff.data)) {
					const buffNumber = buff.data[key];
					this.myself.extra[key] += buffNumber * buff.level;
				}
			}
		}
	}

	log(skillName, status, damage) {
		if (!this.logs[skillName]) {
			this.logs[skillName] = {
				count: 0,
				name: skillName,
				damage: 0,
				hit: { count: 0, max: 0, min: 999999, damage: 0 },
				insight: { count: 0, max: 0, min: 999999, damage: 0 },
				miss: { count: 0, max: 0, min: 999999, damage: 0 },
				crit: { count: 0, max: 0, min: 999999, damage: 0 },
			};
		}
		this.logs[skillName].count ++;
		this.logs[skillName].damage += damage * 1;
		this.logs[skillName][status].count ++;
		this.logs[skillName][status].damage += damage * 1;

		if (damage <= this.logs[skillName][status].min) {
			this.logs[skillName][status].min = damage;
		}
		if (damage > this.logs[skillName][status].max) {
			this.logs[skillName][status].max = damage;
		}
		this.addDamage(damage);
	}

	digest() {
		// 执行宏程序
		this.runMacro();
		// 读条 时间控制
		this.otaCtrl();
		// 公共CD 时间控制
		if (this.myself.status.gcd > 0) {
			this.myself.status.gcd--;
		}
		// 技能CD 时间控制
		this.cdCtrl();
		// buff 时间控制
		this.buffTimeCtrl();
		// 计算增益属性
		this.extraAttributeApply();
		// dps 计算
		this.time++;
		// if (this.time % 16 === 0) {
		// 	this.dps = (this.globalDamage / this.time) * 16;
		// 	if (this.kill) this.target.curLife = this.target.life - this.globalDamage;
		// 	if (this.target.curLife <= 0) {
		// 		this.stop();
		// 	}
		// }
	}

	runMacro() {
		// /cast [tnobuff:兰摧玉折&tnobuff:钟林毓秀] 乱洒青荷
		if (Macro.tnobuff(this, '兰摧玉折') && Macro.tnobuff(this, '钟林毓秀')) {
			if (Macro.cast(this, '乱洒青荷')) return;
		}
		// /cast [tnobuff:兰摧玉折&tnobuff:钟林毓秀&buff:乱洒青荷] 阳明指
		if (Macro.tnobuff(this, '兰摧玉折') && Macro.tnobuff(this, '钟林毓秀')
			&& Macro.buff(this, '乱洒青荷')) {
			if (Macro.cast(this, '阳明指')) return;
		}
		// /cast [tnobuff:兰摧玉折] 兰摧玉折
		if (Macro.tnobuff(this, '兰摧玉折')) {
			if (Macro.cast(this, '兰摧玉折')) return;
		}
		// /cast [tnobuff:商阳指] 商阳指
		if (Macro.tnobuff(this, '商阳指')) {
			if (Macro.cast(this, '商阳指')) return;
		}
		// /cast [tnobuff:钟林毓秀] 阳明指
		if (Macro.tnobuff(this, '钟林毓秀')) {
			if (Macro.cast(this, '阳明指')) return;
		}
		// /cast [bufftime:焚玉<2|nobuff:焚玉&tbuff:钟林毓秀&tbuff:兰摧玉折&tbuff:商阳指] 水月无间
		if ((Macro.bufftime(this, '焚玉', 2, '<') || Macro.nobuff(this, '焚玉'))
			&& Macro.tbuff(this, '钟林毓秀') && Macro.tbuff(this, '兰摧玉折')
			&& Macro.tbuff(this, '商阳指')) {
			if (Macro.cast(this, '水月无间')) return;
		}
		// /cast [bufftime:焚玉<2|nobuff:焚玉&tbuff:钟林毓秀&tbuff:兰摧玉折&tbuff:商阳指] 玉石俱焚
		if ((Macro.bufftime(this, '焚玉', 2, '<') || Macro.nobuff(this, '焚玉'))
			&& Macro.tbuff(this, '钟林毓秀') && Macro.tbuff(this, '兰摧玉折')
			&& Macro.tbuff(this, '商阳指')) {
			if (Macro.cast(this, '玉石俱焚')) return;
		}
		// /cast 阳明指
		if (Macro.cast(this, '阳明指')) return;
	}

}

module.exports = Controller;
