const Controller = require('./libs/Controller');
const ProgressBar = require('progress');
const workerFarm = require('worker-farm');

class Jx3Simulator {
	constructor(options) {
		this.options = {
			school: 'huajian',
			duration: 300,
			iterator: 5,
			target: 98,
			self: {
				basicAttack: 0,
				spunk: 0,
				crit: 0,
				critEff: 0,
				hit: 0,
				haste: 0,
				strain: 0,
				overcome: 0,
				delay: 100,
			},
			talent: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			recipes: {},
			effects: {
				cw: 0,
				water: 0,
				thunder: 0,
				setEffect: [],
			},
		};
		if (options && typeof options === 'object') {
			this.init(options);
		}
		return this;
	}

	init(options) {
		for (const key of Object.keys(options)) {
			if (typeof options[key] === 'object' && !Array.isArray(options[key])) {
				const subOption = options[key];
				for (const subKey of Object.keys(subOption)) {
					this.options[key][subKey] = subOption[subKey];
				}
			} else {
				this.options[key] = options[key];
			}
		}
	}

	run() {
		if (this.options.iterator > 1) {
			this.multipleSimulation();
		} else {
			this.oneSimulation();
		}
	}

	oneSimulation() {
		const options = this.options;
		const period = options.duration * 16;
		const barOpts = {
			width: 20,
			total: period,
			clear: true,
		};
		let lastTick = 0;
		const bar = new ProgressBar('正在模拟： [:bar] :percent :etas', barOpts);
		setTimeout(() => {
			console.time('模拟完成，消耗时间');
			console.log(`模拟时间: ${options.duration}s`);
			const ctrl = new Controller(options);
			let time = 0;
			while (time++ < period) {
				const percentage = (time / period) * 100;
				if (percentage % 5 == 0) {
					bar.tick(time - lastTick);
					lastTick = time;
				}
				ctrl.digest();
			}
			console.timeEnd('模拟完成，消耗时间');
			let dps = ctrl.damage / options.duration;
			dps = dps.toFixed(0);
			console.log(`总伤害：${ctrl.damage}`);
			console.log(`DPS：${dps}`);
		}, 0);
		console.log('开始模拟');
	}

	multipleSimulation() {
		const workers = workerFarm(require.resolve('./libs/task'));
		let ret = 0;
		const options = this.options;
		const results = [];
		function resultCollector(err, result) {
			results.push(result * 1);
			if (++ret == options.iterator) {
				workerFarm.end(workers);
				let dps = results.reduce((a, b) => a + b) / ret;
				dps = parseInt(dps, 10);
				console.log(`DPS: ${dps}`);
				console.timeEnd('多线程模拟，消耗时间');
			}
		}
		console.time('多线程模拟，消耗时间');
		console.log(`开始模拟，模拟时间${options.duration}s，模拟次数${options.iterator}次`);
		for (let i = 0; i < options.iterator; i++) {
			workers(options, resultCollector);
		}
	}
}

module.exports = Jx3Simulator;
