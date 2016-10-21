const Controller = require('./libs/Controller');
const ProgressBar = require('progress');

class Jx3Simulator {
	constructor(options) {
		this.options = {
			school: 'huajian',
			duration: 300,
			iterator: 100,
			target: 98,
			self: {},
			talent: [],
			recipes: {},
			effects: {},
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

	simulator() {
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
				if (((time / period) * 100) % 5 == 0) {
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
}

module.exports = Jx3Simulator;
