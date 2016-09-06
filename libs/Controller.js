const Buff = require('./Buff');
const Macro = require('./Macro');

class Controller {
	constructor(options) {
		const school = options.school;
		this.schoolData = {
			buffs: require(`./schools/${school}/buffs`),		// eslint-disable-line global-require
			skills: require(`./schools/${school}/skills`),	// eslint-disable-line global-require
			recipes: require(`./schools/${school}/recipes`),	// eslint-disable-line global-require
			talents: require(`./schools/${school}/talents`),	// eslint-disable-line global-require
		};
		this.buffCtrl = {
			selfList: {},
			targetList: {},
		};
		this.skillCtrl = {
			list: {},
			curSkill: null,
		};
		this.myself = options.self;
		this.myself.status = {
			ota: false,
			otaRemain: 0,
			curOta: 0,
			gcd: 0,
			curInterval: 0,
		};
		this.init();
		return this;
	}

	init() {
		this.buffs = {};
		for (const buff of this.schoolData.buffs) {
			this.buffs[buff.name] = buff;
		}
		this.skills = {};
		for (const skill of this.schoolData.skills) {
			this.skillCtrl.list[skill.name] = skill;
		}
	}

	isTalentActive(name) {
		for (const activeTalent of this.config.talents) {
			if (activeTalent.name == name) {
				return true;
			}
		}
		return false;
	}

	getBuff(name) {
		const buff = this.buffs[name];
		if (buff) return buff;
		return false;
	}

	getSkill(name) {
		const skill = this.skillCtrl.list[name];
		if (skill) return skill;
		return false;
	}

	getActiveBuff(name) {
		const buff = this.buffCtrl.selfList[name];
		if (buff) return buff;
		return false;
	}

	getActiveDebuff(name) {
		const buff = this.buffCtrl.targetList[name];
		if (buff) return buff;
		return false;
	}

	addBuff(buff) {
		if (!(buff.name in this.buffCtrl.selfList)) {
			this.buffCtrl.selfList[buff.name] = buff;
		}
	}

	addDebuff(buff) {
		if (!(buff.name in this.buffCtrl.targetList)) {
			this.buffCtrl.targetList[buff.name] = buff;
		}
	}

	otaCtrl() {
		if (this.myself.status.ota) {
			this.myself.status.otaRemain--;
			const skill = this.skillController.curSkill;
			if (this.myself.status.otaRemain <= 0) {
				this.myself.status.curOta = 0;
				this.myself.status.ota = false;
				skill.calc(this);
				skill.onSkillFinish(this);
			} else if (skill.type == 'channel') {
				if ((this.myself.status.curOta - this.myself.status.otaRemain) % this.myself.status.curInterval === 0) {
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
			if (buff.remain <= 0) {
				this.deleteBuff(buff.name);
			}
		}

		for (const buffKey of Object.keys(this.buffCtrl.targetList)) {
			const buff = this.buffCtrl.targetList[buffKey];
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
		for (const buffKey of Object.keys(this.buffCtrl.selfList)) {
			const buff = this.buffCtrl.selfList[buffKey];
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
		if (this.time % 16 === 0) {
			this.dps = (this.globalDamage / this.time) * 16;
			if (this.kill) this.target.curLife = this.target.life - this.globalDamage;
			if (this.target.curLife <= 0) {
				this.stop();
			}
		}
	}

	runMacro() {
		// /cast [tnobuff:兰摧玉折&tnobuff:钟林毓秀] 乱洒青荷
		if (Macro.tnobuff('兰摧玉折', this) && Macro.tnobuff('钟林毓秀', this)) {
			if (Macro.cast('乱洒青荷')) return;
		}
		// /cast [tnobuff:兰摧玉折&tnobuff:钟林毓秀&buff:乱洒青荷] 阳明指
		if (Macro.tnobuff('兰摧玉折', this) && Macro.tnobuff('钟林毓秀', this)
			&& Macro.buff('乱洒青荷', this)) {
			if (Macro.cast('阳明指', this)) return;
		}
		// /cast [tnobuff:兰摧玉折] 兰摧玉折
		if (Macro.tnobuff('兰摧玉折', this)) {
			if (Macro.cast('兰摧玉折', this)) return;
		}
		// /cast [tnobuff:商阳指] 商阳指
		if (Macro.tnobuff('商阳指', this)) {
			if (Macro.cast('商阳指', this)) return;
		}
		// /cast [tnobuff:钟林毓秀] 阳明指
		if (Macro.tnobuff('钟林毓秀', this)) {
			if (Macro.cast('阳明指', this)) return;
		}
		// /cast [bufftime:焚玉<2|nobuff:焚玉&tbuff:钟林毓秀&tbuff:兰摧玉折&tbuff:商阳指] 水月无间
		if ((Macro.bufftime('焚玉', 2, '<', this) || Macro.nobuff('焚玉', this))
			&& Macro.tbuff('钟林毓秀', this) && Macro.tbuff('兰摧玉折', this)
			&& Macro.tbuff('商阳指', this)) {
			if (Macro.cast('水月无间', this)) return;
		}
		// /cast [bufftime:焚玉<2|nobuff:焚玉&tbuff:钟林毓秀&tbuff:兰摧玉折&tbuff:商阳指] 玉石俱焚
		if ((Macro.bufftime('焚玉', 2, '<', this) || Macro.nobuff('焚玉', this))
			&& Macro.tbuff('钟林毓秀', this) && Macro.tbuff('兰摧玉折', this)
			&& Macro.tbuff('商阳指', this)) {
			if (Macro.cast('玉石俱焚', this)) return;
		}
		// /cast 阳明指
		if (Macro.cast('阳明指', this)) return;
	}

}

module.exports = Controller;
