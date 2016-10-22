const Utils = require('./Utils');
const _ = require('lodash');

class Macro {
	// 宏指令
	// 动作指令
	static cast(ctrl, skillName) {
		// 释放技能
		const skill = ctrl.getSkill(skillName);

		if (!skill || skill.cdRemain > 0) {
			return false;
		}

		const roleStatus = ctrl.myself.status;

		if (!roleStatus.ota && (roleStatus.gcd == 0 || skill.gcdCast)) {
			return this.fcast(ctrl, skillName);
		}

		return false;
	}

	static fcast(ctrl, skillName) {
		// 强行释放技能
		const skill = ctrl.getSkill(skillName);
		const skillParam = _.clone(skill);

		if (!skill || skill.cdRemain > 0) {
			return false;
		}

		const roleStatus = ctrl.myself.status;
		// 清除特殊加成
		skill.cleanExtra();
		// 执行门派通用的技能准备，例如免读条等
		ctrl.schoolData.utils.generalSkillPrepare(ctrl, skillParam);
		skill.onSkillPrepare(ctrl);
		if (skillParam.type == 'invalid') {
			return false;
		}

		if (skillParam.type == 'ota') {
			roleStatus.ota = true;
			ctrl.skillCtrl.curSkill = skill;
			roleStatus.curOta = Utils.hasteCalc(ctrl.myself.attributes.haste,
				ctrl.myself.extra.haste, skillParam.ota);
			roleStatus.otaRemain = roleStatus.curOta;
			roleStatus.gcd = Utils.hasteCalc(ctrl.myself.attributes.haste,
				ctrl.myself.extra.haste, 24);
			return true;
		} else if (skillParam.type == 'instant') {
			roleStatus.ota = false;
			roleStatus.gcd = Utils.hasteCalc(ctrl.myself.attributes.haste,
				ctrl.myself.extra.haste, 24);
			skill.calc(ctrl);
			skill.onSkillFinish(ctrl);
			return true;
		} else if (skillParam.type == 'channel') {
			roleStatus.ota = true;
			ctrl.skillCtrl.curSkill = skill;
			roleStatus.curOta = Utils.hasteCalc(ctrl.myself.attributes.haste,
				ctrl.myself.extra.haste, skillParam.interval) * (skillParam.ota / skillParam.interval);
			roleStatus.otaRemain = roleStatus.curOta;
			roleStatus.curInterval = Utils.hasteCalc(ctrl.myself.attributes.haste,
				ctrl.myself.extra.haste, skillParam.interval);
			roleStatus.gcd = Utils.hasteCalc(ctrl.myself.attributes.haste,
				ctrl.myself.extra.haste, 24);
			return true;
		}
		return false;
	}

	// 自身条件

	static buff(ctrl, buffName, level, sign) {
		// 判断自己身上是否存在某增益或减益buff
		// 或者判断自己身上的某增益或减益buff是否大于，小于或等于几层
		if (!level) level = 1;
		if (!sign) sign = '=';
		const buff = ctrl.getActiveBuff(buffName);
		if (buff) {
			switch (sign) {
			case '>':
				if (buff.level > level) return true;
				break;
			case '<':
				if (buff.level < level) return true;
				break;
			case '=':
				if (buff.level == level) return true;
				break;
			case '<=':
				if (buff.level <= level) return true;
				break;
			case '>=':
				if (buff.level >= level) return true;
				break;
			default:
				return false;
			}
		}
		return false;
	}

	static nobuff(ctrl, buffName) {
		// 判断自己身上无某增益或减益buff
		const buff = ctrl.getActiveBuff(buffName);
		if (buff.level) {
			return false;
		}
		return true;
	}

