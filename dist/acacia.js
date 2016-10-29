(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Acacia = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = require('./libs/Controller');

var Jx3Simulator = function () {
	function Jx3Simulator(options) {
		_classCallCheck(this, Jx3Simulator);

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
				delay: 100
			},
			talent: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
			recipes: {},
			effects: {
				cw: 0,
				water: 0,
				thunder: 0,
				setEffect: []
			}
		};
		if (options && (typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
			this.init(options);
		}
		return this;
	}

	_createClass(Jx3Simulator, [{
		key: 'init',
		value: function init(options) {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = Object.keys(options)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var key = _step.value;

					if (_typeof(options[key]) === 'object' && !Array.isArray(options[key])) {
						var subOption = options[key];
						var _iteratorNormalCompletion2 = true;
						var _didIteratorError2 = false;
						var _iteratorError2 = undefined;

						try {
							for (var _iterator2 = Object.keys(subOption)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
								var subKey = _step2.value;

								this.options[key][subKey] = subOption[subKey];
							}
						} catch (err) {
							_didIteratorError2 = true;
							_iteratorError2 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion2 && _iterator2.return) {
									_iterator2.return();
								}
							} finally {
								if (_didIteratorError2) {
									throw _iteratorError2;
								}
							}
						}
					} else {
						this.options[key] = options[key];
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	}, {
		key: 'run',
		value: function run() {
			return new Controller(this.options);
		}
	}]);

	return Jx3Simulator;
}();

module.exports = Jx3Simulator;

},{"./libs/Controller":3}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = require('./Utils');

var Buff = function () {
	function Buff(data) {
		_classCallCheck(this, Buff);

		// 初始化 Buff 的额外加成
		this.extraAttr = {
			damage: 0,
			attackAddPercent: 0,
			attackAddBase: 0,
			critAddPercent: 0,
			critAddBase: 0,
			hitAddPercent: 0,
			hitAddBase: 0,
			critEffAddPercent: 0,
			critEffAddBase: 0,
			overcomeAddPercent: 0,
			overcomeAddBase: 0,
			strainAddPercent: 0,
			strainAddBase: 0
		};
		// 载入数据
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = Object.keys(data)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var key = _step.value;

				this[key] = data[key];
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		this.level = 1;
		return this;
	}

	_createClass(Buff, [{
		key: 'updateTime',
		value: function updateTime(ctrl) {
			var diff = ctrl.time - this.checkTime;
			var lastRemain = this.remain;
			this.remain -= diff;
			this.checkTime = ctrl.time;
			this.remain = this.remain >= 0 ? this.remain : 0;
			if (this.type == 'dot') {
				var lastRemainHit = (this.duration - lastRemain) / this.interval;
				var nowRemainHit = (this.duration - this.remain) / this.interval;
				var hit = lastRemainHit - nowRemainHit;
				hit = Math.floor(hit);
				while (hit-- > 0) {
					this.calc(ctrl);
				}
			}
			if (this.remain <= 0 || this.level <= 0) {
				ctrl.deleteBuff(this.name);
				ctrl.deleteDebuff(this.name);
				return false;
			}
			return true;
		}
	}, {
		key: 'applyRecipe',
		value: function applyRecipe(ctrl) {
			if (this.recipeName && this.recipeName != 'none') {
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = ctrl.recipes[this.recipeName][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var recipe = _step2.value;

						if (recipe.active && recipe.effect == 'durationAdd') {
							this.duration += recipe.value;
						}
						if (recipe.active && recipe.effect == 'debuffAdd') {
							var debuff = ctrl.getBuff(recipe.value);
							ctrl.addDebuff(debuff);
						}
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
			}
		}
	}, {
		key: 'calc',
		value: function calc(ctrl, multiHit) {
			var dotHit = 1;
			if (multiHit) {
				dotHit = multiHit;
			}
			// 面板攻击 = 基础攻击 + 最受益属性 * 最受益属性加成 * (Buff 攻击百分比加成 + 自身攻击百分比加成) + Buff 攻击加成 + 自身攻击加成
			var attack = parseInt(ctrl.myself.attributes.basicAttack, 10) * (1 + this.extraAttr.attackAddPercent / 100 + ctrl.myself.extra.attackAddPercent / 100) + ctrl.myself.attributes.spunk * 1.95 + this.extraAttr.attackAddBase + ctrl.myself.extra.attackAddBase;
			// 会心率 = 自身会心率 + (Buff 会心等级加成 + 自身会心等级加成) / 41.43925 + Buff 会心率加成 + 自身会心率加成
			var crit = parseFloat(ctrl.myself.attributes.crit) + (this.extraAttr.critAddBase + ctrl.myself.extra.critAddBase) / 41.43925 + this.extraAttr.critAddPercent + ctrl.myself.extra.critAddPercent;
			// 会效率 = 自身会效率 + (Buff 会效等级加成 + 自身会效等级加成) / 15.066 + Buff 会效率加成 + 自身会效率加成
			var critEff = parseFloat(ctrl.myself.attributes.critEff) + (this.extraAttr.critEffAddBase + ctrl.myself.extra.critEffAddBase) / 15.066 + this.extraAttr.critEffAddPercent + ctrl.myself.extra.critEffAddPercent;
			// 命中率 = 自身命中率 + (Buff 命中等级加成 + 自身命中等级加成) / 34.24725 + Buff 命中率加成 + 自身命中率加成
			var hit = parseFloat(ctrl.myself.attributes.hit) + (this.extraAttr.hitAddBase + ctrl.myself.extra.hitAddBase) / 34.24725 + this.extraAttr.hitAddPercent + ctrl.myself.extra.hitAddPercent;
			// 无双率 = 自身无双率 + (Buff 无双等级加成 + 自身无双等级加成) / 25.6835 + Buff 无双率加成 + 自身无双率加成
			var strain = parseFloat(ctrl.myself.attributes.strain) + (this.extraAttr.strainAddBase + ctrl.myself.extra.strainAddBase) / 25.6835 + this.extraAttr.strainAddPercent + ctrl.myself.extra.strainAddPercent;
			// 破防 = 自身破防等级 + 基础破防等级 * (Buff 破防百分比加成 + 自身破防百分比加成) + Buff 破防等级加成 + 自身破防等级加成
			var overcome = parseInt(ctrl.myself.attributes.overcome, 10) + (ctrl.myself.attributes.overcome - ctrl.myself.attributes.spunk * 0.34) * (this.extraAttr.overcomeAddPercent / 100 + ctrl.myself.extra.overcomeAddPercent / 100) + parseInt(this.extraAttr.overcomeAddBase, 10) + parseInt(ctrl.myself.extra.overcomeAddBase, 10);

			var onFightAttr = {
				attack: attack,
				crit: crit,
				critEff: critEff,
				hit: hit,
				strain: strain,
				overcome: overcome,
				basicAttack: parseInt(ctrl.myself.attributes.basicAttack, 10),
				haste: parseInt(ctrl.myself.attributes.haste, 10),
				extraHaste: parseInt(ctrl.myself.extra.haste, 10),
				damageAddPercent: this.extraAttr.damage + parseInt(ctrl.myself.extra.damage, 10)
			};

			var damage = 0;
			var strainRequire = ctrl.target.strainRequire;
			// 识破率 = 无双要求 - 当前无双率
			var insightRate = strainRequire - onFightAttr.strain;
			insightRate = parseFloat(insightRate < 0 ? 0 : insightRate);
			var roll = Math.random() * 100;
			var flag = {
				insight: false,
				crit: false,
				hit: false
			};
			if (roll <= insightRate) {
				flag.insight = true;
			} else if (roll <= insightRate + parseFloat(onFightAttr.crit)) {
				flag.crit = true;
				this.onSkillCritEvent(ctrl);
			} else {
				flag.hit = true;
				this.onSkillHitEvent(ctrl);
			}

			if (!flag.miss && ctrl.target.curLife / ctrl.target.life < 0.35) {}
			// TODO: 斩杀控制


			// 伤害 = (攻击 * Buff 系数 + 随机浮动伤害 * (识破与否 * 0.25 + 会心与否 * 会效率 + 命中与否)) * 破防加成
			damage = (onFightAttr.attack * this.cof + (this.max - this.min) * Math.random() + this.min) * (0.25 * flag.insight + onFightAttr.critEff / 100 * flag.crit + 1 * flag.hit);
			damage = damage * (1 + onFightAttr.overcome / 3616.925) * (1 - ctrl.target.shield / 100) * (1 + onFightAttr.damageAddPercent / 100);
			damage = damage.toFixed(0) * dotHit;
			var status = (flag.insight ? 'insight' : '') + (flag.crit ? 'crit' : '') + (flag.hit ? 'hit' : '');
			// const log = `${this.name}(buff) ${status} ${damage}`;

			// Utils.logln(log);
			ctrl.log(this.name + '(buff)', status, damage);
			return damage;
		}
	}]);

	return Buff;
}();

module.exports = Buff;

},{"./Utils":6}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buff = require('./Buff');
var Skill = require('./Skill');
var Macro = require('./Macro');
var Utils = require('./Utils');

var huajianBuff = require('./schools/huajian/buffs');
var huajianSkills = require('./schools/huajian/skills');
var huajianRecipes = require('./schools/huajian/recipes');
var huajianTalents = require('./schools/huajian/talents');
var huajianUutils = require('./schools/huajian/utils');

var schools = {
	huajian: {
		buffs: huajianBuff,
		skills: huajianSkills,
		recipes: huajianRecipes,
		talents: huajianTalents,
		utils: huajianUutils
	}
};

var targetList = {
	96: {
		id: 0,
		level: 96,
		name: '初级试炼木桩(96)',
		life: 5000000,
		mana: 5000000,
		curLife: 5000000,
		hitRequire: 102.5,
		strainRequire: 15,
		shield: 15
	},
	97: {
		id: 1,
		level: 97,
		name: '中级试炼木桩(97)',
		life: 5000000,
		mana: 5000000,
		curLife: 5000000,
		hitRequire: 105,
		strainRequire: 20,
		shield: 25
	},
	98: {
		id: 2,
		level: 98,
		name: '高级试炼木桩(98)',
		life: 5000000,
		mana: 5000000,
		curLife: 5000000,
		hitRequire: 110,
		strainRequire: 30,
		shield: 35
	},
	99: {
		id: 3,
		level: 99,
		name: '极境试炼木桩(99)',
		life: 5000000,
		mana: 5000000,
		curLife: 5000000,
		hitRequire: 115,
		strainRequire: 40,
		shield: 40
	}
};

