const Buff = require('../../Buff');
const Utils = require('../../Utils');

const buffs = {
	shangYangDot: new Buff({
		icon: 1514,
		name: '商阳指',
		desc: '商阳指',
		type: 'dot',
		conflict: 0,
		duration: 288,
		interval: 48,
		cof: 0.27,
		maxLevel: 1,
		canStack: false,
		min: 50,
		max: 50,
		data: {},
		recipeName: 'shangYang',
		onSkillHitEvent(ctrl) {
			// 放歌奇穴：“商阳指”“钟林毓秀”“兰摧玉折”每跳有 25% 几率
			// 使下一个阳明指无需运功，持续 30 秒，可叠加 3 层。
			if (ctrl.options[6][0].active) {
				const roll = Utils.roll();
				if (roll < 25) {
					const buff = ctrl.getBuff('放歌');
					ctrl.addBuff(buff);
				}
			}
		},
		onSkillCritEvent(ctrl) {
			this.onSkillHitEvent(ctrl);
		},
	}),

	zhongLinDot: new Buff({
		icon: 404,
		name: '钟林毓秀',
		desc: '钟林毓秀',
		type: 'dot',
		conflict: 0,
		duration: 288,
		interval: 48,
		cof: 0.29,
		maxLevel: 1,
		canStack: false,
		min: 38,
		max: 38,
		data: {},
		recipeName: 'zhongLin',
		onSkillHitEvent(ctrl) {
			// 放歌奇穴：“商阳指”“钟林毓秀”“兰摧玉折”每跳有 25% 几率
			// 使下一个阳明指无需运功，持续 30 秒，可叠加 3 层。
			if (ctrl.options[6][0].active) {
				const roll = Utils.roll();
				if (roll < 25) {
					const buff = ctrl.getBuff('放歌');
					ctrl.addBuff(buff);
				}
			}
		},
		onSkillCritEvent(ctrl) {
			this.onSkillHitEvent(ctrl);
		},
	}),

	lanCuiDot: new Buff({
		icon: 390,
		name: '兰摧玉折',
		desc: '兰摧玉折',
		type: 'dot',
		conflict: 0,
		duration: 288,
		interval: 48,
		cof: 0.26,
		maxLevel: 1,
		canStack: false,
		min: 30,
		max: 30,
		data: {},
		recipeName: 'lanCui',
		onSkillHitEvent(ctrl) {
			// 放歌奇穴：“商阳指”“钟林毓秀”“兰摧玉折”每跳有 25% 几率
			// 使下一个阳明指无需运功，持续 30 秒，可叠加 3 层。
			if (ctrl.options[6][0].active) {
				const roll = Utils.roll();
				if (roll < 25) {
					const buff = ctrl.getBuff('放歌');
					ctrl.addBuff(buff);
				}
			}
		},
		onSkillCritEvent(ctrl) {
			this.onSkillHitEvent(ctrl);
		},
	}),

	ziYouBuff: new Buff({
		icon: 1527,
		name: '恣游',
		desc: '恣游',
		type: 'buff',
		conflict: 0,
		duration: 320,
		interval: 0,
		cof: 0,
		maxLevel: 5,
		canStack: true,
		min: 0,
		max: 0,
		data: {
			attackAddPercent: 2,
		},
		recipeName: 'none',
		onSkillHitEvent(ctrl) {
		},
		onSkillCritEvent(ctrl) {
		},
	}),

	shiGuBuff: new Buff({
		icon: 1672,
		name: '噬骨',
		desc: '噬骨',
		type: 'buff',
		conflict: 0,
		duration: 240,
		interval: 0,
		cof: 0,
		maxLevel: 5,
		canStack: true,
		min: 0,
		max: 0,
		data: {
			damage: 2,
		},
		recipeName: 'none',
		onSkillHitEvent(ctrl) {
		},
		onSkillCritEvent(ctrl) {
		},
	}),

	hanBiCD: new Buff({
		icon: 408,
		name: '寒碧',
		desc: '寒碧',
		type: 1,
		conflict: 0,
		duration: 192,
		interval: 0,
		cof: 0,
		maxLevel: 1,
		canStack: false,
		min: 0,
		max: 0,
		data: {},
		recipeName: 'none',
		onSkillHitEvent(ctrl) {
		},
		onSkillCritEvent(ctrl) {
		},
	}),

	fenYuBuff: new Buff({
		icon: 411,
		name: '焚玉',
		desc: '焚玉',
		type: 1,
		conflict: 0,
		duration: 80,
		interval: 0,
		cof: 0,
		maxLevel: 1,
		canStack: false,
		min: 0,
		max: 0,
		data: {},
		recipeName: 'none',
		onSkillHitEvent(ctrl) {
		},
		onSkillCritEvent(ctrl) {
		},
	}),

	fangGeBuff: new Buff({
		icon: 3015,
		name: '放歌',
		desc: '放歌',
		type: 1,
		conflict: 0,
		duration: 480,
		interval: 0,
		cof: 0,
		maxLevel: 3,
		canStack: true,
		min: 0,
		max: 0,
		data: {},
		recipeName: 'none',
		onSkillHitEvent(ctrl) {
		},
		onSkillCritEvent(ctrl) {
		},
	}),

	shuiYueBuff: new Buff({
		icon: 1522,
		name: '水月无间',
		desc: '水月无间',
		type: 1,
		conflict: 0,
		duration: 96,
		interval: 0,
		cof: 0,
		maxLevel: 1,
		canStack: false,
		min: 0,
		max: 0,
		data: {},
		recipeName: 'none',
		onSkillHitEvent(ctrl) {
		},
		onSkillCritEvent(ctrl) {
		},
	}),

	buSanBuff: new Buff({
		icon: 327,
		name: '布散',
		desc: '布散',
		type: 1,
		conflict: 0,
		duration: 160,
		interval: 0,
		cof: 0,
		maxLevel: 1,
		canStack: false,
		min: 0,
		max: 0,
		data: {
			attackAddPercent: 30,
		},
		recipeName: 'none',
		onSkillHitEvent(ctrl) {
		},
		onSkillCritEvent(ctrl) {
		},
	}),

	luanSaBuff: new Buff({
		icon: 3001,
		name: '乱洒青荷',
		desc: '乱洒青荷',
		type: 1,
		conflict: 0,
		duration: 160,
		interval: 0,
		cof: 0,
		maxLevel: 1,
		canStack: false,
		min: 0,
		max: 0,
		data: {},
		extraSetting: {
			firstHit: true,
		},
		recipeName: 'none',
		onSkillHitEvent(ctrl) {
		},
		onSkillCritEvent(ctrl) {
		},
	}),

	liuLiBuff: new Buff({
		icon: 3002,
		name: '流离',
		desc: '流离',
		type: 1,
		conflict: 0,
		duration: 480,
		interval: 0,
		cof: 0,
		maxLevel: 1,
		canStack: false,
		min: 0,
		max: 0,
		data: {},
		recipeName: 'none',
		onSkillHitEvent(ctrl) {
		},
		onSkillCritEvent(ctrl) {
		},
	}),

	mengGeBuff: new Buff({
		icon: 4528,
		name: '梦歌',
		desc: '梦歌',
		type: 1,
		conflict: 0,
		duration: 480,
		interval: 0,
		cof: 0,
		maxLevel: 2,
		canStack: true,
		min: 0,
		max: 0,
		data: {
			haste: 30,
		},
		recipeName: 'none',
		onSkillHitEvent(ctrl) {
		},
		onSkillCritEvent(ctrl) {
		},
	}),

	yanXuanBuff: new Buff({
		icon: 1522,
		name: '砚悬',
		desc: '砚悬',
		type: 1,
		conflict: 0,
		duration: 96,
		interval: 0,
		cof: 0,
		maxLevel: 1,
		canStack: false,
		min: 0,
		max: 0,
		data: {
			critAddPercent: 100,
		},
		recipeName: 'none',
		onSkillHitEvent(ctrl) {
		},
		onSkillCritEvent(ctrl) {
		},
	}),

	juanLiuBuff: new Buff({
		icon: 7468,
		name: '涓流',
		desc: '涓流',
		type: 1,
		conflict: 0,
		duration: 96,
		interval: 0,
		cof: 0,
		maxLevel: 10,
		canStack: true,
		min: 0,
		max: 0,
		data: {
			critAddPercent: 2,
			critEffAddPercent: 2,
		},
		recipeName: 'none',
		onSkillHitEvent(ctrl) {
		},
		onSkillCritEvent(ctrl) {
		},
	}),

	nuChi: new Buff({
		icon: 15,
		name: '怒叱',
		desc: '怒叱',
		type: 1,
		conflict: 0,
		duration: 96,
		interval: 0,
		cof: 0,
		maxLevel: 1,
		canStack: false,
		min: 0,
		max: 0,
		data: {
			attackAddPercent: 10,
		},
		recipeName: 'none',
		onSkillHitEvent(ctrl) {
		},
		onSkillCritEvent(ctrl) {
		},
	}),
};

module.exports = buffs;
