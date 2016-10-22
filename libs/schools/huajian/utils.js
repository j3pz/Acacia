const wanhuaUtils = {
	killLevel: 0.35, // 斩杀线
	kill(ctrl) {
		// 斩杀机制
		if (ctrl.hasBuff('涓流')) {
			const juanliu = ctrl.getActiveBuff('涓流');
			juanliu.level--;
			if (juanliu.level === 0) {
				ctrl.deleteSelfBuff('涓流');
			}
		} else {
			const juanliu = ctrl.getBuff('涓流');
			juanliu.level = 10;
			ctrl.addBuff(juanliu);
		}
	},
};

module.exports = wanhuaUtils;