var Controller = function () {
	function Controller(options) {
		_classCallCheck(this, Controller);

		var school = options.school;
		this.schoolData = schools[school];
		this.buffCtrl = {
			selfList: {},
			targetList: {}
		};
		this.skillCtrl = {
			list: {},
			curSkill: null
		};
		this.myself = {
			attributes: options.self,
			extra: {
				damage: 0,
				attackAddPercent: 0,
				attackAddBase: 0,
				critAddPercent: 0,
				critAddBase: 0,
				hitAddPercent: 0,
				hitAddBase: 0,
				critEffAddPercent: 0,
				critEffAddBase: 0,
				overcomeAddPercent: 0,
				overcomeAddBase: 0,
				strainAddPercent: 0,
				strainAddBase: 0,
				haste: 0
			},
			status: {
				ota: false,
				otaRemain: 0,
				curOta: 0,
				gcd: 0,
				curInterval: 0
			}
		};
		this.target = targetList[options.target];
		this.setting = {
			effects: options.effects
		};
		this.damage = 0;
		this.time = 0;
		this.logs = {};

		this.init(options);
		return this;
	}

	_createClass(Controller, [{
		key: 'init',
		value: function init(options) {
			this.recipes = this.schoolData.recipes;
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = Object.keys(options.recipes)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var key = _step.value;

					for (var _i = 0; _i < options.recipes[key].length; _i++) {
						var recipeId = options.recipes[key][_i];
						this.recipes[key][recipeId].active = true;
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			this.buffs = {};
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = this.schoolData.buffs[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var buff = _step2.value;

					this.buffs[buff.name] = buff;
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}

			this.skills = {};
			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = this.schoolData.skills[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var skill = _step3.value;

					this.skillCtrl.list[skill.name] = new Skill(skill);
					this.skillCtrl.list[skill.name].applyRecipe(this);
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3.return) {
						_iterator3.return();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}

			this.talents = {};
			for (var i = 0; i < this.schoolData.talents.length; i++) {
				var talentGroup = this.schoolData.talents[i];
				for (var j = 0; j < talentGroup.length; j++) {
					var talent = talentGroup[j];
					if (j == options.talent[i]) {
						talent.active = true;
					}
					this.talents[talent.name] = talent;
				}
			}
		}

		// 控制器接口方法
		/**
   * 向控制器自身 Buff 列表中添加一个 Buff
   *
   * @param {Buff} buff 一个 Buff 对象
   *
   * @memberOf Controller
   */

	}, {
		key: 'addBuff',
		value: function addBuff(buff) {
			buff.checkTime = this.time;
			if (!(buff.name in this.buffCtrl.selfList)) {
				this.buffCtrl.selfList[buff.name] = buff;
				// if (buff.type == 'buff') {
				// 	for (const key of Object.keys(buff.data)) {
				// 		const buffNumber = buff.data[key];
				// 		this.myself.extra[key] += buffNumber * buff.level;
				// 	}
				// }
			} else {
				var existBuff = this.buffCtrl.selfList[buff.name];
				var level = Math.min(existBuff.level + 1, existBuff.maxLevel);
				// if (buff.type == 'buff' && existBuff.level < level) {
				// 	for (const key of Object.keys(buff.data)) {
				// 		const buffNumber = buff.data[key];
				// 		this.myself.extra[key] += buffNumber;
				// 	}
				// }
				this.buffCtrl.selfList[buff.name].level = level;
			}
			this.buffCtrl.selfList[buff.name].remain = buff.duration;
		}

		/**
   * 向控制器目标 Buff 列表中添加一个 Buff
   *
   * @param {Buff} buff 一个 Buff 对象
   *
   * @memberOf Controller
   */

	}, {
		key: 'addDebuff',
		value: function addDebuff(buff) {
			buff.checkTime = this.time;
			if (!(buff.name in this.buffCtrl.targetList)) {
				// if(buff.type == 'dot'){
				// 	const selfHaste = this.myself.attributes.haste;
				// 	const extraHaste = this.myself.extra.haste;
				// 	buff.interval = Utils.hasteCalc(selfHaste, extraHaste, buff.interval);
				// 	buff.duration = Utils.hasteCalc(selfHaste, extraHaste, buff.duration);
				// }
				this.buffCtrl.targetList[buff.name] = buff;
				// if (buff.type == 'buff') {
				// 	for (const key of Object.keys(buff.data)) {
				// 		const buffNumber = buff.data[key];
				// 		this.myself.extra[key] += buffNumber * buff.level;
				// 	}
				// }
			} else {
				var existBuff = this.buffCtrl.targetList[buff.name];
				var level = Math.min(existBuff.level + 1, existBuff.maxLevel);
				// if (buff.type == 'buff' && existBuff.level < level) {
				// 	for (const key of Object.keys(buff.data)) {
				// 		const buffNumber = buff.data[key];
				// 		this.myself.extra[key] += buffNumber;
				// 	}
				// }
				this.buffCtrl.targetList[buff.name].level = level;
			}
			this.buffCtrl.targetList[buff.name].remain = buff.duration;
		}

		/**
   * 从控制器自身 Buff 列表中删除一个 Buff
   *
   * @param {string} buffName Buff 的名称
   *
   * @memberOf Controller
   */

	}, {
		key: 'deleteBuff',
		value: function deleteBuff(buffName) {
			if (buffName in this.buffCtrl.selfList) {
				var buff = this.buffCtrl.selfList[buffName];
				delete this.buffCtrl.selfList[buffName];
				// if (buff.type == 'buff') {
				// 	for (const key of Object.keys(buff.data)) {
				// 		const buffNumber = buff.data[key];
				// 		this.myself.extra[key] -= buffNumber * buff.level;
				// 	}
				// }
			}
		}

		/**
   * 从控制器目标 Buff 列表中删除一个 Buff
   *
   * @param {string} buffName Buff 的名称
   *
   * @memberOf Controller
   */

	}, {
		key: 'deleteDebuff',
		value: function deleteDebuff(buffName) {
			if (buffName in this.buffCtrl.targetList) {
				var buff = this.buffCtrl.targetList[buffName];
				delete this.buffCtrl.targetList[buffName];
				// if (buff.type == 'buff') {
				// 	for (const key of Object.keys(buff.data)) {
				// 		const buffNumber = buff.data[key];
				// 		this.myself.extra[key] -= buffNumber * buff.level;
				// 	}
				// }
			}
		}

		/**
   * 刷新一个 dot。
   *
   * @param {string} buffName Buff 的名称
   *
   * @memberOf Controller
   */

	}, {
		key: 'dotRefresh',
		value: function dotRefresh(buffName) {
			if (buffName in this.buffCtrl.targetList) {
				var buff = this.buffCtrl.targetList[buffName];
				// buff.updateTime(this);
				var refreshTime = buff.remain % buff.interval;
				// const selfHaste = this.myself.attributes.haste;
				// const extraHaste = this.myself.extra.haste;
				buff.remain = (buff.duration / buff.interval - 1) * buff.interval + refreshTime;
				// buff.interval = Utils.hasteCalc(selfHaste, extraHaste, buff.interval);
				// buff.duration = Utils.hasteCalc(selfHaste, extraHaste, buff.duration);
				if ('addedInterval' in buff) buff.addedInterval = false;
				if (buff.recipeName != 'none') {
					var _iteratorNormalCompletion4 = true;
					var _didIteratorError4 = false;
					var _iteratorError4 = undefined;

					try {
						for (var _iterator4 = this.recipes[buff.recipeName][Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
							var recipe = _step4.value;

							if (recipe.active && recipe.effect == 'debuffAdd') {
								this.addDebuff(this.getBuff(recipe.value));
							}
						}
					} catch (err) {
						_didIteratorError4 = true;
						_iteratorError4 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion4 && _iterator4.return) {
								_iterator4.return();
							}
						} finally {
							if (_didIteratorError4) {
								throw _iteratorError4;
							}
						}
					}
				}
			}
		}

		/**
   * 获得一个正在生效的 Buff 的状态。
   *
   * @param {string} buffName Buff 的名称
   * @returns {Buff|boolean} 如果该 Buff 存在，则返回这个 Buff，反之返回 false。
   *
   * @memberOf Controller
   */

	}, {
		key: 'getActiveBuff',
		value: function getActiveBuff(buffName) {
			var buff = this.buffCtrl.selfList[buffName];
			// if (buff && buff.updateTime(this)) {
			if (buff) {
				return buff;
			}
			return false;
		}

		/**
   *获得一个正在目标身上生效的 Buff 的状态。
   *
   * @param {string} buffName Buff 的名称
   * @returns {Buff|boolean} 如果该 Buff 存在，则返回这个 Buff，反之返回 false。
   *
   * @memberOf Controller
   */

	}, {
		key: 'getActiveDebuff',
		value: function getActiveDebuff(buffName) {
			var buff = this.buffCtrl.targetList[buffName];
			// if (buff && buff.updateTime(this)) {
			if (buff) {
				return buff;
			}
			return false;
		}

		/**
   * 从技能库中获取一个 Buff 对象
   *
   * @param {string} buffName Buff 的名称
   * @returns {Buff|boolean} 如果该 Buff 存在，则返回这个 Buff，反之返回 false。
   *
   * @memberOf Controller
   */

	}, {
		key: 'getBuff',
		value: function getBuff(buffName) {
			var buff = this.buffs[buffName];
			if (buff) return new Buff(buff);
			return false;
		}

		/**
   * 获取一个技能的状态。
   *
   * @param {string} skillName 技能的名称
   * @returns 如果该技能存在，则返回这个技能本身，反之则返回 false
   *
   * @memberOf Controller
   */

	}, {
		key: 'getSkill',
		value: function getSkill(skillName) {
			var skill = this.skillCtrl.list[skillName];
			if (skill) return skill;
			return false;
		}

		/**
   * 查看自身是否存在某个 Buff
   *
   * @param {string} buffName Buff 的名称
   * @returns {boolean} 存在则返回 true，反之 false。
   *
   * @memberOf Controller
   */

	}, {
		key: 'hasBuff',
		value: function hasBuff(buffName) {
			var buff = this.buffCtrl.selfList[buffName];
			// if (buff && buff.updateTime(this)) return true;
			if (buff) return true;
			return false;
		}

		/**
   * 查看目标是否存在某个 Buff
   *
   * @param {string} buffName Buff 的名称
   * @returns 存在则返回 true，反之 false。
   *
   * @memberOf Controller
   */

	}, {
		key: 'hasDebuff',
		value: function hasDebuff(buffName) {
			var buff = this.buffCtrl.targetList[buffName];
			// if (buff && buff.updateTime(this)) return true;
			if (buff) return true;
			return false;
		}

		/**
   * 查看某个奇穴是否被激活
   *
   * @param {string} name 奇穴名称
   * @returns {boolean} 返回激活的状态
   *
   * @memberOf Controller
   */

	}, {
		key: 'isTalentActive',
		value: function isTalentActive(name) {
			return this.talents[name].active;
		}
	}, {
		key: 'addDamage',
		value: function addDamage(damage) {
			this.damage += damage * 1;
		}
	}, {
		key: 'otaCtrl',
		value: function otaCtrl() {
			if (this.myself.status.ota) {
				this.myself.status.otaRemain--;
				var skill = this.skillCtrl.curSkill;
				if (this.myself.status.otaRemain <= 0) {
					this.myself.status.curOta = 0;
					this.myself.status.ota = false;
					skill.calc(this);
					skill.onSkillFinish(this);
				} else if (skill.type == 'channel') {
					if ((this.myself.status.curOta - this.myself.status.otaRemain) % this.myself.status.curInterval === 0) {
						skill.calc(this);
					}
				}
			}
		}
	}, {
		key: 'cdCtrl',
		value: function cdCtrl() {
			var _iteratorNormalCompletion5 = true;
			var _didIteratorError5 = false;
			var _iteratorError5 = undefined;

			try {
				for (var _iterator5 = Object.keys(this.skillCtrl.list)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
					var skillKey = _step5.value;

					var skill = this.skillCtrl.list[skillKey];
					if (skill.cdRemain > 0) {
						skill.cdRemain--;
					}
					if (skill.cdRemain < 0) {
						skill.cdRemain = 0;
					}
				}
			} catch (err) {
				_didIteratorError5 = true;
				_iteratorError5 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion5 && _iterator5.return) {
						_iterator5.return();
					}
				} finally {
					if (_didIteratorError5) {
						throw _iteratorError5;
					}
				}
			}
		}
	}, {
		key: 'buffTimeCtrl',
		value: function buffTimeCtrl() {
			var _iteratorNormalCompletion6 = true;
			var _didIteratorError6 = false;
			var _iteratorError6 = undefined;

			try {
				for (var _iterator6 = Object.keys(this.buffCtrl.selfList)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
					var buffKey = _step6.value;

					var buff = this.buffCtrl.selfList[buffKey];
					buff.remain--;
					if (buff.remain <= 0 || buff.level <= 0) {
						this.deleteBuff(buff.name);
					}
				}
			} catch (err) {
				_didIteratorError6 = true;
				_iteratorError6 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion6 && _iterator6.return) {
						_iterator6.return();
					}
				} finally {
					if (_didIteratorError6) {
						throw _iteratorError6;
					}
				}
			}

			var _iteratorNormalCompletion7 = true;
			var _didIteratorError7 = false;
			var _iteratorError7 = undefined;

			try {
				for (var _iterator7 = Object.keys(this.buffCtrl.targetList)[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
					var _buffKey = _step7.value;

					var _buff = this.buffCtrl.targetList[_buffKey];
					_buff.remain--;
					if (_buff.type == 'dot' && (_buff.duration - _buff.remain) % _buff.interval === 0) {
						_buff.calc(this);
					}
					if (_buff.remain <= 0 || _buff.level <= 0) {
						this.deleteDebuff(_buff.name);
					}
				}
			} catch (err) {
				_didIteratorError7 = true;
				_iteratorError7 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion7 && _iterator7.return) {
						_iterator7.return();
					}
				} finally {
					if (_didIteratorError7) {
						throw _iteratorError7;
					}
				}
			}
		}
	}, {
		key: 'extraAttributeApply',
		value: function extraAttributeApply() {
			this.myself.extra = {
				damage: 0,
				attackAddPercent: 0,
				attackAddBase: 0,
				critAddPercent: 0,
				critAddBase: 0,
				hitAddPercent: 0,
				hitAddBase: 0,
				critEffAddPercent: 0,
				critEffAddBase: 0,
				overcomeAddPercent: 0,
				overcomeAddBase: 0,
				strainAddPercent: 0,
				strainAddBase: 0,
				haste: 0
			};
			var _iteratorNormalCompletion8 = true;
			var _didIteratorError8 = false;
			var _iteratorError8 = undefined;

			try {
				for (var _iterator8 = Object.keys(this.buffCtrl.selfList)[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
					var buffKey = _step8.value;

					var buff = this.buffCtrl.selfList[buffKey];
					if (buff.type == 'buff') {
						var _iteratorNormalCompletion10 = true;
						var _didIteratorError10 = false;
						var _iteratorError10 = undefined;

						try {
							for (var _iterator10 = Object.keys(buff.data)[Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
								var key = _step10.value;

								var buffNumber = buff.data[key];
								this.myself.extra[key] += buffNumber * buff.level;
							}
						} catch (err) {
							_didIteratorError10 = true;
							_iteratorError10 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion10 && _iterator10.return) {
									_iterator10.return();
								}
							} finally {
								if (_didIteratorError10) {
									throw _iteratorError10;
								}
							}
						}
					}
				}
			} catch (err) {
				_didIteratorError8 = true;
				_iteratorError8 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion8 && _iterator8.return) {
						_iterator8.return();
					}
				} finally {
					if (_didIteratorError8) {
						throw _iteratorError8;
					}
				}
			}

			var _iteratorNormalCompletion9 = true;
			var _didIteratorError9 = false;
			var _iteratorError9 = undefined;

			try {
				for (var _iterator9 = Object.keys(this.buffCtrl.targetList)[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
					var _buffKey2 = _step9.value;

					var _buff2 = this.buffCtrl.targetList[_buffKey2];
					if (_buff2.type == 'buff') {
						var _iteratorNormalCompletion11 = true;
						var _didIteratorError11 = false;
						var _iteratorError11 = undefined;

						try {
							for (var _iterator11 = Object.keys(_buff2.data)[Symbol.iterator](), _step11; !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done); _iteratorNormalCompletion11 = true) {
								var _key = _step11.value;

								var _buffNumber = _buff2.data[_key];
								this.myself.extra[_key] += _buffNumber * _buff2.level;
							}
						} catch (err) {
							_didIteratorError11 = true;
							_iteratorError11 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion11 && _iterator11.return) {
									_iterator11.return();
								}
							} finally {
								if (_didIteratorError11) {
									throw _iteratorError11;
								}
							}
						}
					}
				}
			} catch (err) {
				_didIteratorError9 = true;
				_iteratorError9 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion9 && _iterator9.return) {
						_iterator9.return();
					}
				} finally {
					if (_didIteratorError9) {
						throw _iteratorError9;
					}
				}
			}
		}
	}, {
		key: 'log',
		value: function log(skillName, status, damage) {
			if (!this.logs[skillName]) {
				this.logs[skillName] = {
					count: 0,
					name: skillName,
					damage: 0,
					hit: { count: 0, max: 0, min: 999999, damage: 0 },
					insight: { count: 0, max: 0, min: 999999, damage: 0 },
					miss: { count: 0, max: 0, min: 999999, damage: 0 },
					crit: { count: 0, max: 0, min: 999999, damage: 0 }
				};
			}
			this.logs[skillName].count++;
			this.logs[skillName].damage += damage * 1;
			this.logs[skillName][status].count++;
			this.logs[skillName][status].damage += damage * 1;

			if (damage <= this.logs[skillName][status].min) {
				this.logs[skillName][status].min = damage;
			}
			if (damage > this.logs[skillName][status].max) {
				this.logs[skillName][status].max = damage;
			}
			this.addDamage(damage);
		}
	}, {
		key: 'digest',
		value: function digest() {
			// 执行宏程序
			this.runMacro();
			// 读条 时间控制
			this.otaCtrl();
			// 公共CD 时间控制
			if (this.myself.status.gcd > 0) {
				this.myself.status.gcd--;
			}
			// 技能CD 时间控制
			this.cdCtrl();
			// buff 时间控制
			this.buffTimeCtrl();
			this.extraAttributeApply();
			// dps 计算
			this.time++;
			// if (this.time % 16 === 0) {
			// 	this.dps = (this.globalDamage / this.time) * 16;
			// 	if (this.kill) this.target.curLife = this.target.life - this.globalDamage;
			// 	if (this.target.curLife <= 0) {
			// 		this.stop();
			// 	}
			// }
		}
	}, {
		key: 'runMacro',
		value: function runMacro() {
			// /cast [tnobuff:兰摧玉折&tnobuff:钟林毓秀] 乱洒青荷
			if (Macro.tnobuff(this, '兰摧玉折') && Macro.tnobuff(this, '钟林毓秀')) {
				if (Macro.cast(this, '乱洒青荷')) return;
			}
			// /cast [tnobuff:兰摧玉折&tnobuff:钟林毓秀&buff:乱洒青荷] 阳明指
			if (Macro.tnobuff(this, '兰摧玉折') && Macro.tnobuff(this, '钟林毓秀') && Macro.buff(this, '乱洒青荷')) {
				if (Macro.cast(this, '阳明指')) return;
			}
			// /cast [tnobuff:兰摧玉折] 兰摧玉折
			if (Macro.tnobuff(this, '兰摧玉折')) {
				if (Macro.cast(this, '兰摧玉折')) return;
			}
			// /cast [tnobuff:商阳指] 商阳指
			if (Macro.tnobuff(this, '商阳指')) {
				if (Macro.cast(this, '商阳指')) return;
			}
			// /cast [tnobuff:钟林毓秀] 阳明指
			if (Macro.tnobuff(this, '钟林毓秀')) {
				if (Macro.cast(this, '阳明指')) return;
			}
			// /cast [bufftime:焚玉<2|nobuff:焚玉&tbuff:钟林毓秀&tbuff:兰摧玉折&tbuff:商阳指] 水月无间
			if ((Macro.bufftime(this, '焚玉', 2, '<') || Macro.nobuff(this, '焚玉')) && Macro.tbuff(this, '钟林毓秀') && Macro.tbuff(this, '兰摧玉折') && Macro.tbuff(this, '商阳指')) {
				if (Macro.cast(this, '水月无间')) return;
			}
			// /cast [bufftime:焚玉<2|nobuff:焚玉&tbuff:钟林毓秀&tbuff:兰摧玉折&tbuff:商阳指] 玉石俱焚
			if ((Macro.bufftime(this, '焚玉', 2, '<') || Macro.nobuff(this, '焚玉')) && Macro.tbuff(this, '钟林毓秀') && Macro.tbuff(this, '兰摧玉折') && Macro.tbuff(this, '商阳指')) {
				if (Macro.cast(this, '玉石俱焚')) return;
			}
			// /cast 阳明指
			if (Macro.cast(this, '阳明指')) return;
		}
	}]);

	return Controller;
}();

