class Utils {
	static logln(s) {
		console.log(s);
	}

	static hasteCalc(haste, extraHaste, frame) {
		const hasteCof = 47.17425;
		const baseHaste = (haste / hasteCof) * 10.24;
		const totalHaste = Math.floor(baseHaste) + Math.floor(extraHaste);
		const nowFrame = Math.floor((frame * 1024) / (totalHaste + 1024));
		return nowFrame;
	}

	static roll() {
		return Math.random() * 100;
	}
}

module.exports = Utils;
