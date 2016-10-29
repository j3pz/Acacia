const Controller = require('./libs/Controller');

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
		return new Controller(this.options);
	}
}

module.exports = Jx3Simulator;