module.exports = Controller;

},{"./Buff":2,"./Macro":4,"./Skill":5,"./Utils":6,"./schools/huajian/buffs":7,"./schools/huajian/recipes":8,"./schools/huajian/skills":9,"./schools/huajian/talents":10,"./schools/huajian/utils":11}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = require('./Utils');
var clone = require('clone');

var Macro = function () {
	function Macro() {
		_classCallCheck(this, Macro);
	}

	_createClass(Macro, null, [{
		key: 'cast',

		// 宏指令
		// 动作指令
		value: function cast(ctrl, skillName) {
			// 释放技能
			var skill = ctrl.getSkill(skillName);

			if (!skill || skill.cdRemain > 0) {
				return false;
			}

			var roleStatus = ctrl.myself.status;

			if (!roleStatus.ota && (roleStatus.gcd == 0 || skill.gcdCast)) {
				return this.fcast(ctrl, skillName);
			}

			return false;
		}
	}, {
		key: 'fcast',
		value: function fcast(ctrl, skillName) {
			// 强行释放技能
			var skill = ctrl.getSkill(skillName);
			var skillParam = clone(skill);

			if (!skill || skill.cdRemain > 0) {
				return false;
			}

			var roleStatus = ctrl.myself.status;
			// 清除特殊加成
			skill.cleanExtra();
			// 执行门派通用的技能准备，例如免读条等
			ctrl.schoolData.utils.generalSkillPrepare(ctrl, skillParam);
			skill.onSkillPrepare(ctrl);
			if (skillParam.type == 'invalid') {
				return false;
			}

			if (skillParam.type == 'ota') {
				roleStatus.ota = true;
				ctrl.skillCtrl.curSkill = skill;
				roleStatus.curOta = Utils.hasteCalc(ctrl.myself.attributes.haste, ctrl.myself.extra.haste, skillParam.ota);
				roleStatus.otaRemain = roleStatus.curOta;
				roleStatus.gcd = Utils.hasteCalc(ctrl.myself.attributes.haste, ctrl.myself.extra.haste, 24);
				return true;
			} else if (skillParam.type == 'instant') {
				roleStatus.ota = false;
				roleStatus.gcd = Utils.hasteCalc(ctrl.myself.attributes.haste, ctrl.myself.extra.haste, 24);
				skill.calc(ctrl);
				skill.onSkillFinish(ctrl);
				return true;
			} else if (skillParam.type == 'channel') {
				roleStatus.ota = true;
				ctrl.skillCtrl.curSkill = skill;
				roleStatus.curOta = Utils.hasteCalc(ctrl.myself.attributes.haste, ctrl.myself.extra.haste, skillParam.interval) * (skillParam.ota / skillParam.interval);
				roleStatus.otaRemain = roleStatus.curOta;
				roleStatus.curInterval = Utils.hasteCalc(ctrl.myself.attributes.haste, ctrl.myself.extra.haste, skillParam.interval);
				roleStatus.gcd = Utils.hasteCalc(ctrl.myself.attributes.haste, ctrl.myself.extra.haste, 24);
				return true;
			}
			return false;
		}

		// 自身条件

	}, {
		key: 'buff',
		value: function buff(ctrl, buffName, level, sign) {
			// 判断自己身上是否存在某增益或减益buff
			// 或者判断自己身上的某增益或减益buff是否大于，小于或等于几层
			if (!level) level = 1;
			if (!sign) sign = '=';
			var buff = ctrl.getActiveBuff(buffName);
			if (buff) {
				switch (sign) {
					case '>':
						if (buff.level > level) return true;
						break;
					case '<':
						if (buff.level < level) return true;
						break;
					case '=':
						if (buff.level == level) return true;
						break;
					case '<=':
						if (buff.level <= level) return true;
						break;
					case '>=':
						if (buff.level >= level) return true;
						break;
					default:
						return false;
				}
			}
			return false;
		}
	}, {
		key: 'nobuff',
		value: function nobuff(ctrl, buffName) {
			// 判断自己身上无某增益或减益buff
			var buff = ctrl.getActiveBuff(buffName);
			if (buff.level) {
				return false;
			}
			return true;
		}
	}, {
		key: 'bufftime',
		value: function bufftime(ctrl, buffName, seconds, sign) {
			// 判断自己身上某增益或减益buff 持续时间大于，小于或等于多少秒
			var buff = ctrl.getActiveBuff(buffName);
			if (buff) {
				var timeRemain = Math.floor(buff.remain / 16);
				switch (sign) {
					case '>':
						if (timeRemain > seconds) return true;
						break;
					case '<':
						if (timeRemain < seconds) return true;
						break;
					case '=':
						if (timeRemain == seconds) return true;
						break;
					case '<=':
						if (timeRemain <= seconds) return true;
						break;
					case '>=':
						if (timeRemain >= seconds) return true;
						break;
					default:
						break;
				}
			}
			return false;
		}
	}, {
		key: 'life',
		value: function life(ctrl, percent, sign) {
			// 生命值大于，小于或等于最大血量的百分之多少
			if (sign == '>' && ctrl.myself.states.life > percent) return true;
			if (sign == '<' && ctrl.myself.states.life < percent) return true;
			if (sign == '=' && ctrl.myself.states.life == percent) return true;
			if (sign == '<=' && ctrl.myself.states.life <= percent) return true;
			if (sign == '>=' && ctrl.myself.states.life >= percent) return true;
			return false;
		}
	}, {
		key: 'mana',
		value: function mana(ctrl, percent, sign) {
			// 内力值大于，小于或等于最大血量的百分之多少
			if (sign == '>' && ctrl.myself.states.mana > percent) return true;
			if (sign == '<' && ctrl.myself.states.mana < percent) return true;
			if (sign == '=' && ctrl.myself.states.mana == percent) return true;
			if (sign == '<=' && ctrl.myself.states.mana <= percent) return true;
			if (sign == '>=' && ctrl.myself.states.mana >= percent) return true;
			return false;
		}
		// 目标条件

	}, {
		key: 'tbuff',
		value: function tbuff(ctrl, buffName, level, sign) {
			// 判断目标身上是否存在某增益或减益buff
			// 或者判断目标身上的某增益或减益buff是否大于，小于或等于几层
			if (!level) level = 1;
			if (!sign) sign = '=';
			var buff = ctrl.getActiveDebuff(buffName);
			if (buff) {
				switch (sign) {
					case '>':
						if (buff.level > level) return true;
						break;
					case '<':
						if (buff.level < level) return true;
						break;
					case '=':
						if (buff.level == level) return true;
						break;
					case '<=':
						if (buff.level <= level) return true;
						break;
					case '>=':
						if (buff.level >= level) return true;
						break;
					default:
						return false;
				}
			}
			return false;
		}
	}, {
		key: 'tnobuff',
		value: function tnobuff(ctrl, buffName) {
			// 判断目标身上无某增益或减益buff
			var buff = ctrl.getActiveDebuff(buffName);
			if (buff.level) {
				return false;
			}
			return true;
		}
	}, {
		key: 'tbufftime',
		value: function tbufftime(ctrl, buffName, seconds, sign) {
			// 判断目标身上某增益或减益buff 持续时间大于，小于或等于多少秒
			var buff = ctrl.getActiveDebuff(buffName);
			if (buff) {
				var timeRemain = Math.floor(buff.remain / 16);
				switch (sign) {
					case '>':
						if (timeRemain > seconds) return true;
						break;
					case '<':
						if (timeRemain < seconds) return true;
						break;
					case '=':
						if (timeRemain == seconds) return true;
						break;
					case '<=':
						if (timeRemain <= seconds) return true;
						break;
					case '>=':
						if (timeRemain >= seconds) return true;
						break;
					default:
						break;
				}
			}
			return false;
		}
	}, {
		key: 'target',
		value: function target(ctrl, type) {
			// 目标是否为 npc 或者 玩家
			// DPS 测试器中，目标只能是NPC
			if (type == 'npc' || type == 'all') return true;
			return false;
		}
	}, {
		key: 'notarget',
		value: function notarget(ctrl) {
			// 目标是否存在
			// DPS 测试器中，目标只要血量高于0均存在
			if (ctrl.target.curLife > 0) return false;
			return true;
		}
	}, {
		key: 'distance',
		value: function distance(ctrl, _distance, sign) {
			// 离目标的距离大于，小于或等于多少尺
			// DPS 测试器中，不判定距离
			return true;
		}
		// 测试器条件

	}, {
		key: 'nocd',
		value: function nocd(ctrl, skillName) {
			// 判断自身技能是否没有CD
			var skill = ctrl.getSkill(skillName);
			if (!skill) {
				return skill.cdRemain <= 0;
			}
			return false;
		}
	}]);

	return Macro;
}();

