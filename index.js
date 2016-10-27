const Controller = require('./libs/Controller');
const workerFarm = require('worker-farm');
const present = require('present');

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
			return this.multipleSimulation();
		}
		return this.oneSimulation();
	}

	oneSimulation() {
		const options = this.options;
		const period = options.duration * 16;
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				const t0 = present();
				const ctrl = new Controller(options);
				let time = 0;
				while (time++ < period) {
					ctrl.digest();
				}
				const t1 = present();
				let dps = ctrl.damage / options.duration;
				dps = dps.toFixed(0);
				const info = {
					dps,
					performance: t1 - t0,
					damage: ctrl.damage,
					duration: options.duration,
				};
				resolve(info);
			}, 0);
		});
	}

	multipleSimulation() {
		const workers = workerFarm(require.resolve('./libs/task'));
		let ret = 0;
		const options = this.options;
		const results = [];
		return new Promise((resolve, reject) => {
			const t0 = present();
			function resultCollector(err, result) {
				results.push(result * 1);
				if (++ret == options.iterator) {
					workerFarm.end(workers);
					const dps = Math.floor(results.reduce((a, b) => a + b) / ret);
					const t1 = present();
					const info = {
						dps,
						results,
						performance: t1 - t0,
						duration: options.duration,
						iterator: ret,
					};
					resolve(info);
				}
			}
			for (let i = 0; i < options.iterator; i++) {
				workers(options, resultCollector);
			}
		});
	}
}

module.exports = Jx3Simulator;
