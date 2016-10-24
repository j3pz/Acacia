const Utils = require('../../Utils');

const skills = [
	{
		icon: 1527,
		name: '阳明指',
		type: 'ota',
		cof: 1.11,
		min: 155,
		max: 183,
		ota: 28,
		canCastSkill: 0,
		canCast: false,
		damageInstant: true,
		cd: 0,
		interval: 24,
		target: true,
		hasRecipes: true,
		recipeName: 'yangMing',
		cdRemain: 0,
		gcdCast: false,
		onSkillHitEvent(ctrl) {
			// 阳明指命中后添加一层恣游buff
			const ziyou = ctrl.getBuff('恣游');
			ctrl.addBuff(ziyou);
			// 乱洒添加DOT
			if (ctrl.hasBuff('乱洒青荷') && ctrl.getActiveBuff('乱洒青荷').extraSetting.firstHit) {
				// 添加钟林毓秀
				const zhonglin = ctrl.getBuff('钟林毓秀');
				for (const recipe of ctrl.recipes.zhongLin) {
					if (recipe.active && recipe.effect == 'durationAdd') {
						zhonglin.duration += recipe.value;
					}
					if (recipe.active && recipe.effect == 'debuffAdd') {
						const debuff = ctrl.getBuff(recipe.value);
						ctrl.addDebuff(debuff);
					}
				}
				ctrl.addDebuff(zhonglin);
				// 添加兰摧玉折
				const lancui = ctrl.getBuff('兰摧玉折');
				for (const recipe of ctrl.recipes.lanCui) {
					if (recipe.active && recipe.effect == 'durationAdd') {
						lancui.duration += recipe.value;
					}
				}
				ctrl.addDebuff(lancui);
				ctrl.getActiveBuff('乱洒青荷').extraSetting.firstHit = false;
			}
			// 寒碧奇穴：若目标身上没有“钟林毓秀”效果，则阳明指附带“钟林毓秀”，该效果每12秒触发一次。
			if (ctrl.isTalentActive('寒碧')) {
				if (!(ctrl.hasBuff('寒碧')) && !(ctrl.hasDebuff('钟林毓秀'))) {
					const zhonglin = ctrl.getBuff('钟林毓秀');
					for (const recipe of ctrl.recipes.zhongLin) {
						if (recipe.active && recipe.effect == 'durationAdd') {
							zhonglin.duration += recipe.value;
						}
						if (recipe.active && recipe.effect == 'debuffAdd') {
							const debuff = ctrl.getBuff(recipe.value);
							ctrl.addDebuff(debuff);
						}
					}
					ctrl.addDebuff(zhonglin);
					const hanBiCD = ctrl.getBuff('寒碧');
					ctrl.addBuff(hanBiCD);
				}
			}
		},
		onSkillCritEvent(ctrl) {
			// 雪中行奇穴：“阳明指”会心后刷新目标身上所有混元持续伤害效果。
			if (ctrl.isTalentActive('雪中行')) {
				ctrl.dotRefresh('商阳指');
				ctrl.dotRefresh('兰摧玉折');
				ctrl.dotRefresh('钟林毓秀');
			}
			this.onSkillHitEvent(ctrl);
		},
		onSkillPrepare(ctrl) {
			// 烟霞奇穴：“阳明指”的会心几率提高10%，会心效果提高10%。
			if (ctrl.isTalentActive('烟霞')) {
				this.extraAttr.critAddPercent += 10;
				this.extraAttr.critEffAddPercent += 10;
			}
			// 放歌奇穴：“商阳指”“钟林毓秀”“兰摧玉折”每跳有25%几率使下一个阳明指无需运功，持续30秒，可叠加3层。
			if (ctrl.hasBuff('放歌')) {
				this.ota = 0;
				this.type = 'instant';
				const fangGe = ctrl.getActiveBuff('放歌');
				fangGe.level--;
				if (fangGe.level == 0) {
					ctrl.deleteBuff('放歌');
				}
			}
			// 焚玉buff使阳明指提高20%伤害
			if (ctrl.hasBuff('焚玉')) {
				const fenYu = ctrl.getActiveBuff('焚玉');
				if (fenYu.remain >= this.ota) {
					this.extraAttr.damage += 20;
				}
			}
			// 青冠奇穴：“阳明指”命中有自身混元持续伤害效果的目标，每个效果使“阳明指”会心几率提高5%，会心效果提高5%。
			if (ctrl.isTalentActive('青冠')) {
				let dotCount = 0;
				if (ctrl.hasDebuff('商阳指') && ctrl.getActiveDebuff('商阳指').remain >= this.ota) dotCount++;
				if (ctrl.hasDebuff('钟林毓秀') && ctrl.getActiveDebuff('钟林毓秀').remain >= this.ota) dotCount++;
				if (ctrl.hasDebuff('兰摧玉折') && ctrl.getActiveDebuff('兰摧玉折').remain >= this.ota) dotCount++;
				this.extraAttr.critAddPercent += parseInt(5 * dotCount, 10);
				this.extraAttr.critEffAddPercent += parseInt(5 * dotCount, 10);
			}
			// 落凤
			if (ctrl.setting.effects.cw == 2) {
				this.extraAttr.damage += 5;
			}
			// 小橙武
			if (ctrl.setting.effects.cw == 1) {
				this.extraAttr.critAddPercent += 5;
			}
			// 套装特效
			if (ctrl.setting.effects.setEffect == 2 || ctrl.setting.effects.setEffect == 3) {
				this.extraAttr.damage += 10;
			}
		},
		onSkillFinish(ctrl) {
			// 梦歌奇穴：施展“阳明指”或“快雪时晴”运功结束时均获得“梦歌”气劲，每层使加速率提高3%，持续30秒，最多叠加2层。
			if (ctrl.isTalentActive('梦歌')) {
				const mengGe = ctrl.getBuff('梦歌');
				ctrl.addBuff(mengGe);
			}
		},
	},

	{
		icon: 1514,
		name: '商阳指',
		type: 'instant',
		cof: 0.27,
		min: 50,
		max: 50,
		ota: 0,
		canCastSkill: 0,
		canCast: false,
		damageInstant: false,
		cd: 0,
		interval: 0,
		target: true,
		hasRecipes: true,
		recipeName: 'shangYang',
		cdRemain: 0,
		gcdCast: false,
		onSkillHitEvent(ctrl) {
			// 添加商阳指dot
			const shangYang = ctrl.getBuff('商阳指');
			// 噬骨判定
			const hasShigu = ctrl.getActiveDebuff('噬骨');
			for (const recipe of ctrl.recipes.shangYang) {
				if (recipe.active && recipe.effect == 'durationAdd') {
					shangYang.duration += recipe.value;
				}
				if (recipe.active && recipe.effect == 'debuffAdd' && !hasShigu) {
					const debuff = ctrl.getBuff(recipe.value);
					ctrl.addDebuff(debuff);
				}
			}
			// 生息奇穴：混元性持续伤害提高10%，持续伤害效果被卸除后，每个持续伤害使目标1.5秒内无法受到治疗效果，最多叠加4.5秒。
			if (ctrl.isTalentActive('生息')) {
				shangYang.extraAttr.damage += 10;
			}
			ctrl.addDebuff(shangYang);
		},
		onSkillCritEvent(ctrl) {
			this.onSkillHitEvent(ctrl);
		},
		onSkillPrepare(ctrl) {
			// 寒血奇穴：“施展“商阳指”立刻造成伤害
			if (ctrl.isTalentActive('寒血')) {
				this.damageInstant = true;
			}
		},
		onSkillFinish(ctrl) {
		},
	},

	{
		icon: 411,
		name: '玉石俱焚',
		type: 'instant',
		cof: 0.33,
		min: 81,
		max: 91,
		ota: 0,
		canCastSkill: 0,
		canCast: false,
		damageInstant: true,
		cd: 272,
		interval: 0,
		target: true,
		hasRecipes: false,
		cdRemain: 0,
		gcdCast: false,
		onSkillHitEvent(ctrl) {
			// 吞噬dot
			let dotCount = 0;
			if (ctrl.hasDebuff('商阳指')) {
				const dot = ctrl.getActiveDebuff('商阳指');
				const remainHit = Math.floor(dot.remain / dot.interval) + 1;
				dot.calc(ctrl, remainHit);
				ctrl.deleteDebuff('商阳指');
				dotCount++;
			}
			if (ctrl.hasDebuff('钟林毓秀')) {
				const dot = ctrl.getActiveDebuff('钟林毓秀');
				const remainHit = Math.floor(dot.remain / dot.interval) + 1;
				dot.calc(ctrl, remainHit);
				ctrl.deleteDebuff('钟林毓秀');
				dotCount++;
			}
			if (ctrl.hasDebuff('兰摧玉折')) {
				const dot = ctrl.getActiveDebuff('兰摧玉折');
				const remainHit = Math.floor(dot.remain / dot.interval) + 1;
				dot.calc(ctrl, remainHit);
				ctrl.deleteDebuff('兰摧玉折');
				dotCount++;
			}
			// 焚玉奇穴：“玉石俱焚”成功吞噬持续伤害效果，使阳明指伤害提高10%，每额外吞噬一个效果，持续时间增加5秒。
			if (ctrl.isTalentActive('焚玉') && dotCount > 0) {
				if (ctrl.hasBuff('焚玉')) {
					ctrl.getActiveBuff('焚玉').remain += dotCount * 80;
				} else {
					const fenYu = ctrl.getBuff('焚玉');
					fenYu.duration = dotCount * 80;
					ctrl.addBuff(fenYu);
				}
			}
			// 清流奇穴：玉石俱焚”施展后使自身内功破防等级提高15%，持续18秒。
			if (ctrl.isTalentActive('清流')) {
				const qingLiu = ctrl.getBuff('清流');
				ctrl.addBuff(qingLiu);
			}
			// 旋落奇穴：“玉石俱焚”每吞噬一个持续伤害效果，调息时间降低1.5秒。
			if (ctrl.isTalentActive('旋落') && dotCount > 0) {
				this.cd -= (dotCount * 24);
			}
			// 流离奇穴：“玉石俱焚”命中目标后使自身下一个“兰摧玉折”无需运功。
			if (ctrl.isTalentActive('流离')) {
				const liuLi = ctrl.getBuff('流离');
				ctrl.addBuff(liuLi);
			}
		},
		onSkillCritEvent(ctrl) {
			this.onSkillHitEvent(ctrl);
		},
		onSkillPrepare(ctrl) {

		},
		onSkillFinish(ctrl) {
		},
	},

	{
		icon: 2999,
		name: '快雪时晴',
		type: 'channel',
		cof: 0.39,
		min: 65,
		max: 75,
		ota: 80,
		canCastSkill: 0,
		canCast: false,
		damageInstant: true,
		cd: 0,
		interval: 16,
		target: true,
		hasRecipes: true,
		recipeName: 'kuaiXue',
		cdRemain: 0,
		gcdCast: false,
		onSkillHitEvent(ctrl) {
			for (const recipe of ctrl.recipes.kuaiXue) {
				if (recipe.active && recipe.effect == 'debuffAdd') {
					ctrl.addDebuff(ctrl.getBuff(recipe.value));
				}
			}
			// 踏歌奇穴：“快雪时晴”命中有自身持续伤害效果的目标，每次伤害有15%几率使持续伤害效果增加2跳，每个持续效果最多作用一次
			if (ctrl.isTalentActive('踏歌')) {
				let roll = Utils.roll();
				if (ctrl.hasDebuff('商阳指') && roll < 15) {
					ctrl.dotAddInterval('商阳指', 2);
				}
				roll = Utils.roll();
				if (ctrl.hasDebuff('钟林毓秀') && roll < 15) {
					ctrl.dotAddInterval('钟林毓秀', 2);
				}
				roll = Utils.roll();
				if (ctrl.hasDebuff('兰摧玉折') && roll < 15) {
					ctrl.dotAddInterval('兰摧玉折', 2);
				}
			}
		},
		onSkillCritEvent(ctrl) {
			this.onSkillHitEvent(ctrl);
		},
		onSkillPrepare(ctrl) {
			// 弹指奇穴：“快雪时晴”的会心几率提高10%，会心效果提高10%。
			if (ctrl.isTalentActive('弹指')) {
				this.extraAttr.critAddPercent += 10;
				this.extraAttr.critEffAddPercent += 10;
			}
			// 青歌奇穴：“快雪时晴”每0.6秒造成一次伤害，持续3秒。
			if (ctrl.isTalentActive('青歌')) {
				this.ota = 50;
				this.interval = 10;
			} else {
				this.ota = 80;
				this.interval = 16;
			}
			// 雪弃奇穴：“快雪时晴”若只命中一个目标，伤害提高20%。
			if (ctrl.isTalentActive('雪弃')) {
				this.extraAttr.damage += 20;
			}
			// 落凤
			if (ctrl.setting.effects.cw == 2) {
				this.extraAttr.damage += 5;
			}
			// 小橙武
			if (ctrl.setting.effects.cw == 1) {
				this.extraAttr.critAddPercent += 5;
			}
			// 套装特效
			if (ctrl.setting.effects.setEffect == 2 || ctrl.setting.effects.setEffect == 3) {
				this.extraAttr.damage += 10;
			}
		},
		onSkillFinish(ctrl) {
			// 梦歌奇穴：施展“阳明指”或“快雪时晴”运功结束时均获得“梦歌”气劲，每层使加速率提高3%，持续30秒，最多叠加2层。
			if (ctrl.isTalentActive('梦歌')) {
				const mengGe = ctrl.getBuff('梦歌');
				ctrl.addBuff(mengGe);
			}
		},
	},

	{
		icon: 404,
		name: '钟林毓秀',
		type: 'ota',
		cof: 0.29,
		ota: 32,
		canCastSkill: 0,
		canCast: false,
		min: 38,
		max: 38,
		damageInstant: false,
		cd: 0,
		interval: 0,
		target: true,
		hasRecipes: true,
		recipeName: 'zhongLin',
		cdRemain: 0,
		gcdCast: false,
		onSkillHitEvent(ctrl) {
			// 添加钟林毓琇dot
			const zhongLin = ctrl.getBuff('钟林毓秀');
			for (const recipe of ctrl.recipes.zhongLin) {
				if (recipe.active && recipe.effect == 'durationAdd') {
					zhongLin.duration += recipe.value;
				}
				if (recipe.active && recipe.effect == 'debuffAdd') {
					ctrl.addDebuff(ctrl.getBuff(recipe.value));
				}
			}
			// 生息奇穴：混元性持续伤害提高10%，持续伤害效果被卸除后，每个持续伤害使目标1.5秒内无法受到治疗效果，最多叠加4.5秒。
			if (ctrl.isTalentActive('生息')) {
				zhongLin.extraAttr.damage += 10;
			}
			ctrl.addDebuff(zhongLin);
		},
		onSkillCritEvent(ctrl) {
			this.onSkillHitEvent(ctrl);
		},
		onSkillPrepare(ctrl) {
		},
		onSkillFinish(ctrl) {
		},
	},

	{
		icon: 390,
		name: '兰摧玉折',
		type: 'ota',
		cof: 0.26,
		min: 30,
		max: 30,
		ota: 28,
		canCastSkill: 0,
		canCast: false,
		damageInstant: false,
		cd: 96,
		interval: 0,
		target: true,
		hasRecipes: true,
		recipeName: 'lanCui',
		cdRemain: 0,
		gcdCast: false,
		onSkillHitEvent(ctrl) {
			// 添加兰摧dot
			const lanCui = ctrl.getBuff('兰摧玉折');
			for (const recipe of ctrl.recipes.lanCui) {
				if (recipe.active && recipe.effect == 'durationAdd') {
					lanCui.duration += recipe.value;
				}
			}
			// 生息奇穴：混元性持续伤害提高10%，持续伤害效果被卸除后，每个持续伤害使目标1.5秒内无法受到治疗效果，最多叠加4.5秒。
			if (ctrl.isTalentActive('生息')) {
				lanCui.extraAttr.damage += 10;
			}
			ctrl.addDebuff(lanCui);
		},
		onSkillCritEvent(ctrl) {
			this.onSkillHitEvent(ctrl);
		},
		onSkillPrepare(ctrl) {
			// 流离奇穴使兰摧不需运功
			if (ctrl.hasBuff('流离')) {
				this.ota = 0;
				this.type = 'instant';
				ctrl.deleteBuff('流离');
			}
		},
		onSkillFinish(ctrl) {
		},
	},

	{
		icon: 398,
		name: '芙蓉并蒂',
		type: 'instant',
		cof: 0.33,
		min: 76,
		max: 81,
		ota: 0,
		canCastSkill: 0,
		canCast: false,
		damageInstant: true,
		cd: 320,
		interval: 0,
		target: true,
		hasRecipes: false,
		recipeName: '',
		cdRemain: 0,
		gcdCast: false,
		onSkillHitEvent(ctrl) {
			// 轻弃奇穴：“芙蓉并蒂”的伤害提高100%，命中目标后刷新目标身上的所有混元持续伤害效果。
			if (ctrl.isTalentActive('轻弃')) {
				ctrl.dotRefresh('商阳指');
				ctrl.dotRefresh('兰摧玉折');
				ctrl.dotRefresh('钟林毓秀');
			}
		},
		onSkillCritEvent(ctrl) {
			this.onSkillHitEvent(ctrl);
		},
		onSkillPrepare(ctrl) {
			// 轻弃奇穴：“芙蓉并蒂”的伤害提高100%，命中目标后刷新目标身上的所有混元持续伤害效果。
			if (ctrl.isTalentActive('轻弃')) {
				this.extraAttr.damage += 100;
			}
			// 踏莲奇穴：“芙蓉并蒂”调息时间降低5秒，定身效果持续时间延迟1秒。
			if (ctrl.isTalentActive('踏莲')) {
				this.cd = 240;
			}
		},
		onSkillFinish(ctrl) {
		},
	},

	{
		icon: 1522,
		name: '水月无间',
		type: 'instant',
		cof: 0,
		min: 0,
		max: 0,
		ota: 0,
		canCastSkill: 0,
		canCast: false,
		damageInstant: false,
		cd: 960,
		interval: 0,
		target: false,
		hasRecipes: false,
		recipeName: '',
		cdRemain: 0,
		gcdCast: false,
		onSkillHitEvent(ctrl) {
			const shuiYue = ctrl.getBuff('水月无间');
			// 夜思奇穴：“水月无间”额外使1个招式无需运功，并立刻回复自身10%内力值。
			if (ctrl.isTalentActive('夜思')) {
				shuiYue.canStack = true;
				shuiYue.maxLevel = true;
				shuiYue.level = 2;
			}
			ctrl.addBuff(shuiYue);
			const buSan = ctrl.getBuff('布散');
			ctrl.addBuff(buSan);
			// 砚悬奇穴：“水月无间”效果期间下一个伤害或治疗招式必定会心。
			if (ctrl.isTalentActive('砚悬')) {
				const yanXuan = ctrl.getBuff('砚悬');
				ctrl.addBuff(yanXuan);
			}
		},
		onSkillCritEvent(ctrl) {
			this.onSkillHitEvent(ctrl);
		},
		onSkillPrepare(ctrl) {
		},
		onSkillFinish(ctrl) {
		},
	},

	{
		icon: 3001,
		name: '乱洒青荷',
		type: 'instant',
		cof: 0,
		min: 0,
		max: 0,
		ota: 0,
		canCastSkill: 0,
		canCast: false,
		damageInstant: false,
		cd: 1440,
		interval: 0,
		target: false,
		hasRecipes: false,
		recipeName: '',
		cdRemain: 0,
		gcdCast: true,
		onSkillHitEvent(ctrl) {
			// 重置玉石俱焚CD
			ctrl.getSkill('玉石俱焚').cdRemain = 0;
			// 添加乱洒buff
			const luanSa = ctrl.getBuff('乱洒青荷');
			ctrl.addBuff(luanSa);
			// 取消技能GCD
			ctrl.myself.status.gcd = 0;
		},
		onSkillCritEvent(ctrl) {
			this.onSkillHitEvent(ctrl);
		},
		onSkillPrepare(ctrl) {
			// 奇穴技能检测
			if (!ctrl.isTalentActive('乱洒青荷')) {
				this.type = 'invalid';
			}
		},
		onSkillFinish(ctrl) {
		},
	},
];

module.exports = skills;
