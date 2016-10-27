const Controller = require('../libs/Controller');
const Acacia = require('../index');
const should = require('should');
const _ = require('lodash');

const testConfig = {
	school: 'huajian',
	duration: 300,
	iterator: 1,
	target: 97,
	self: {
		basicAttack: 2748,
		spunk: 706,
		crit: 15.15,
		critEff: 211.77,
		hit: 106.76,
		haste: 321,
		strain: 20.09,
		overcome: 900,
		delay: 100,
	},
	effects: {
		cw: 2,
		water: '水·灭虚',
		thunder: '雷·激流',
		setEffect: [],
	},
	talent: [0, 0, 1, 2, 0, 2, 3, 0, 0, 0, 0, 0],
	recipes: {
		yangMing: [0, 1, 6, 7],
		shangYang: [3, 4, 5, 6],
		lanCui: [0, 1, 2, 6],
		zhongLin: [0, 1, 2, 5],
		kuaiXue: [0, 1, 2, 3],
	},
};

describe('Acacia/index.js', () => {
	it('传入的设置应该生效', () => {
		const acacia = new Acacia(testConfig);
		should(acacia.options.duration).be.exactly(testConfig.duration);
		should(acacia.options.self.basicAttack).be.exactly(testConfig.self.basicAttack);
		should(acacia.options.school).be.exactly(testConfig.school);
		should(acacia.options.effects.water).be.exactly(testConfig.effects.water);
		should(acacia.options.recipes.lanCui).be.exactly(testConfig.recipes.lanCui);
	});

	it('返回合适的DPS计算值，单实例', () => {
		const acacia = new Acacia(testConfig);
		acacia.run().then((info) => {
			should(info.dps).within(8000, 9000);
		});
	});

	it('返回结果集，多线程计算', () => {
		const testConfigM = _.clone(testConfig);
		testConfigM.iterator = 5;
		const acacia = new Acacia(testConfigM);
		acacia.run().then((info) => {
			should(info.dps).within(8000, 9000);
			should(info.results.length).be.exactly(testConfig.iterator);
		});
	});
});

describe('Acacia/libs/Controller.js', () => {
	const ctrl = new Controller(testConfig);
	it('控制器参数成功传入', () => {
		should(ctrl.damage).be.exactly(0);
		should(ctrl.myself.attributes).be.an.instanceOf(Object).and.have.property('basicAttack');
	});
	it('控制器初始化成功（花间）', () => {
		should(ctrl.recipes.lanCui[6].active).ok();
		should(ctrl.buffs['商阳指'].type).be.exactly('dot');
		should(ctrl.skillCtrl.list['快雪时晴'].type).be.exactly('channel');
		should(ctrl.talents['焚玉'].active).ok();
	});
	const buff = ctrl.getBuff('恣游');
	const debuff = ctrl.getBuff('噬骨');
	it('从 Buff 库获取 Buff', () => {
		should(buff.name).be.exactly('恣游');
		should(debuff.name).be.exactly('噬骨');
		const notExistBuff = ctrl.getBuff('般若诀');
		should(notExistBuff).be.exactly(false);
	});

	it('添加一个 Buff 到自身', () => {
		ctrl.addBuff(buff);
		should(ctrl.buffCtrl.selfList['恣游'].level).be.exactly(1);
	});

	it('添加一个 Buff 到目标', () => {
		ctrl.addDebuff(debuff);
		should(ctrl.buffCtrl.targetList['噬骨'].level).be.exactly(1);
	});

	it('可以获得 Buff 的状态', () => {
		const ziyou = ctrl.getActiveBuff('恣游');
		should(ziyou.checkTime).be.exactly(0);
		const shangYang = ctrl.getActiveDebuff('噬骨');
		should(shangYang.checkTime).be.exactly(0);
		const notExistBuff = ctrl.getActiveBuff('梦歌');
		should(notExistBuff).be.exactly(false);
		const notExistDebuff = ctrl.getActiveDebuff('兰摧玉折');
		should(notExistDebuff).be.exactly(false);
	});

	it('Buff 时间控制正确', () => {
		ctrl.time = 16;
		const ziyou = ctrl.getActiveBuff('恣游');
		should(ziyou.remain).be.exactly(ziyou.duration - 16);
		const shangYang = ctrl.getActiveDebuff('噬骨');
		should(shangYang.remain).be.exactly(shangYang.duration - 16);
	});

	it('再次添加 Buff 到自身进行叠加', () => {
		ctrl.addBuff(buff);
		should(ctrl.buffCtrl.selfList['恣游'].level).be.exactly(2);
	});

	it('再次添加 Buff 到目标进行叠加', () => {
		ctrl.addDebuff(debuff);
		should(ctrl.buffCtrl.targetList['噬骨'].level).be.exactly(2);
	});

	it('Buff 存在状态获取成功', () => {
		const hasZiyou = ctrl.hasBuff('恣游');
		should(hasZiyou).be.exactly(true);
		const hasShigu = ctrl.hasDebuff('噬骨');
		should(hasShigu).be.exactly(true);
		const hasMengge = ctrl.hasBuff('兰摧玉折');
		should(hasMengge).be.exactly(false);
		const hasLancui = ctrl.hasDebuff('梦歌');
		should(hasLancui).be.exactly(false);
	});

	it('获取技能状态成功', () => {
		const kuaixue = ctrl.getSkill('快雪时晴');
		should(kuaixue.type).be.exactly('channel');
	});

	it('获取奇穴状态成功', () => {
		const isMenggeActive = ctrl.isTalentActive('梦歌');
		should(isMenggeActive).ok();
	});
});
