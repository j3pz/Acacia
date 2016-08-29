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
		};
		if (options && typeof options === 'object') {
			this.init(options);
		}
		return this;
	}

	init(options) {
		for (const key of options.keys()) {
			if (typeof options[key] === 'object' && !Array.isArray(options[key])) {
				const subOption = options[key];
				for (const subKey of subOption.keys()) {
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