module.exports = Macro;

},{"./Utils":6,"clone":14}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var clone = require('clone');

var Skill = function () {
	function Skill(data) {
		_classCallCheck(this, Skill);

		this.cdRemain = 0;
		this.fixAttr = {
			damage: 0,
			attackAddPercent: 0,
			attackAddBase: 0,
			critAddPercent: 0,
			critAddBase: 0,
			hitAddPercent: 0,
			hitAddBase: 0,
			critEffAddPercent: 0,
			critEffAddBase: 0,
			overcomeAddPercent: 0,
			overcomeAddBase: 0,
			strainAddPercent: 0,
			strainAddBase: 0
		};
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = Object.keys(data)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var key = _step.value;

				this[key] = data[key];
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator.return) {
					_iterator.return();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		return this;
	}

	_createClass(Skill, [{
		key: 'cleanExtra',
		value: function cleanExtra() {
			this.extraAttr = clone(this.fixAttr);
		}
	}, {
		key: 'applyRecipe',
		value: function applyRecipe(ctrl) {
			if (this.hasRecipes) {
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = ctrl.recipes[this.recipeName][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var recipe = _step2.value;

						if (recipe.active) {
							switch (recipe.effect) {
								case 'frameMinus':
									this.ota = this.ota - recipe.value;
									break;
								case 'damageAddPercent':
									this.fixAttr.damage = this.fixAttr.damage + recipe.value;
									break;
								case 'costMinusPercent':
									// this.cost
									break;
								case 'critAddPercent':
									this.fixAttr.critAddPercent = this.fixAttr.critAddPercent + recipe.value;
									break;
								case 'cdMinus':
									this.cd = this.cd - recipe.value;
									break;
								case 'hitAddPercent':
									this.fixAttr.hitAddPercent = this.fixAttr.hitAddPercent + recipe.value;
									break;
								default:
									break;
							}
						}
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}

				this.cleanExtra();
			}
		}
	}, {
		key: 'calc',
		value: function calc(ctrl) {
			// 面板攻击 = (基础攻击 * (Buff 攻击百分比加成 + 自身攻击百分比加成)) + (最受益属性 * 最受益属性加成) + Buff 攻击加成 + 自身攻击加成
			var attack = parseInt(ctrl.myself.attributes.basicAttack, 10) * (1 + this.extraAttr.attackAddPercent / 100 + ctrl.myself.extra.attackAddPercent / 100) + ctrl.myself.attributes.spunk * 1.95 + this.extraAttr.attackAddBase + ctrl.myself.extra.attackAddBase;
			// 会心率 = 自身会心率 + (Buff 会心等级加成 + 自身会心等级加成) / 41.43925 + Buff 会心率加成 + 自身会心率加成
			var crit = parseFloat(ctrl.myself.attributes.crit) + (this.extraAttr.critAddBase + ctrl.myself.extra.critAddBase) / 41.43925 + this.extraAttr.critAddPercent + ctrl.myself.extra.critAddPercent;
			// 会效率 = 自身会效率 + (Buff 会效等级加成 + 自身会效等级加成) / 15.066 + Buff 会效率加成 + 自身会效率加成
			var critEff = parseFloat(ctrl.myself.attributes.critEff) + (this.extraAttr.critEffAddBase + ctrl.myself.extra.critEffAddBase) / 15.066 + this.extraAttr.critEffAddPercent + ctrl.myself.extra.critEffAddPercent;
			// 命中率 = 自身命中率 + (Buff 命中等级加成 + 自身命中等级加成) / 34.24725 + Buff 命中率加成 + 自身命中率加成
			var hit = parseFloat(ctrl.myself.attributes.hit) + (this.extraAttr.hitAddBase + ctrl.myself.extra.hitAddBase) / 34.24725 + this.extraAttr.hitAddPercent + ctrl.myself.extra.hitAddPercent;
			// 无双率 = 自身无双率 + (Buff 无双等级加成 + 自身无双等级加成) / 25.6835 + Buff 无双率加成 + 自身无双率加成
			var strain = parseFloat(ctrl.myself.attributes.strain) + (this.extraAttr.strainAddBase + ctrl.myself.extra.strainAddBase) / 25.6835 + this.extraAttr.strainAddPercent + ctrl.myself.extra.strainAddPercent;
			// 破防 = 自身破防等级 + 基础破防等级 * (Buff 破防百分比加成 + 自身破防百分比加成) + Buff 破防等级加成 + 自身破防等级加成
			var overcome = parseInt(ctrl.myself.attributes.overcome, 10) + (ctrl.myself.attributes.overcome - ctrl.myself.attributes.spunk * 0.34) * (this.extraAttr.overcomeAddPercent / 100 + ctrl.myself.extra.overcomeAddPercent / 100) + parseInt(this.extraAttr.overcomeAddBase, 10) + parseInt(ctrl.myself.extra.overcomeAddBase, 10);

			var onFightAttr = {
				attack: attack,
				crit: crit,
				critEff: critEff,
				hit: hit,
				strain: strain,
				overcome: overcome,
				basicAttack: parseInt(ctrl.myself.attributes.basicAttack, 10),
				haste: parseInt(ctrl.myself.attributes.haste, 10),
				extraHaste: parseInt(ctrl.myself.extra.haste, 10),
				damageAddPercent: this.extraAttr.damage + parseInt(ctrl.myself.extra.damage, 10)
			};

			var damage = 0;
			var hitRequire = ctrl.target.hitRequire;
			var strainRequire = ctrl.target.strainRequire;
			var missRate = hitRequire - onFightAttr.hit;
			missRate = parseFloat(missRate < 0 ? 0 : missRate);
			var insightRate = strainRequire - onFightAttr.strain;
			insightRate = parseFloat(insightRate < 0 ? 0 : insightRate);
			var roll = Math.random() * 100;
			var flag = {
				miss: false,
				insight: false,
				crit: false,
				hit: false
			};
			if (this.target) {
				if (roll <= missRate) {
					flag.miss = true;
				} else if (roll <= missRate + insightRate) {
					flag.insight = true;
					this.onSkillHitEvent(ctrl);
				} else if (roll <= missRate + insightRate + parseFloat(onFightAttr.crit)) {
					flag.crit = true;
					this.onSkillCritEvent(ctrl);
				} else {
					flag.hit = true;
					this.onSkillHitEvent(ctrl);
				}
			} else {
				flag.hit = true;
				this.onSkillHitEvent(ctrl);
			}

			if (!flag.miss && ctrl.target.curLife / ctrl.target.life < ctrl.schoolData.utils.killLevel) {
				ctrl.schoolData.utils.kill(ctrl);
			}
			// 水雷特效触发
			if (!flag.miss && this.damageInstant) {
				// 水特效触发
				if (ctrl.setting.effects.water !== 0) {
					var water = ctrl.getBuff(ctrl.setting.effects.water);
					ctrl.addBuff(water);
				}
				// 雷特效触发
				if (ctrl.setting.effects.thunder !== 0) {
					if (!ctrl.hasBuff('雷特效CD')) {
						roll = Math.random() * 100;
						if (roll < 10) {
							var leiCD = ctrl.getBuff('雷特效CD');
							var thunder = ctrl.getBuff(ctrl.setting.effects.thunder);
							ctrl.addBuff(leiCD);
							ctrl.addBuff(thunder);
						}
					}
				}
			}
			this.cdRemain = this.cd;
			var log = '';
			if (this.damageInstant) {
				damage = (onFightAttr.attack * this.cof + (this.max - this.min) * Math.random() + this.min) * (0 * flag.miss + 0.25 * flag.insight + onFightAttr.critEff / 100 * flag.crit + 1 * flag.hit);

				damage = damage * (1 + onFightAttr.overcome / 3616.925) * (1 - ctrl.target.shield / 100) * (1 + onFightAttr.damageAddPercent / 100);
				damage = damage.toFixed(0);
				// Utils.calcDamage(damage);
			} else {
				damage = 0;
			}
			var status = (flag.miss > 0 ? 'miss' : '') + (flag.insight > 0 ? 'insight' : '') + (flag.crit > 0 ? 'crit' : '') + (flag.hit > 0 ? 'hit' : '');
			log = this.name + ' ' + status + ' ' + damage;
			// Utils.logln(log);
			ctrl.log(this.name, status, damage);
			return damage;
		}
	}]);

	return Skill;
}();

module.exports = Skill;

},{"clone":14}],6:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
	function Utils() {
		_classCallCheck(this, Utils);
	}

	_createClass(Utils, null, [{
		key: "logln",
		value: function logln(s) {
			// console.log(s);
		}
	}, {
		key: "hasteCalc",
		value: function hasteCalc(haste, extraHaste, frame) {
			var hasteCof = 47.17425;
			var baseHaste = haste / hasteCof * 10.24;
			var totalHaste = Math.floor(baseHaste) + Math.floor(extraHaste);
			var nowFrame = Math.floor(frame * 1024 / (totalHaste + 1024));
			return nowFrame;
		}
	}, {
		key: "roll",
		value: function roll() {
			return Math.random() * 100;
		}
	}]);

	return Utils;
}();