	static bufftime(ctrl, buffName, seconds, sign) {
		// 判断自己身上某增益或减益buff 持续时间大于，小于或等于多少秒
		const buff = ctrl.getActiveBuff(buffName);
		if (buff) {
			const timeRemain = Math.floor(buff.remain / 16);
			switch (sign) {
			case '>':
				if (timeRemain > seconds) return true;
				break;
			case '<':
				if (timeRemain < seconds) return true;
				break;
			case '=':
				if (timeRemain == seconds) return true;
				break;
			case '<=':
				if (timeRemain <= seconds) return true;
				break;
			case '>=':
				if (timeRemain >= seconds) return true;
				break;
			default:
				break;
			}
		}
		return false;
	}

	static life(ctrl, percent, sign) {
		// 生命值大于，小于或等于最大血量的百分之多少
		if (sign == '>' && ctrl.myself.states.life > percent) return true;
		if (sign == '<' && ctrl.myself.states.life < percent) return true;
		if (sign == '=' && ctrl.myself.states.life == percent) return true;
		if (sign == '<=' && ctrl.myself.states.life <= percent) return true;
		if (sign == '>=' && ctrl.myself.states.life >= percent) return true;
		return false;
	}

	static mana(ctrl, percent, sign) {
		// 内力值大于，小于或等于最大血量的百分之多少
		if (sign == '>' && ctrl.myself.states.mana > percent) return true;
		if (sign == '<' && ctrl.myself.states.mana < percent) return true;
		if (sign == '=' && ctrl.myself.states.mana == percent) return true;
		if (sign == '<=' && ctrl.myself.states.mana <= percent) return true;
		if (sign == '>=' && ctrl.myself.states.mana >= percent) return true;
		return false;
	}
	// 目标条件

	static tbuff(ctrl, buffName, level, sign) {
		// 判断目标身上是否存在某增益或减益buff
		// 或者判断目标身上的某增益或减益buff是否大于，小于或等于几层
		if (!level) level = 1;
		if (!sign) sign = '=';
		const buff = ctrl.getActiveDebuff(buffName);
		if (buff) {
			switch (sign) {
			case '>':
				if (buff.level > level) return true;
				break;
			case '<':
				if (buff.level < level) return true;
				break;
			case '=':
				if (buff.level == level) return true;
				break;
			case '<=':
				if (buff.level <= level) return true;
				break;
			case '>=':
				if (buff.level >= level) return true;
				break;
			default:
				return false;
			}
		}
		return false;
	}

	static tnobuff(ctrl, buffName) {
		// 判断目标身上无某增益或减益buff
		const buff = ctrl.getActiveDebuff(buffName);
		if (buff.level) {
			return false;
		}
		return true;
	}

	static tbufftime(ctrl, buffName, seconds, sign) {
		// 判断目标身上某增益或减益buff 持续时间大于，小于或等于多少秒
		const buff = ctrl.getActiveDebuff(buffName);
		if (buff) {
			const timeRemain = Math.floor(buff.remain / 16);
			switch (sign) {
			case '>':
				if (timeRemain > seconds) return true;
				break;
			case '<':
				if (timeRemain < seconds) return true;
				break;
			case '=':
				if (timeRemain == seconds) return true;
				break;
			case '<=':
				if (timeRemain <= seconds) return true;
				break;
			case '>=':
				if (timeRemain >= seconds) return true;
				break;
			default:
				break;
			}
		}
		return false;
	}

	static target(ctrl, type) {
		// 目标是否为 npc 或者 玩家
		// DPS 测试器中，目标只能是NPC
		if (type == 'npc' || type == 'all') return true;
		return false;
	}

	static notarget(ctrl) {
		// 目标是否存在
		// DPS 测试器中，目标只要血量高于0均存在
		if (ctrl.target.curLife > 0) return false;
		return true;
	}

	static distance(ctrl, distance, sign) {
		// 离目标的距离大于，小于或等于多少尺
		// DPS 测试器中，不判定距离
		return true;
	}
	// 测试器条件

	static nocd(ctrl, skillName) {
		// 判断自身技能是否没有CD
		const skill = ctrl.getSkill(skillName);
		if (!skill) {
			return skill.cdRemain <= 0;
		}
		return false;
	}
}

module.exports = Macro;
