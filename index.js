const Controller = require('./libs/Controller');

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
		setTimeout(function () {
			console.time('模拟完成，消耗时间');
			console.log(`模拟时间: ${options.duration}s`);
			const ctrl = new Controller(options);
			let time = options.duration * 16;
			const period = options.duration * 16;
			while (time--) {
				if (((time / period) * 100) % 5 == 0) {
					const percentage = 100 - ((time / period) * 100);
					console.log(`${percentage}%`);
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
