const Buff = require('./Buff');

class Controller {
	constructor(school) {
		this.schoolData = {
			buffs: require(`./schools/${school}/buffs`),		// eslint-disable-line global-require
			skills: require(`./schools/${school}/skills`),	// eslint-disable-line global-require
			recipes: require(`./schools/${school}/recipes`),	// eslint-disable-line global-require
			talents: require(`./schools/${school}/talents`),	// eslint-disable-line global-require
		};
		this.buffCtrl = {
			list: [],
		};
		this.skillCtrl = {
			list: [],
			curSkill: null,
		};
		return this;
	}

	static isTalentActive(name) {
		for (const activeTalent of this.config.talents) {
			if (activeTalent.name == name) {
				return true;
			}
		}
		return false;
	}

	static getBuff(name) {
		for (const buff of this.buffs) {
			if (buff.name == name) {
				return new Buff(buff);
			}
		}
		return false;
	}

	static getActiveBuff(name) {
		// not implemented
	}

	static getActiveDebuff(name) {
		// not implemented
	}

	static addBuff(buff) {
		this.selfBuff.push(buff);
	}

	static addDebuff(buff) {
		this.targetBuff.push(buff);
	}

	otaCtrl() {
		if (this.myself.states.ota) {
			this.myself.states.otaRemain--;
			const skill = this.skillController.curSkill;
			if (this.myself.states.otaRemain <= 0) {
				this.myself.states.curOta = 0;
				this.myself.states.ota = false;
				skill.calc(this);
				skill.onSkillFinish(this);
			} else if (skill.type == 'channel') {
				if ((this.myself.states.curOta - this.myself.states.otaRemain) % this.myself.states.curInterval === 0) {
					skill.calc(this);
				}
			}
		}
	}

	cdCtrl() {
		for (const skill of this.skillCtrl.list) {
			if (skill.cdRemain > 0) {
				skill.cdRemain--;
			}
			if (skill.cdRemain < 0) {
				skill.cdRemain = 0;
			}
		}
	}

	buffTimeCtrl() {
		for (const buff of this.buffCtrl.list) {
			buff.remain--;
			if ((buff.duration - buff.remain) % buff.interval === 0 && buff.type == 'dot') {
				buff.calc(this);
			}
			if (buff.remain <= 0) {
				this.deleteBuff(buff.name);
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
		for (const buff of this.buffCtrl.list) {
			if (buff.type == 'buff') {
				for (const key of Object.keys(buff.data)) {
					const buffNumber = buff.data[key];
					this.myself.extra[key] += buffNumber * buff.level;
				}
			}
		}
	}

	digest() {
		// 执行宏程序
		this.macro();
		// 读条 时间控制
		this.otaCtrl();
		// 公共CD 时间控制
		if (this.myself.states.gcd > 0) {
			this.myself.states.gcd--;
		}
		// 技能CD 时间控制
		this.cdCtrl();
		// buff 时间控制
		this.buffTimeCtrl();
		// 计算增益属性
		this.extraAttributeApply();
		// dps 计算
		this.time++;
		if (this.time % 16 === 0) {
			this.dps = (this.globalDamage / this.time) * 16;
			if (this.kill) this.target.curLife = this.target.life - this.globalDamage;
			if (this.target.curLife <= 0) {
				this.stop();
			}
		}
	}
}

module.exports = Controller;
