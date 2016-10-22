const Utils = require('../../Utils');

const buffs = [
	{
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
			if (ctrl.isTalentActive('放歌')) {
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
	},
	{
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
			if (ctrl.isTalentActive('放歌')) {
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
	},
	{
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
			if (ctrl.isTalentActive('放歌')) {
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
	},
	{
		icon: 1527,
		name: '恣游',
		desc: '每层使混元内功基础攻击力提高2%',
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
	},
	{
		icon: 1672,
		name: '噬骨',
		desc: '每层受混元性内功伤害提高2%',
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
	},
	{
		icon: 408,
		name: '寒碧',
		desc: '“寒碧”的效果不能触发',
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
	},
	{
		icon: 411,
		name: '焚玉',
		desc: '“阳明指”伤害提高20%',
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
	},
	{
		icon: 3015,
		name: '放歌',
		desc: '使下一个“阳明指”无须运功',
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
	},
	{
		icon: 1522,
		name: '水月无间',
		desc: '下一个伤害或疗伤运功招式无需运功，效果期间免疫控制和封内效果',
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
	},
	{
		icon: 327,
		name: '布散',
		desc: '招式造成的威胁降低60%，混元内功基础攻击力和基础疗伤成效提高30%',
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
	},
	{
		icon: 3001,
		name: '乱洒青荷',
		desc: '效果期间下一个阳明指同时附带“兰摧玉折”“钟林毓秀”效果',
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
	},
	{
		icon: 3002,
		name: '流离',
		desc: '施展“阳明指”无需运功',
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
	},
	{
		icon: 4528,
		name: '梦歌',
		desc: '每层提高加速率3%',
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
	},
	{
		icon: 1522,
		name: '砚悬',
		desc: '下一伤害招式会心几率提高100%',
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
	},
	{
		icon: 7468,
		name: '涓流',
		desc: '会心几率提高2%，会心效果提高2%',
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
	},
	{
		icon: 15,
		name: '怒叱',
		desc: '混元内功基础攻击力提高10%',
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
	},
	{
		icon: 3017,
		name: '清流',
		desc: '内功破防等级提高15%',
		type: 1,
		conflict: 0,
		duration: 288,
		interval: 0,
		cof: 0,
		maxLevel: 1,
		canStack: false,
		min: 0,
		max: 0,
		data: {
			overcomeAddPercent: 15,
		},
		recipeName: 'none',
		onSkillHitEvent(ctrl) {
		},
		onSkillCritEvent(ctrl) {
		},
	},
	{
		icon: 3412,
		name: '水·灭虚',
		desc: '命中则获得一层buff，每层提高内功基础攻击，最多可叠加10层',
		type: 1,
		conflict: 1,
		duration: 96,
		interval: 0,
		cof: 0,
		maxLevel: 10,
		canStack: true,
		min: 0,
		max: 0,
		data: {
			attackAddBase: 7,
		},
		recipeName: 'none',
		onSkillHitEvent(ctrl) {
		},
		onSkillCritEvent(ctrl) {
		},
	},
	{
		icon: 3412,
		name: '水·无双',
		desc: '命中则获得一层buff，每层提高无双等级，最多可叠加10层',
		type: 1,
		conflict: 1,
		duration: 96,
		interval: 0,
		cof: 0,
		maxLevel: 10,
		canStack: true,
		min: 0,
		max: 0,
		data: {
			strainAddBase: 8,
		},
		recipeName: 'none',
		onSkillHitEvent(ctrl) {
		},
		onSkillCritEvent(ctrl) {
		},
	},
	{
		icon: 3406,
		name: '雷·激流',
		desc: '提高自身内功基础攻击和全会心等级，持续15秒',
		type: 1,
		conflict: 1,
		duration: 240,
		interval: 0,
		cof: 0,
		maxLevel: 1,
		canStack: false,
		min: 0,
		max: 0,
		data: {
			attackAddBase: 94,
			critAddBase: 48,
		},
		recipeName: 'none',
		onSkillHitEvent(ctrl) {
		},
		onSkillCritEvent(ctrl) {
		},
	},
	{
		icon: 3406,
		name: '雷·灭气',
		desc: '提高自身内功破防等级和全会心等级，持续15秒',
		type: 1,
		conflict: 1,
		duration: 240,
		interval: 0,
		cof: 0,
		maxLevel: 1,
		canStack: false,
		min: 0,
		max: 0,
		data: {
			overcomeAddBase: 112,
			critAddBase: 48,
		},
		recipeName: 'none',
		onSkillHitEvent(ctrl) {
		},
		onSkillCritEvent(ctrl) {
		},
	},
	{
		icon: 3406,
		name: '雷·痛切',
		desc: '提高自身会心效果等级和全会心等级，持续15秒',
		type: 1,
		conflict: 1,
		duration: 240,
		interval: 0,
		cof: 0,
		maxLevel: 1,
		canStack: false,
		min: 0,
		max: 0,
		data: {
			critEffAddBase: 112,
			critAddBase: 48,
		},
		recipeName: 'none',
		onSkillHitEvent(ctrl) {
		},
		onSkillCritEvent(ctrl) {
		},
	},
	{
		icon: 3406,
		name: '雷特效CD',
		desc: '雷特效CD',
		type: 1,
		conflict: 1,
		duration: 960,
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
	},
];

module.exports = buffs;
