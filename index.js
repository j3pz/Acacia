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
					this.options[key][subKey] = subOption[key];
				}
			} else {
				this.options[key] = options[key];
			}
		}
	}

	simulator() {
		const ctrl = new Controller(this.options);
		let time = this.options.duration * 16;
		while (time--) {
			ctrl.digest();
		}
	}
}

module.exports = Jx3Simulator;