module.exports = Utils;

},{}],7:[function(require,module,exports){
'use strict';

var Utils = require('../../Utils');

var buffs = [{
	icon: 1514,
	name: '商阳指',
	desc: '商阳指',
	type: 'dot',
	conflict: 0,
	duration: 288,
	interval: 48,
	cof: 0.27,
	maxLevel: 1,
	canStack: false,
	min: 50,
	max: 50,
	data: {},
	recipeName: 'shangYang',
	onSkillHitEvent: function onSkillHitEvent(ctrl) {
		// 放歌奇穴：“商阳指”“钟林毓秀”“兰摧玉折”每跳有 25% 几率
		// 使下一个阳明指无需运功，持续 30 秒，可叠加 3 层。
		if (ctrl.isTalentActive('放歌')) {
			var roll = Utils.roll();
			if (roll < 25) {
				var buff = ctrl.getBuff('放歌');
				ctrl.addBuff(buff);
			}
		}
	},
	onSkillCritEvent: function onSkillCritEvent(ctrl) {
		this.onSkillHitEvent(ctrl);
	}
}, {
	icon: 404,
	name: '钟林毓秀',
	desc: '钟林毓秀',
	type: 'dot',
	conflict: 0,
	duration: 288,
	interval: 48,
	cof: 0.29,
	maxLevel: 1,
	canStack: false,
	min: 38,
	max: 38,
	data: {},
	recipeName: 'zhongLin',
	onSkillHitEvent: function onSkillHitEvent(ctrl) {
		// 放歌奇穴：“商阳指”“钟林毓秀”“兰摧玉折”每跳有 25% 几率
		// 使下一个阳明指无需运功，持续 30 秒，可叠加 3 层。
		if (ctrl.isTalentActive('放歌')) {
			var roll = Utils.roll();
			if (roll < 25) {
				var buff = ctrl.getBuff('放歌');
				ctrl.addBuff(buff);
			}
		}
	},
	onSkillCritEvent: function onSkillCritEvent(ctrl) {
		this.onSkillHitEvent(ctrl);
	}
}, {
	icon: 390,
	name: '兰摧玉折',
	desc: '兰摧玉折',
	type: 'dot',
	conflict: 0,
	duration: 288,
	interval: 48,
	cof: 0.26,
	maxLevel: 1,
	canStack: false,
	min: 30,
	max: 30,
	data: {},
	recipeName: 'lanCui',
	onSkillHitEvent: function onSkillHitEvent(ctrl) {
		// 放歌奇穴：“商阳指”“钟林毓秀”“兰摧玉折”每跳有 25% 几率
		// 使下一个阳明指无需运功，持续 30 秒，可叠加 3 层。
		if (ctrl.isTalentActive('放歌')) {
			var roll = Utils.roll();
			if (roll < 25) {
				var buff = ctrl.getBuff('放歌');
				ctrl.addBuff(buff);
			}
		}
	},
	onSkillCritEvent: function onSkillCritEvent(ctrl) {
		this.onSkillHitEvent(ctrl);
	}
}, {
	icon: 1527,
	name: '恣游',
	desc: '每层使混元内功基础攻击力提高2%',
	type: 'buff',
	conflict: 0,
	duration: 320,
	interval: 0,
	cof: 0,
	maxLevel: 5,
	canStack: true,
	min: 0,
	max: 0,
	data: {
		attackAddPercent: 2
	},
	recipeName: 'none',
	onSkillHitEvent: function onSkillHitEvent(ctrl) {},
	onSkillCritEvent: function onSkillCritEvent(ctrl) {}
}, {
	icon: 1672,
	name: '噬骨',
	desc: '每层受混元性内功伤害提高2%',
	type: 'buff',
	conflict: 0,
	duration: 240,
	interval: 0,
	cof: 0,
	maxLevel: 5,
	canStack: true,
	min: 0,
	max: 0,
	data: {
		damage: 2
	},
	recipeName: 'none',
	onSkillHitEvent: function onSkillHitEvent(ctrl) {},
	onSkillCritEvent: function onSkillCritEvent(ctrl) {}
}, {
	icon: 408,
	name: '寒碧',
	desc: '“寒碧”的效果不能触发',
	type: 'buff',
	conflict: 0,
	duration: 192,
	interval: 0,
	cof: 0,
	maxLevel: 1,
	canStack: false,
	min: 0,
	max: 0,
	data: {},
	recipeName: 'none',
	onSkillHitEvent: function onSkillHitEvent(ctrl) {},
	onSkillCritEvent: function onSkillCritEvent(ctrl) {}
}, {
	icon: 411,
	name: '焚玉',
	desc: '“阳明指”伤害提高20%',
	type: 'buff',
	conflict: 0,
	duration: 80,
	interval: 0,
	cof: 0,
	maxLevel: 1,
	canStack: false,
	min: 0,
	max: 0,
	data: {},
	recipeName: 'none',
	onSkillHitEvent: function onSkillHitEvent(ctrl) {},
	onSkillCritEvent: function onSkillCritEvent(ctrl) {}
}, {
	icon: 3015,
	name: '放歌',
	desc: '使下一个“阳明指”无须运功',
	type: 'buff',
	conflict: 0,
	duration: 480,
	interval: 0,
	cof: 0,
	maxLevel: 3,
	canStack: true,
	min: 0,
	max: 0,
	data: {},
	recipeName: 'none',
	onSkillHitEvent: function onSkillHitEvent(ctrl) {},
	onSkillCritEvent: function onSkillCritEvent(ctrl) {}
}, {
	icon: 1522,
	name: '水月无间',
	desc: '下一个伤害或疗伤运功招式无需运功，效果期间免疫控制和封内效果',
	type: 'buff',
	conflict: 0,
	duration: 96,
	interval: 0,
	cof: 0,
	maxLevel: 1,
	canStack: false,
	min: 0,
	max: 0,
	data: {},
	recipeName: 'none',
	onSkillHitEvent: function onSkillHitEvent(ctrl) {},
	onSkillCritEvent: function onSkillCritEvent(ctrl) {}
}, {
	icon: 327,
	name: '布散',
	desc: '招式造成的威胁降低60%，混元内功基础攻击力和基础疗伤成效提高30%',
	type: 'buff',
	conflict: 0,
	duration: 160,
	interval: 0,
	cof: 0,
	maxLevel: 1,
	canStack: false,
	min: 0,
	max: 0,
	data: {
		attackAddPercent: 30
	},
	recipeName: 'none',
	onSkillHitEvent: function onSkillHitEvent(ctrl) {},
	onSkillCritEvent: function onSkillCritEvent(ctrl) {}
}, {
	icon: 3001,
	name: '乱洒青荷',
	desc: '效果期间下一个阳明指同时附带“兰摧玉折”“钟林毓秀”效果',
	type: 'buff',
	conflict: 0,
	duration: 160,
	interval: 0,
	cof: 0,
	maxLevel: 1,
	canStack: false,
	min: 0,
	max: 0,
	data: {},
	extraSetting: {
		firstHit: true
	},
	recipeName: 'none',
	onSkillHitEvent: function onSkillHitEvent(ctrl) {},
	onSkillCritEvent: function onSkillCritEvent(ctrl) {}
}, {
	icon: 3002,
	name: '流离',
	desc: '施展“阳明指”无需运功',
	type: 'buff',
	conflict: 0,
	duration: 480,
	interval: 0,
	cof: 0,
	maxLevel: 1,
	canStack: false,
	min: 0,
	max: 0,
	data: {},
	recipeName: 'none',
	onSkillHitEvent: function onSkillHitEvent(ctrl) {},
	onSkillCritEvent: function onSkillCritEvent(ctrl) {}
}, {
	icon: 4528,
	name: '梦歌',
	desc: '每层提高加速率3%',
	type: 'buff',
	conflict: 0,
	duration: 480,
	interval: 0,
	cof: 0,
	maxLevel: 2,
	canStack: true,
	min: 0,
	max: 0,
	data: {
		haste: 30
	},
	recipeName: 'none',
	onSkillHitEvent: function onSkillHitEvent(ctrl) {},
	onSkillCritEvent: function onSkillCritEvent(ctrl) {}
}, {
	icon: 1522,
	name: '砚悬',
	desc: '下一伤害招式会心几率提高100%',
	type: 'buff',
	conflict: 0,
	duration: 96,
	interval: 0,
	cof: 0,
	maxLevel: 1,
	canStack: false,
	min: 0,
	max: 0,
	data: {
		critAddPercent: 100
	},
	recipeName: 'none',
	onSkillHitEvent: function onSkillHitEvent(ctrl) {},
	onSkillCritEvent: function onSkillCritEvent(ctrl) {}
}, {
	icon: 7468,
	name: '涓流',
	desc: '会心几率提高2%，会心效果提高2%',
	type: 'buff',
	conflict: 0,
	duration: 96,
	interval: 0,
	cof: 0,
	maxLevel: 10,
	canStack: true,
	min: 0,
	max: 0,
	data: {
		critAddPercent: 2,
		critEffAddPercent: 2
	},
	recipeName: 'none',
	onSkillHitEvent: function onSkillHitEvent(ctrl) {},
	onSkillCritEvent: function onSkillCritEvent(ctrl) {}
}, {
	icon: 15,
	name: '怒叱',
	desc: '混元内功基础攻击力提高10%',
	type: 'buff',
	conflict: 0,
	duration: 96,
	interval: 0,
	cof: 0,
	maxLevel: 1,
	canStack: false,
	min: 0,
	max: 0,
	data: {
		attackAddPercent: 10
	},
	recipeName: 'none',
	onSkillHitEvent: function onSkillHitEvent(ctrl) {},
	onSkillCritEvent: function onSkillCritEvent(ctrl) {}
}, {
	icon: 3017,
	name: '清流',
	desc: '内功破防等级提高15%',
	type: 'buff',
	conflict: 0,
	duration: 288,
	interval: 0,
	cof: 0,
	maxLevel: 1,
	canStack: false,
	min: 0,
	max: 0,
	data: {
		overcomeAddPercent: 15
	},
	recipeName: 'none',
	onSkillHitEvent: function onSkillHitEvent(ctrl) {},
	onSkillCritEvent: function onSkillCritEvent(ctrl) {}
}, {
	icon: 3412,
	name: '水·灭虚',
	desc: '命中则获得一层buff，每层提高内功基础攻击，最多可叠加10层',
	type: 'buff',
	conflict: 1,
	duration: 96,
	interval: 0,
	cof: 0,
	maxLevel: 10,
	canStack: true,
	min: 0,
	max: 0,
	data: {
		attackAddBase: 7
	},
	recipeName: 'none',
	onSkillHitEvent: function onSkillHitEvent(ctrl) {},
	onSkillCritEvent: function onSkillCritEvent(ctrl) {}
}, {
	icon: 3412,
	name: '水·无双',
	desc: '命中则获得一层buff，每层提高无双等级，最多可叠加10层',
	type: 'buff',
	conflict: 1,
	duration: 96,
	interval: 0,
	cof: 0,
	maxLevel: 10,
	canStack: true,
	min: 0,
	max: 0,
	data: {
		strainAddBase: 8
	},
	recipeName: 'none',
	onSkillHitEvent: function onSkillHitEvent(ctrl) {},
	onSkillCritEvent: function onSkillCritEvent(ctrl) {}
}, {
	icon: 3406,
	name: '雷·激流',
	desc: '提高自身内功基础攻击和全会心等级，持续15秒',
	type: 'buff',
	conflict: 1,
	duration: 240,
	interval: 0,
	cof: 0,
	maxLevel: 1,
	canStack: false,
	min: 0,
	max: 0,
	data: {
		attackAddBase: 94,
		critAddBase: 48
	},
	recipeName: 'none',
	onSkillHitEvent: function onSkillHitEvent(ctrl) {},
	onSkillCritEvent: function onSkillCritEvent(ctrl) {}
}, {
	icon: 3406,
	name: '雷·灭气',
	desc: '提高自身内功破防等级和全会心等级，持续15秒',
	type: 'buff',
	conflict: 1,
	duration: 240,
	interval: 0,
	cof: 0,
	maxLevel: 1,
	canStack: false,
	min: 0,
	max: 0,
	data: {
		overcomeAddBase: 112,
		critAddBase: 48
	},
	recipeName: 'none',
	onSkillHitEvent: function onSkillHitEvent(ctrl) {},
	onSkillCritEvent: function onSkillCritEvent(ctrl) {}
}, {
	icon: 3406,
	name: '雷·痛切',
	desc: '提高自身会心效果等级和全会心等级，持续15秒',
	type: 'buff',
	conflict: 1,
	duration: 240,
	interval: 0,
	cof: 0,
	maxLevel: 1,
	canStack: false,
	min: 0,
	max: 0,
	data: {
		critEffAddBase: 112,
		critAddBase: 48
	},
	recipeName: 'none',
	onSkillHitEvent: function onSkillHitEvent(ctrl) {},
	onSkillCritEvent: function onSkillCritEvent(ctrl) {}
}, {
	icon: 3406,
	name: '雷特效CD',
	desc: '雷特效CD',
	type: 'buff',
	conflict: 1,
	duration: 960,
	interval: 0,
	cof: 0,
	maxLevel: 1,
	canStack: false,
	min: 0,
	max: 0,
	data: {},
	recipeName: 'none',
	onSkillHitEvent: function onSkillHitEvent(ctrl) {},
	onSkillCritEvent: function onSkillCritEvent(ctrl) {}
}];

module.exports = buffs;

},{"../../Utils":6}],8:[function(require,module,exports){
'use strict';

var wanhuaRecipe = {
	yangMing: [{
		name: '《点穴截脉·阳明指》经脉图残页',
		id: '0',
		effect: 'frameMinus',
		value: 2,
		desc: '运功时间减少0.125秒',
		active: false
	}, {
		name: '《点穴截脉·阳明指》经脉图断篇',
		id: '1',
		effect: 'frameMinus',
		value: 2,
		desc: '运功时间减少0.125秒',
		active: false
	}, {
		name: '《点穴截脉·阳明指》注解残页',
		id: '2',
		effect: 'costMinusPercent',
		value: 5,
		desc: '施展招式的消耗降低5%',
		active: false
	}, {
		name: '《点穴截脉·阳明指》注解断篇',
		id: '3',
		effect: 'costMinusPercent',
		value: 10,
		desc: '施展招式的消耗降低10%',
		active: false
	}, {
		name: '《点穴截脉·阳明指》参悟残页',
		id: '4',
		effect: 'damageAddPercent',
		value: 3,
		desc: '招式的伤害提高3%',
		active: false
	}, {
		name: '《点穴截脉·阳明指》参悟断篇',
		id: '5',
		effect: 'damageAddPercent',
		value: 4,
		desc: '招式的伤害提高4%',
		active: false
	}, {
		name: '《点穴截脉·阳明指》秘诀残页',
		id: '6',
		effect: 'critAddPercent',
		value: 2,
		desc: '招式的会心提高2%',
		active: false
	}, {
		name: '《点穴截脉·阳明指》秘诀断篇',
		id: '7',
		effect: 'critAddPercent',
		value: 3,
		desc: '招式的会心提高3%',
		active: false
	}],
	shangYang: [{
		name: '《点穴截脉·商阳指》注解残页',
		id: '0',
		effect: 'costMinusPercent',
		value: 5,
		desc: '施展招式的消耗降低5%',
		active: false
	}, {
		name: '《点穴截脉·商阳指》注解断篇',
		id: '1',
		effect: 'costMinusPercent',
		value: 5,
		desc: '施展招式的消耗降低5%',
		active: false
	}, {
		name: '《点穴截脉·商阳指》注解绝章',
		id: '2',
		effect: 'costMinusPercent',
		value: 10,
		desc: '施展招式的消耗降低10%',
		active: false
	}, {
		name: '《点穴截脉·商阳指》手抄残页',
		id: '3',
		effect: 'durationAdd',
		value: 48,
		desc: '招式效果持续时间增加3秒',
		active: false
	}, {
		name: '《点穴截脉·商阳指》真传残页',
		id: '4',
		effect: 'distanceAdd',
		value: 4,
		desc: '招式的有效距离增加4尺',
		active: false
	}, {
		name: '《点穴截脉·商阳指》人偶图残页',
		id: '5',
		effect: 'debuffAdd',
		value: '噬骨',
		desc: '招式附加噬骨不利气劲，每层受混元性内功伤害提高2%，持续15秒，最多叠加5层',
		active: false
	}, {
		name: '《点穴截脉·商阳指》人偶图断篇',
		id: '6',
		effect: 'debuffAdd',
		value: '噬骨',
		desc: '招式附加噬骨不利气劲，每层受混元性内功伤害提高2%，持续15秒，最多叠加5层',
		active: false
	}],
	lanCui: [{
		name: '《百花拂穴手·兰摧玉折》穴位图残页',
		id: '0',
		effect: 'cdMinus',
		value: 8,
		desc: '调息时间减少0.5秒',
		active: false
	}, {
		name: '《百花拂穴手·兰摧玉折》穴位图断篇',
		id: '1',
		effect: 'cdMinus',
		value: 8,
		desc: '调息时间减少0.5秒',
		active: false
	}, {
		name: '《百花拂穴手·兰摧玉折》穴位图绝章',
		id: '2',
		effect: 'cdMinus',
		value: 8,
		desc: '调息时间减少0.5秒',
		active: false
	}, {
		name: '《百花拂穴手·兰摧玉折》经脉图残页',
		id: '3',
		effect: 'frameMinus',
		value: 4,
		desc: '运功时间减少0.25秒',
		active: false
	}, {
		name: '《百花拂穴手·兰摧玉折》注解残页',
		id: '4',
		effect: 'costMinusPercent',
		value: 5,
		desc: '施展招式的消耗降低5%',
		active: false
	}, {
		name: '《百花拂穴手·兰摧玉折》注解断篇',
		id: '5',
		effect: 'costMinusPercent',
		value: 10,
		desc: '施展招式的消耗降低10%',
		active: false
	}, {
		name: '《百花拂穴手·兰摧玉折》手抄残页',
		id: '6',
		effect: 'durationAdd',
		value: 48,
		desc: '招式效果持续时间增加3秒',
		active: false
	}],
	zhongLin: [{
		name: '《百花拂穴手·钟林毓秀》经脉图残页',
		id: '0',
		effect: 'frameMinus',
		value: 2,
		desc: '运功时间减少0.125秒',
		active: false
	}, {
		name: '《百花拂穴手·钟林毓秀》经脉图断篇',
		id: '1',
		effect: 'frameMinus',
		value: 2,
		desc: '运功时间减少0.125秒',
		active: false
	}, {
		name: '《百花拂穴手·钟林毓秀》经脉图绝章',
		id: '2',
		effect: 'frameMinus',
		value: 4,
		desc: '运功时间减少0.25秒',
		active: false
	}, {
		name: '《百花拂穴手·钟林毓秀》注解残页',
		id: '3',
		effect: 'costMinusPercent',
		value: 5,
		desc: '施展招式的消耗降低5%',
		active: false
	}, {
		name: '《百花拂穴手·钟林毓秀》注解断篇',
		id: '4',
		effect: 'costMinusPercent',
		value: 10,
		desc: '施展招式的消耗降低10%',
		active: false
	}, {
		name: '《百花拂穴手·钟林毓秀》手抄残页',
		id: '5',
		effect: 'durationAdd',
		value: 48,
		desc: '招式效果持续时间增加3秒',
		active: false
	}, {
		name: '《百花拂穴手·钟林毓秀》人偶图残页',
		id: '6',
		effect: 'debuffAdd',
		value: '噬骨',
		desc: '招式附加噬骨不利气劲，每层受混元性内功伤害提高2%，持续15秒，最多叠加5层',
		active: false
	}, {
		name: '《百花拂穴手·钟林毓秀》人偶图断篇',
		id: '7',
		effect: 'debuffAdd',
		value: '噬骨',
		desc: '招式附加噬骨不利气劲，每层受混元性内功伤害提高2%，持续15秒，最多叠加5层',
		active: false
	}],
	kuaiXue: [{
		name: '《百花拂穴手·快雪时晴》参悟残页',
		id: '0',
		effect: 'damageAddPercent',
		value: 3,
		desc: '伤害提高3%',
		active: false
	}, {
		name: '《百花拂穴手·快雪时晴》参悟断篇',
		id: '1',
		effect: 'damageAddPercent',
		value: 4,
		desc: '伤害提高4%',
		active: false
	}, {
		name: '《百花拂穴手·快雪时晴》参悟绝章',
		id: '2',
		effect: 'damageAddPercent',
		value: 5,
		desc: '伤害提高5%',
		active: false
	}, {
		name: '《百花拂穴手·快雪时晴》人偶图残页',
		id: '3',
		effect: 'debuffAdd',
		value: '噬骨',
		desc: '招式附加噬骨不利气劲，每层受混元性内功伤害提高2%，持续15秒，最多叠加5层',
		active: false
	}, {
		name: '《百花拂穴手·快雪时晴》详解残页',
		id: '4',
		effect: 'hitAddPercent',
		value: 1,
		desc: '命中提高1%',
		active: false
	}, {
		name: '《百花拂穴手·快雪时晴》详解断篇',
		id: '5',
		effect: 'hitAddPercent',
		value: 2,
		desc: '命中提高2%',
		active: false
	}, {
		name: '《百花拂穴手·快雪时晴》注解残页',
		id: '6',
		effect: 'costMinusPercent',
		value: 10,
		desc: '施展招式的消耗降低10%',
		active: false
	}, {
		name: '《百花拂穴手·快雪时晴》注解断篇',
		id: '7',
		effect: 'costMinusPercent',
		value: 15,
		desc: '施展招式的消耗降低15%',
		active: false
	}]
};

module.exports = wanhuaRecipe;

},{}],9:[function(require,module,exports){
'use strict';

var Utils = require('../../Utils');

var skills = [{
	icon: 1527,
	name: '阳明指',
	type: 'ota',
	cof: 1.11,
	min: 155,
	max: 183,
	ota: 28,
	canCastSkill: 0,
	canCast: false,
	damageInstant: true,
	cd: 0,
	interval: 24,
	target: true,
	hasRecipes: true,
	recipeName: 'yangMing',
	cdRemain: 0,
	gcdCast: false,
	onSkillHitEvent: function onSkillHitEvent(ctrl) {
		// 阳明指命中后添加一层恣游buff
		var ziyou = ctrl.getBuff('恣游');
		ctrl.addBuff(ziyou);
		// 乱洒添加DOT
		if (ctrl.hasBuff('乱洒青荷') && ctrl.getActiveBuff('乱洒青荷').extraSetting.firstHit) {
			// 添加钟林毓秀
			var zhonglin = ctrl.getBuff('钟林毓秀');
			zhonglin.applyRecipe(ctrl);
			ctrl.addDebuff(zhonglin);
			// 添加兰摧玉折
			var lancui = ctrl.getBuff('兰摧玉折');
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = ctrl.recipes.lanCui[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var recipe = _step.value;

					if (recipe.active && recipe.effect == 'durationAdd') {
						lancui.duration += recipe.value;
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}

			ctrl.addDebuff(lancui);
			ctrl.getActiveBuff('乱洒青荷').extraSetting.firstHit = false;
		}
		// 寒碧奇穴：若目标身上没有“钟林毓秀”效果，则阳明指附带“钟林毓秀”，该效果每12秒触发一次。
		if (ctrl.isTalentActive('寒碧')) {
			if (!ctrl.hasBuff('寒碧') && !ctrl.hasDebuff('钟林毓秀')) {
				var _zhonglin = ctrl.getBuff('钟林毓秀');
				_zhonglin.applyRecipe(ctrl);
				ctrl.addDebuff(_zhonglin);
				var hanBiCD = ctrl.getBuff('寒碧');
				ctrl.addBuff(hanBiCD);
			}
		}
	},
	onSkillCritEvent: function onSkillCritEvent(ctrl) {
		// 雪中行奇穴：“阳明指”会心后刷新目标身上所有混元持续伤害效果。
		if (ctrl.isTalentActive('雪中行')) {
			ctrl.dotRefresh('商阳指');
			ctrl.dotRefresh('兰摧玉折');
			ctrl.dotRefresh('钟林毓秀');
		}
		this.onSkillHitEvent(ctrl);
	},
	onSkillPrepare: function onSkillPrepare(ctrl) {
		// 烟霞奇穴：“阳明指”的会心几率提高10%，会心效果提高10%。
		if (ctrl.isTalentActive('烟霞')) {
			this.extraAttr.critAddPercent += 10;
			this.extraAttr.critEffAddPercent += 10;
		}
		// 放歌奇穴：“商阳指”“钟林毓秀”“兰摧玉折”每跳有25%几率使下一个阳明指无需运功，持续30秒，可叠加3层。
		if (ctrl.hasBuff('放歌')) {
			this.ota = 0;
			this.type = 'instant';
			var fangGe = ctrl.getActiveBuff('放歌');
			fangGe.level--;
			if (fangGe.level == 0) {
				ctrl.deleteBuff('放歌');
			}
		}
		// 焚玉buff使阳明指提高20%伤害
		if (ctrl.hasBuff('焚玉')) {
			var fenYu = ctrl.getActiveBuff('焚玉');
			if (fenYu.remain >= this.ota) {
				this.extraAttr.damage += 20;
			}
		}
		// 青冠奇穴：“阳明指”命中有自身混元持续伤害效果的目标，每个效果使“阳明指”会心几率提高5%，会心效果提高5%。
		if (ctrl.isTalentActive('青冠')) {
			var dotCount = 0;
			if (ctrl.hasDebuff('商阳指') && ctrl.getActiveDebuff('商阳指').remain >= this.ota) dotCount++;
			if (ctrl.hasDebuff('钟林毓秀') && ctrl.getActiveDebuff('钟林毓秀').remain >= this.ota) dotCount++;
			if (ctrl.hasDebuff('兰摧玉折') && ctrl.getActiveDebuff('兰摧玉折').remain >= this.ota) dotCount++;
			this.extraAttr.critAddPercent += parseInt(5 * dotCount, 10);
			this.extraAttr.critEffAddPercent += parseInt(5 * dotCount, 10);
		}
		// 落凤
		if (ctrl.setting.effects.cw == 2) {
			this.extraAttr.damage += 5;
		}
		// 小橙武
		if (ctrl.setting.effects.cw == 1) {
			this.extraAttr.critAddPercent += 5;
		}
		// 套装特效
		if (ctrl.setting.effects.setEffect == 2 || ctrl.setting.effects.setEffect == 3) {
			this.extraAttr.damage += 10;
		}
	},
	onSkillFinish: function onSkillFinish(ctrl) {
		// 梦歌奇穴：施展“阳明指”或“快雪时晴”运功结束时均获得“梦歌”气劲，每层使加速率提高3%，持续30秒，最多叠加2层。
		if (ctrl.isTalentActive('梦歌')) {
			var mengGe = ctrl.getBuff('梦歌');
			ctrl.addBuff(mengGe);
		}
	}
}, {
	icon: 1514,
	name: '商阳指',
	type: 'instant',
	cof: 0.27,
	min: 50,
	max: 50,
	ota: 0,
	canCastSkill: 0,
	canCast: false,
	damageInstant: false,
	cd: 0,
	interval: 0,
	target: true,
	hasRecipes: true,
	recipeName: 'shangYang',
	cdRemain: 0,
	gcdCast: false,
	onSkillHitEvent: function onSkillHitEvent(ctrl) {
		// 添加商阳指dot
		var shangYang = ctrl.getBuff('商阳指');
		shangYang.applyRecipe(ctrl);
		// 生息奇穴：混元性持续伤害提高10%，持续伤害效果被卸除后，每个持续伤害使目标1.5秒内无法受到治疗效果，最多叠加4.5秒。
		if (ctrl.isTalentActive('生息')) {
			shangYang.extraAttr.damage += 10;
		}
		ctrl.addDebuff(shangYang);
	},
	onSkillCritEvent: function onSkillCritEvent(ctrl) {
		this.onSkillHitEvent(ctrl);
	},
	onSkillPrepare: function onSkillPrepare(ctrl) {
		// 寒血奇穴：“施展“商阳指”立刻造成伤害
		if (ctrl.isTalentActive('寒血')) {
			this.damageInstant = true;
		}
	},
	onSkillFinish: function onSkillFinish(ctrl) {}
}, {
	icon: 411,
	name: '玉石俱焚',
	type: 'instant',
	cof: 0.33,
	min: 81,
	max: 91,
	ota: 0,
	canCastSkill: 0,
	canCast: false,
	damageInstant: true,
	cd: 272,
	interval: 0,
	target: true,
	hasRecipes: false,
	cdRemain: 0,
	gcdCast: false,
	onSkillHitEvent: function onSkillHitEvent(ctrl) {
		// 吞噬dot
		var dotCount = 0;
		if (ctrl.hasDebuff('商阳指')) {
			var dot = ctrl.getActiveDebuff('商阳指');
			var remainHit = Math.floor(dot.remain / dot.interval) + 1;
			dot.calc(ctrl, remainHit);
			ctrl.deleteDebuff('商阳指');
			dotCount++;
		}
		if (ctrl.hasDebuff('钟林毓秀')) {
			var _dot = ctrl.getActiveDebuff('钟林毓秀');
			var _remainHit = Math.floor(_dot.remain / _dot.interval) + 1;
			_dot.calc(ctrl, _remainHit);
			ctrl.deleteDebuff('钟林毓秀');
			dotCount++;
		}
		if (ctrl.hasDebuff('兰摧玉折')) {
			var _dot2 = ctrl.getActiveDebuff('兰摧玉折');
			var _remainHit2 = Math.floor(_dot2.remain / _dot2.interval) + 1;
			_dot2.calc(ctrl, _remainHit2);
			ctrl.deleteDebuff('兰摧玉折');
			dotCount++;
		}
		// 焚玉奇穴：“玉石俱焚”成功吞噬持续伤害效果，使阳明指伤害提高10%，每额外吞噬一个效果，持续时间增加5秒。
		if (ctrl.isTalentActive('焚玉') && dotCount > 0) {
			if (ctrl.hasBuff('焚玉')) {
				ctrl.getActiveBuff('焚玉').remain += dotCount * 80;
			} else {
				var fenYu = ctrl.getBuff('焚玉');
				fenYu.duration = dotCount * 80;
				ctrl.addBuff(fenYu);
			}
		}
		// 清流奇穴：玉石俱焚”施展后使自身内功破防等级提高15%，持续18秒。
		if (ctrl.isTalentActive('清流')) {
			var qingLiu = ctrl.getBuff('清流');
			ctrl.addBuff(qingLiu);
		}
		// 旋落奇穴：“玉石俱焚”每吞噬一个持续伤害效果，调息时间降低1.5秒。
		if (ctrl.isTalentActive('旋落') && dotCount > 0) {
			this.cd -= dotCount * 24;
		}
		// 流离奇穴：“玉石俱焚”命中目标后使自身下一个“兰摧玉折”无需运功。
		if (ctrl.isTalentActive('流离')) {
			var liuLi = ctrl.getBuff('流离');
			ctrl.addBuff(liuLi);
		}
	},
	onSkillCritEvent: function onSkillCritEvent(ctrl) {
		this.onSkillHitEvent(ctrl);
	},
	onSkillPrepare: function onSkillPrepare(ctrl) {},
	onSkillFinish: function onSkillFinish(ctrl) {}
}, {
	icon: 2999,
	name: '快雪时晴',
	type: 'channel',
	cof: 0.39,
	min: 65,
	max: 75,
	ota: 80,
	canCastSkill: 0,
	canCast: false,
	damageInstant: true,
	cd: 0,
	interval: 16,
	target: true,
	hasRecipes: true,
	recipeName: 'kuaiXue',
	cdRemain: 0,
	gcdCast: false,
	onSkillHitEvent: function onSkillHitEvent(ctrl) {
		var _iteratorNormalCompletion2 = true;
		var _didIteratorError2 = false;
		var _iteratorError2 = undefined;

		try {
			for (var _iterator2 = ctrl.recipes.kuaiXue[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
				var recipe = _step2.value;

				if (recipe.active && recipe.effect == 'debuffAdd') {
					ctrl.addDebuff(ctrl.getBuff(recipe.value));
				}
			}
			// 踏歌奇穴：“快雪时晴”命中有自身持续伤害效果的目标，每次伤害有15%几率使持续伤害效果增加2跳，每个持续效果最多作用一次
		} catch (err) {
			_didIteratorError2 = true;
			_iteratorError2 = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion2 && _iterator2.return) {
					_iterator2.return();
				}
			} finally {
				if (_didIteratorError2) {
					throw _iteratorError2;
				}
			}
		}

		if (ctrl.isTalentActive('踏歌')) {
			var roll = Utils.roll();
			if (ctrl.hasDebuff('商阳指') && roll < 15) {
				ctrl.dotAddInterval('商阳指', 2);
			}
			roll = Utils.roll();
			if (ctrl.hasDebuff('钟林毓秀') && roll < 15) {
				ctrl.dotAddInterval('钟林毓秀', 2);
			}
			roll = Utils.roll();
			if (ctrl.hasDebuff('兰摧玉折') && roll < 15) {
				ctrl.dotAddInterval('兰摧玉折', 2);
			}
		}
	},
	onSkillCritEvent: function onSkillCritEvent(ctrl) {
		this.onSkillHitEvent(ctrl);
	},
	onSkillPrepare: function onSkillPrepare(ctrl) {
		// 弹指奇穴：“快雪时晴”的会心几率提高10%，会心效果提高10%。
		if (ctrl.isTalentActive('弹指')) {
			this.extraAttr.critAddPercent += 10;
			this.extraAttr.critEffAddPercent += 10;
		}
		// 青歌奇穴：“快雪时晴”每0.6秒造成一次伤害，持续3秒。
		if (ctrl.isTalentActive('青歌')) {
			this.ota = 50;
			this.interval = 10;
		} else {
			this.ota = 80;
			this.interval = 16;
		}
		// 雪弃奇穴：“快雪时晴”若只命中一个目标，伤害提高20%。
		if (ctrl.isTalentActive('雪弃')) {
			this.extraAttr.damage += 20;
		}
		// 落凤
		if (ctrl.setting.effects.cw == 2) {
			this.extraAttr.damage += 5;
		}
		// 小橙武
		if (ctrl.setting.effects.cw == 1) {
			this.extraAttr.critAddPercent += 5;
		}
		// 套装特效
		if (ctrl.setting.effects.setEffect == 2 || ctrl.setting.effects.setEffect == 3) {
			this.extraAttr.damage += 10;
		}
	},
	onSkillFinish: function onSkillFinish(ctrl) {
		// 梦歌奇穴：施展“阳明指”或“快雪时晴”运功结束时均获得“梦歌”气劲，每层使加速率提高3%，持续30秒，最多叠加2层。
		if (ctrl.isTalentActive('梦歌')) {
			var mengGe = ctrl.getBuff('梦歌');
			ctrl.addBuff(mengGe);
		}
	}
}, {
	icon: 404,
	name: '钟林毓秀',
	type: 'ota',
	cof: 0.29,
	ota: 32,
	canCastSkill: 0,
	canCast: false,
	min: 38,
	max: 38,
	damageInstant: false,
	cd: 0,
	interval: 0,
	target: true,
	hasRecipes: true,
	recipeName: 'zhongLin',
	cdRemain: 0,
	gcdCast: false,
	onSkillHitEvent: function onSkillHitEvent(ctrl) {
		// 添加钟林毓琇dot
		var zhongLin = ctrl.getBuff('钟林毓秀');
		zhongLin.applyRecipe(ctrl);
		// 生息奇穴：混元性持续伤害提高10%，持续伤害效果被卸除后，每个持续伤害使目标1.5秒内无法受到治疗效果，最多叠加4.5秒。
		if (ctrl.isTalentActive('生息')) {
			zhongLin.extraAttr.damage += 10;
		}
		ctrl.addDebuff(zhongLin);
	},
	onSkillCritEvent: function onSkillCritEvent(ctrl) {
		this.onSkillHitEvent(ctrl);
	},
	onSkillPrepare: function onSkillPrepare(ctrl) {},
	onSkillFinish: function onSkillFinish(ctrl) {}
}, {
	icon: 390,
	name: '兰摧玉折',
	type: 'ota',
	cof: 0.26,
	min: 30,
	max: 30,
	ota: 28,
	canCastSkill: 0,
	canCast: false,
	damageInstant: false,
	cd: 96,
	interval: 0,
	target: true,
	hasRecipes: true,
	recipeName: 'lanCui',
	cdRemain: 0,
	gcdCast: false,
	onSkillHitEvent: function onSkillHitEvent(ctrl) {
		// 添加兰摧dot
		var lanCui = ctrl.getBuff('兰摧玉折');
		lanCui.applyRecipe(ctrl);
		// 生息奇穴：混元性持续伤害提高10%，持续伤害效果被卸除后，每个持续伤害使目标1.5秒内无法受到治疗效果，最多叠加4.5秒。
		if (ctrl.isTalentActive('生息')) {
			lanCui.extraAttr.damage += 10;
		}
		ctrl.addDebuff(lanCui);
	},
	onSkillCritEvent: function onSkillCritEvent(ctrl) {
		this.onSkillHitEvent(ctrl);
	},
	onSkillPrepare: function onSkillPrepare(ctrl) {
		// 流离奇穴使兰摧不需运功
		if (ctrl.hasBuff('流离')) {
			this.ota = 0;
			this.type = 'instant';
			ctrl.deleteBuff('流离');
		}
	},
	onSkillFinish: function onSkillFinish(ctrl) {}
}, {
	icon: 398,
	name: '芙蓉并蒂',
	type: 'instant',
	cof: 0.33,
	min: 76,
	max: 81,
	ota: 0,
	canCastSkill: 0,
	canCast: false,
	damageInstant: true,
	cd: 320,
	interval: 0,
	target: true,
	hasRecipes: false,
	recipeName: '',
	cdRemain: 0,
	gcdCast: false,
	onSkillHitEvent: function onSkillHitEvent(ctrl) {
		// 轻弃奇穴：“芙蓉并蒂”的伤害提高100%，命中目标后刷新目标身上的所有混元持续伤害效果。
		if (ctrl.isTalentActive('轻弃')) {
			ctrl.dotRefresh('商阳指');
			ctrl.dotRefresh('兰摧玉折');
			ctrl.dotRefresh('钟林毓秀');
		}
	},
	onSkillCritEvent: function onSkillCritEvent(ctrl) {
		this.onSkillHitEvent(ctrl);
	},
	onSkillPrepare: function onSkillPrepare(ctrl) {
		// 轻弃奇穴：“芙蓉并蒂”的伤害提高100%，命中目标后刷新目标身上的所有混元持续伤害效果。
		if (ctrl.isTalentActive('轻弃')) {
			this.extraAttr.damage += 100;
		}
		// 踏莲奇穴：“芙蓉并蒂”调息时间降低5秒，定身效果持续时间延迟1秒。
		if (ctrl.isTalentActive('踏莲')) {
			this.cd = 240;
		}
	},
	onSkillFinish: function onSkillFinish(ctrl) {}
}, {
	icon: 1522,
	name: '水月无间',
	type: 'instant',
	cof: 0,
	min: 0,
	max: 0,
	ota: 0,
	canCastSkill: 0,
	canCast: false,
	damageInstant: false,
	cd: 960,
	interval: 0,
	target: false,
	hasRecipes: false,
	recipeName: '',
	cdRemain: 0,
	gcdCast: false,
	onSkillHitEvent: function onSkillHitEvent(ctrl) {
		var shuiYue = ctrl.getBuff('水月无间');
		// 夜思奇穴：“水月无间”额外使1个招式无需运功，并立刻回复自身10%内力值。
		if (ctrl.isTalentActive('夜思')) {
			shuiYue.canStack = true;
			shuiYue.maxLevel = 2;
			shuiYue.level = 2;
		}
		ctrl.addBuff(shuiYue);
		var buSan = ctrl.getBuff('布散');
		ctrl.addBuff(buSan);
		// 砚悬奇穴：“水月无间”效果期间下一个伤害或治疗招式必定会心。
		if (ctrl.isTalentActive('砚悬')) {
			var yanXuan = ctrl.getBuff('砚悬');
			ctrl.addBuff(yanXuan);
		}
	},
	onSkillCritEvent: function onSkillCritEvent(ctrl) {
		this.onSkillHitEvent(ctrl);
	},
	onSkillPrepare: function onSkillPrepare(ctrl) {},
	onSkillFinish: function onSkillFinish(ctrl) {}
}, {
	icon: 3001,
	name: '乱洒青荷',
	type: 'instant',
	cof: 0,
	min: 0,
	max: 0,
	ota: 0,
	canCastSkill: 0,
	canCast: false,
	damageInstant: false,
	cd: 1440,
	interval: 0,
	target: false,
	hasRecipes: false,
	recipeName: '',
	cdRemain: 0,
	gcdCast: true,
	onSkillHitEvent: function onSkillHitEvent(ctrl) {
		// 重置玉石俱焚CD
		ctrl.getSkill('玉石俱焚').cdRemain = 0;
		// 添加乱洒buff
		var luanSa = ctrl.getBuff('乱洒青荷');
		ctrl.addBuff(luanSa);
		// 取消技能GCD
		ctrl.myself.status.gcd = 0;
	},
	onSkillCritEvent: function onSkillCritEvent(ctrl) {
		this.onSkillHitEvent(ctrl);
	},
	onSkillPrepare: function onSkillPrepare(ctrl) {
		// 奇穴技能检测
		if (!ctrl.isTalentActive('乱洒青荷')) {
			this.type = 'invalid';
		}
	},
	onSkillFinish: function onSkillFinish(ctrl) {}
}];

module.exports = skills;

},{"../../Utils":6}],10:[function(require,module,exports){
'use strict';

var wanhuaTalent = [[{
	name: '烟霞',
	desc: '“阳明指”的会心几率提高10%，会心效果提高10%。',
	skill: '阳明指',
	icon: 4219,
	active: false
}, {
	name: '弹指',
	desc: '“快雪时晴”的会心几率提高10%，会心效果提高10%。',
	skill: '快雪时晴',
	icon: 4564,
	active: false
}, {
	name: '少阳指',
	desc: '少阳指',
	skill: '少阳指',
	icon: 1517,
	active: false
}], [{
	name: '寒碧',
	desc: '若目标身上没有“钟林毓秀”效果，则阳明指附带“钟林毓秀”，该效果每12秒触发一次。',
	skill: '阳明指',
	icon: 408,
	active: false
}, {
	name: '寒血',
	desc: '“施展“商阳指”立刻造成伤害',
	skill: '商阳指',
	icon: 1514,
	active: false
}, {
	name: '花语酥心',
	desc: '花语酥心',
	skill: '花语酥心',
	icon: 407,
	active: false
}], [{
	name: '青歌',
	desc: '“快雪时晴”每0.6秒造成一次伤害，持续3秒。',
	skill: '快雪时晴',
	icon: 2999,
	active: false
}, {
	name: '风烟翠',
	desc: '“阳明指”命中附带自身持续伤害效果的目标，可将该效果添加给目标半径8尺内的最多5个目标',
	skill: '阳明指',
	icon: 3016,
	active: false
}, {
	name: '倚天',
	desc: '“钟林毓秀”每跳降低玩家目标1%内力，并回复自身1%内力。',
	skill: '钟林毓秀',
	icon: 404,
	active: false
}, {
	name: '清风垂露',
	desc: '清风垂露',
	skill: '清风垂露',
	icon: 1523,
	active: false
}], [{
	name: '束发',
	desc: '“快雪时晴”作用目标增加3个。',
	skill: '快雪时晴',
	icon: 4573,
	active: false
}, {
	name: '列宿',
	desc: '运功不会被打退。',
	skill: '',
	icon: 3015,
	active: false
}, {
	name: '潜催',
	desc: '“玉石俱焚”可以吞噬目标半径8尺内额外5个目标身上属于自身的持续伤害。',
	skill: '玉石俱焚',
	icon: 3012,
	active: false
}, {
	name: '厥阴指',
	desc: '厥阴指',
	skill: '厥阴指',
	icon: 1513,
	active: false
}], [{
	name: '焚玉',
	desc: '“玉石俱焚”成功吞噬持续伤害效果，使阳明指伤害提高20%，每额外吞噬一个效果，持续时间增加5秒。',
	skill: '玉石俱焚',
	icon: 411,
	active: false
}, {
	name: '弹梦',
	desc: '“春泥护花”不会被消耗，持续8秒',
	skill: '春泥护花',
	icon: 4501,
	active: false
}, {
	name: '轻弃',
	desc: '“芙蓉并蒂”的伤害提高100%，命中目标后刷新目标身上的所有混元持续伤害效果。',
	skill: '芙蓉并蒂',
	icon: 398,
	active: false
}, {
	name: '星影',
	desc: '“春泥护花”施展给队友，则下一次“春泥护花”调息时间降低6秒',
	skill: '春泥护花',
	icon: 413,
	active: false
}], [{
	name: '放歌',
	desc: '“商阳指”“钟林毓秀”“兰摧玉折”每跳有25%几率使下一个阳明指无需运功，持续30秒，可叠加3层。',
	skill: '',
	icon: 3015,
	active: false
}, {
	name: '踏歌',
	desc: '“快雪时晴”命中有自身持续伤害效果的目标，每次伤害有15%几率使持续伤害效果增加2跳，每个持续效果最多作用一次',
	skill: '快雪时晴',
	icon: 4510,
	active: false
}, {
	name: '青冠',
	desc: '“阳明指”命中有自身混元持续伤害效果的目标，每个效果使“阳明指”会心几率提高5%，会心效果提高5%。',
	skill: '阳明指',
	icon: 4492,
	active: false
}, {
	name: '闲垂影',
	desc: '“玉石俱焚”每吞噬一个持续伤害效果，有35%几率使目标定身，持续4秒',
	skill: '玉石俱焚',
	icon: 411,
	active: false
}], [{
	name: '夜思',
	desc: '“水月无间”额外使1个招式无需运功，并立刻回复自身10%内力值。',
	skill: '水月无间',
	icon: 1522,
	active: false
}, {
	name: '清流',
	desc: '“玉石俱焚”施展后使自身内功破防等级提高15%，持续18秒。',
	skill: '玉石俱焚',
	icon: 3017,
	active: false
}, {
	name: '雪月',
	desc: '“快雪时晴”对定身锁足目标造成的会心几率提高50%。',
	skill: '快雪时晴',
	icon: 3403,
	active: false
}, {
	name: '乱洒青荷',
	desc: '重置【玉石俱焚】调息时间，效果期间施展的下一个【阳明指】同时附带【钟林毓秀】【兰摧玉折】持续伤害效果。',
	skill: '乱洒青荷',
	icon: 3001,
	active: false
}], [{
	name: '旋落',
	desc: '“玉石俱焚”每吞噬一个持续伤害效果，调息时间降低1.5秒。',
	skill: '玉石俱焚',
	icon: 410,
	active: false
}, {
	name: '雪弃',
	desc: '“快雪时晴”若只命中一个目标，伤害提高20%。',
	skill: '快雪时晴',
	icon: 2999,
	active: false
}, {
	name: '金屋',
	desc: '施展“太阴指”后，受到的伤害降低30%，持续6秒。',
	skill: '太阴指',
	icon: 4546,
	active: false
}, {
	name: '少明指',
	desc: '少明指',
	skill: '少明指',
	icon: 1516,
	active: false
}], [{
	name: '生息',
	desc: '混元性持续伤害提高10%，持续伤害效果被卸除后，每个持续伤害使目标1.5秒内无法受到治疗效果，最多叠加4.5秒。',
	skill: '',
	icon: 3016,
	active: false
}, {
	name: '流离',
	desc: '“玉石俱焚”命中目标后使自身下一个“兰摧玉折”无需运功',
	skill: '玉石俱焚',
	icon: 3002,
	active: false
}, {
	name: '金针',
	desc: '“毫针”每层的回复效果提高到6%，受到攻击消耗掉所有层数后，定身周围6尺的5个目标。',
	skill: '毫针',
	icon: 1521,
	active: false
}, {
	name: '浮花浪蕊',
	desc: '浮花浪蕊',
	skill: '浮花浪蕊',
	icon: 400,
	active: false
}], [{
	name: '梦歌',
	desc: '施展“阳明指”或“快雪时晴”运功结束时均获得“梦歌”气劲，每层使加速率提高3%，持续30秒，最多叠加2层。',
	skill: '阳明指|快雪时晴',
	icon: 4528,
	active: false
}, {
	name: '生脉',
	desc: '“水月无间”效果期间使自身免疫控制和封内效果的影响，且运功不会被打断，持续6秒。',
	skill: '水月无间',
	icon: 399,
	active: false
}, {
	name: '砚悬',
	desc: '“水月无间”效果期间下一个伤害或治疗招式必定会心',
	skill: '水月无间',
	icon: 7242,
	active: false
}, {
	name: '傍花随柳',
	desc: '傍花随柳',
	skill: '傍花随柳',
	icon: 405,
	active: false
}], [{
	name: '雪中行',
	desc: '“阳明指”会心后刷新目标身上所有混元持续伤害效果。',
	skill: '阳明指',
	icon: 4519,
	active: false
}, {
	name: '踏莲',
	desc: '“芙蓉并蒂”调息时间降低5秒，定身效果持续时间延迟1秒。',
	skill: '芙蓉并蒂',
	icon: 7252,
	active: false
}, {
	name: '星移',
	desc: '“星楼月影”调息时间降低2秒，不受招式控制效果持续时间增加1秒。',
	skill: '星楼月影',
	icon: 1520,
	active: false
}, {
	name: '摇柳',
	desc: '听风吹雪”可在花间游心法下施展，但调息时间增加30秒。',
	skill: '听风吹雪',
	icon: 7226,
	active: false
}], [{
	name: '涓流',
	desc: '施展伤害招式命中气血值低于35%的目标，自身会心几率提高20%，会心效果提高20%，每次造成伤害，该效果降低2%。',
	skill: '',
	icon: 7468,
	active: false
}, {
	name: '同宿',
	desc: '对友方目标施展“毫针”，被攻击后消失的层数效果会再次作用到释放者本身。',
	skill: '毫针',
	icon: 7474,
	active: false
}, {
	name: '池月',
	desc: '“太阴指”调息时间降低5秒，解除自身受到的减速和锁足效果。',
	skill: '太阴指',
	icon: 7234,
	active: false
}, {
	name: '南风吐月',
	desc: '南风吐月',
	skill: '南风吐月',
	icon: 7510,
	active: false
}]];

module.exports = wanhuaTalent;

},{}],11:[function(require,module,exports){
'use strict';

var wanhuaUtils = {
	killLevel: 0.35, // 斩杀线
	kill: function kill(ctrl) {
		// 斩杀机制
		if (ctrl.hasBuff('涓流')) {
			var juanliu = ctrl.getActiveBuff('涓流');
			juanliu.level--;
			if (juanliu.level === 0) {
				ctrl.deleteSelfBuff('涓流');
			}
		} else {
			var _juanliu = ctrl.getBuff('涓流');
			_juanliu.level = 10;
			ctrl.addBuff(_juanliu);
		}
	},
	generalSkillPrepare: function generalSkillPrepare(ctrl, skill) {
		if (ctrl.hasBuff('水月无间') && skill.type == 'ota') {
			skill.type = 'instant';
			ctrl.getActiveBuff('水月无间').level--;
		}
	}
};

module.exports = wanhuaUtils;

},{}],12:[function(require,module,exports){
'use strict'

exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return b64.length * 3 / 4 - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, j, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr(len * 3 / 4 - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}

},{}],13:[function(require,module,exports){
(function (global){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */

'use strict'

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('isarray')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"base64-js":12,"ieee754":15,"isarray":16}],14:[function(require,module,exports){
(function (Buffer){
var clone = (function() {
'use strict';

var nativeMap;
try {
  nativeMap = Map;
} catch(_) {
  // maybe a reference error because no `Map`. Give it a dummy value that no
  // value will ever be an instanceof.
  nativeMap = function() {};
}

var nativeSet;
try {
  nativeSet = Set;
} catch(_) {
  nativeSet = function() {};
}

var nativePromise;
try {
  nativePromise = Promise;
} catch(_) {
  nativePromise = function() {};
}

/**
 * Clones (copies) an Object using deep copying.
 *
 * This function supports circular references by default, but if you are certain
 * there are no circular references in your object, you can save some CPU time
 * by calling clone(obj, false).
 *
 * Caution: if `circular` is false and `parent` contains circular references,
 * your program may enter an infinite loop and crash.
 *
 * @param `parent` - the object to be cloned
 * @param `circular` - set to true if the object to be cloned may contain
 *    circular references. (optional - true by default)
 * @param `depth` - set to a number if the object is only to be cloned to
 *    a particular depth. (optional - defaults to Infinity)
 * @param `prototype` - sets the prototype to be used when cloning an object.
 *    (optional - defaults to parent prototype).
*/
function clone(parent, circular, depth, prototype) {
  var filter;
  if (typeof circular === 'object') {
    depth = circular.depth;
    prototype = circular.prototype;
    filter = circular.filter;
    circular = circular.circular;
  }
  // maintain two arrays for circular references, where corresponding parents
  // and children have the same index
  var allParents = [];
  var allChildren = [];

  var useBuffer = typeof Buffer != 'undefined';

  if (typeof circular == 'undefined')
    circular = true;

  if (typeof depth == 'undefined')
    depth = Infinity;

  // recurse this function so we don't reset allParents and allChildren
  function _clone(parent, depth) {
    // cloning null always returns null
    if (parent === null)
      return null;

    if (depth === 0)
      return parent;

    var child;
    var proto;
    if (typeof parent != 'object') {
      return parent;
    }

    if (parent instanceof nativeMap) {
      child = new nativeMap();
    } else if (parent instanceof nativeSet) {
      child = new nativeSet();
    } else if (parent instanceof nativePromise) {
      child = new nativePromise(function (resolve, reject) {
        parent.then(function(value) {
          resolve(_clone(value, depth - 1));
        }, function(err) {
          reject(_clone(err, depth - 1));
        });
      });
    } else if (clone.__isArray(parent)) {
      child = [];
    } else if (clone.__isRegExp(parent)) {
      child = new RegExp(parent.source, __getRegExpFlags(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (clone.__isDate(parent)) {
      child = new Date(parent.getTime());
    } else if (useBuffer && Buffer.isBuffer(parent)) {
      child = new Buffer(parent.length);
      parent.copy(child);
      return child;
    } else {
      if (typeof prototype == 'undefined') {
        proto = Object.getPrototypeOf(parent);
        child = Object.create(proto);
      }
      else {
        child = Object.create(prototype);
        proto = prototype;
      }
    }

    if (circular) {
      var index = allParents.indexOf(parent);

      if (index != -1) {
        return allChildren[index];
      }
      allParents.push(parent);
      allChildren.push(child);
    }

    if (parent instanceof nativeMap) {
      var keyIterator = parent.keys();
      while(true) {
        var next = keyIterator.next();
        if (next.done) {
          break;
        }
        var keyChild = _clone(next.value, depth - 1);
        var valueChild = _clone(parent.get(next.value), depth - 1);
        child.set(keyChild, valueChild);
      }
    }
    if (parent instanceof nativeSet) {
      var iterator = parent.keys();
      while(true) {
        var next = iterator.next();
        if (next.done) {
          break;
        }
        var entryChild = _clone(next.value, depth - 1);
        child.add(entryChild);
      }
    }

    for (var i in parent) {
      var attrs;
      if (proto) {
        attrs = Object.getOwnPropertyDescriptor(proto, i);
      }

      if (attrs && attrs.set == null) {
        continue;
      }
      child[i] = _clone(parent[i], depth - 1);
    }

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(parent);
      for (var i = 0; i < symbols.length; i++) {
        // Don't need to worry about cloning a symbol because it is a primitive,
        // like a number or string.
        var symbol = symbols[i];
        child[symbol] = _clone(parent[symbol], depth - 1);
      }
    }

    return child;
  }

  return _clone(parent, depth);
}

/**
 * Simple flat clone using prototype, accepts only objects, usefull for property
 * override on FLAT configuration object (no nested props).
 *
 * USE WITH CAUTION! This may not behave as you wish if you do not know how this
 * works.
 */
clone.clonePrototype = function clonePrototype(parent) {
  if (parent === null)
    return null;

  var c = function () {};
  c.prototype = parent;
  return new c();
};

// private utility functions

function __objToStr(o) {
  return Object.prototype.toString.call(o);
}
clone.__objToStr = __objToStr;

function __isDate(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Date]';
}
clone.__isDate = __isDate;

function __isArray(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Array]';
}
clone.__isArray = __isArray;

function __isRegExp(o) {
  return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
}
clone.__isRegExp = __isRegExp;

function __getRegExpFlags(re) {
  var flags = '';
  if (re.global) flags += 'g';
  if (re.ignoreCase) flags += 'i';
  if (re.multiline) flags += 'm';
  return flags;
}
clone.__getRegExpFlags = __getRegExpFlags;

return clone;
})();

if (typeof module === 'object' && module.exports) {
  module.exports = clone;
}

}).call(this,require("buffer").Buffer)

},{"buffer":13}],15:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],16:[function(require,module,exports){
var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

},{}]},{},[1])(1)
});


//# sourceMappingURL=acacia.js.map
