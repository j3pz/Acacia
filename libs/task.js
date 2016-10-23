const Controller = require('./Controller');

module.exports = (options, callback) => {
	const period = options.duration * 16;
	const ctrl = new Controller(options);
	let time = 0;
	while (time++ < period) {
		ctrl.digest();
	}
	let dps = ctrl.damage / options.duration;
	dps = dps.toFixed(0);
	callback(null, dps);
};
