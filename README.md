# Acacia 

![experimental](https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square)
![node](https://img.shields.io/badge/node-4.4.7-green.svg?style=flat-square)
![license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)

Acacia 是由[剑网3 配装器](https://www.j3pz.com)开发的一个 剑网3 输出循环模拟工具，旨在提供标准化的仿真平台，使得各个心法都能轻松的作为模块载入到模拟器中，而无需修改模拟器本身的代码。

同时，Acacia 的目标是能在短时间内完成大量的循环模拟，使 DPS 在大量模拟中收敛而不受随机值的影响。从而让 DPS 硬模拟的结果更具有参考性。

可用的网页版请移步：[Jx3DpsSimulator](https://www.j3pz.com/acacia/huajian/), 源码托管于 [repo](https://github.com/ziofat/Jx3DpsSimulator)，目前已经停止维护。

## 使用
首先，在程序中引入本项目：
```javascript
const Acacia = require('jx3-simulator');
```
定义一个 config 变量，用于规定所有的选项：

```javascript
const config = {
    school: 'huajian',      // 指定门派心法，目前仅支持花间
    duration: 86400,        // 指定单次模拟的时间，单位为秒
    iterator: 1,            // 指定循环次数
    target: 97,             // 指定目标等级
    self: {                 // 指定自身属性
        basicAttack: 2748,  // 基础攻击
        spunk: 706,         // 元气
        crit: 15.15,        // 会心率
        critEff: 211.77,    // 会心效果率
        hit: 106.76,        // 命中率
        haste: 321,         // 加速等级
        strain: 20.09,      // 无双率
        overcome: 900,      // 破防等级
        delay: 100,         // 延迟
    },
    effects: {              // 指定特效选项
        cw: 0,              // 橙武
        water: 0,           // 水特效
        thunder: 0,         // 雷特效
        setEffect: [],      // 套装特效
    },
    talent: [0, 0, 1, 2, 0, 2, 3, 0, 0, 0, 0, 0],  // 奇穴选项
    recipes: {              // 秘籍选项
        yangMing: [0, 1, 6, 7],
        shangYang: [3, 4, 5, 6],
        lanCui: [0, 1, 2, 6],
        zhongLin: [0, 1, 2, 5],
        kuaiXue: [0, 1, 2, 3],
    },
};
```

将选项传入构造函数中，并执行 run 方法开始模拟。
```javascript
const acacia = new Acacia(config);
acacia.run();
```

如果你进行的是单次长时间模拟，将会看到控制台如下输出：

![single](https://cloud.githubusercontent.com/assets/8521174/19627394/b20e270a-9991-11e6-9d31-3007c4fa50b6.gif)

如果是多次模拟，将会看到控制台如下输出：

<img src="https://cloud.githubusercontent.com/assets/8521174/19627396/bd448812-9991-11e6-9b2a-73a727411903.png" width="320"></img>

## 详细文档
### 设置 Config
 * **config** 定义了模拟所需要的参数
   * **config.school** `string` 表示模拟的心法名称，以心法的前两个字的全拼为名。目前 Acacia 仅支持 huajian (花间游)。
   * **config.duration** `number` 表示单次模拟的时常，单位为秒。默认 300 秒。
   * **config.iterator** `number` 表示模拟的次数，默认 5 次。
   * **config.target** `number` 表示模拟所针对的目标，目前的取值为木桩等级，默认 98 级木桩。
   * **config.self** `object` 表示模拟时角色自身的属性，该属性不应该包含任何可以由自身触发的战斗增益属性。例如花间不应该将梦歌或清流的属性加入，但可以加入破苍穹的属性。
     * **config.self.basicAttack** `number` 角色基础攻击。
     * **config.self.spunk** `number` 角色基础属性·元气 (四选一)。
     * **config.self.spirit** `number` 角色基础属性·根骨 (四选一)。
     * **config.self.strength** `number` 角色基础属性·力道 (四选一)。
     * **config.self.agility** `number` 角色基础属性·身法 (四选一)。
     * **config.self.crit** `number` 角色会心率。
     * **config.self.critEff** `number` 角色会心效果率。
     * **config.self.hit** `number` 角色命中率。
     * **config.self.haste** `number` 角色加速等级。
     * **config.self.strain** `number` 角色无双率。
     * **config.self.overcome** `number` 角色破防等级。
     * **config.self.delay** `number` 角色平均延迟水平。
   * **config.effects** `object` 表示角色身上装备所带有的特效
     * **config.effects.cw** `number` 0 表示没有橙武，1 表示小橙武，2 表示大橙武。
     * **config.effects.water** `string` 水系特效，取值为水系的特效名称，没有特效用 0 表示。
     * **config.effects.thunder** `string` 雷系特效，取值为雷系的特效名称，没有特效用 0 表示。
     * **config.effects.setEffect** `array` 套装特效，元素为套装特效名称，类型为 `string`。
   * **config.talent** `array` 表示角色所选取的奇穴，数组长度为 12，按顺序表明第几层奇穴的第几个奇穴被激活。例如，`[0, 0, 1, ...]` 表示第一、二层的第一个奇穴被激活，第三层的第二个奇穴被激活。
   * **config.recipes** 'object' 表示角色所选取的秘籍。该对象与各心法有关，详情查阅对应心法的文档。

### 控制器 API
以下示例代码中，`ctrl` 为一个控制器实例。
#### addBuff(buff: Buff)
向控制器自身 Buff 列表中添加一个 Buff，该 Buff 在游戏中应该出现在角色自己身上。该方法的参数为一个 Buff 对象。该方法可用于刷新一个自身 Buff，并增加层数（如果没有到达最大层数）。
```javascript
// 阳明指命中后添加一层恣游buff
const ziyou = ctrl.getBuff('恣游');
ctrl.addBuff(ziyou);
```

#### addDebuff(buff: Buff)
向控制器目标 Buff 列表中添加一个 Buff，该 Buff 在游戏中应该出现在目标身上。该方法的参数为一个 Buff 对象。该方法可用于刷新一个目标 Buff，并增加层数（如果没有到达最大层数）。dot 的刷新需要使用 `dotRefresh` 方法
```javascript
// 添加噬骨
const shigu = ctrl.getBuff('噬骨');
ctrl.addDebuff(shigu);
```

#### deleteBuff(buffName: string)
从控制器自身 Buff 列表中移除一个 Buff，参数为 Buff 的名称。
```javascript
// 流离奇穴使兰摧不需运功
ctrl.deleteBuff('流离');
```

#### deleteDebuff(buffName: string)
从控制器目标 Buff 列表中移除一个 Buff，参数为 Buff 的名称。如果该 Buff 为持续伤害技能，该方法目前不会自动计算其伤害。
```javascript
// 玉石俱焚吞噬 dot
ctrl.deleteDebuff('商阳指');
ctrl.deleteDebuff('钟林毓秀');
ctrl.deleteDebuff('兰摧玉折');
```

#### dotRefresh(buffName: string)
刷新一个 dot。
```javascript
if (ctrl.isTalentActive('轻弃')) {
    ctrl.dotRefresh('商阳指');
    ctrl.dotRefresh('兰摧玉折');
    ctrl.dotRefresh('钟林毓秀');
}
```

#### getActiveBuff(buffName: string)
获得一个正在角色自身身上生效的 Buff 的状态。如果该 Buff 存在，则返回这个 Buff 本身，反之则返回 false。
```javascript
const fenYu = ctrl.getActiveBuff('焚玉');
const remainTime = fenyu.remain; // 获取焚玉剩余时间
```

#### getActiveDebuff(buffName: string)
获得一个正在目标身上生效的 Buff 的状态。如果该 Buff 存在，则返回这个 Buff 本身，反之则返回 false。
```javascript
const shangYang = ctrl.getActiveDebuff('商阳指');
const remainTime  = shangYang.remain; // 获取商阳指剩余时间
```

#### getBuff(buffName: string)
从技能库中获取一个 Buff 对象。如果该 Buff 存在，则返回这个 Buff 本身，反之则返回 false。该方法会获得一个全新的 Buff，可用于前述的 `addBuff` 和 `addDebuff` 方法。如需要获取正在生效的 Buff 状态，需要使用 `getActiveBuff` 和 `getActiveDebuff` 方法。
```javascript
// 阳明指命中后添加一层恣游buff
const ziyou = ctrl.getBuff('恣游');
ctrl.addBuff(ziyou);
```

#### getSkill(skillName: string)
获取一个技能的状态。如果该技能存在，则返回这个技能本身，反之则返回 false。该方法可用于获取技能的 CD，状态，并对其进行修改以达到重置技能 CD，或改变其能力的功能。
```javascript
const yushi = ctrl.getSkill('玉石俱焚');
yushi.cdRemain = 0; // 重置玉石俱焚CD
```
#### hasBuff(buffName: string)
查看自身是否存在某个 Buff。
```javascript
// 乱洒添加DOT
if(ctrl.hasBuff('乱洒青荷')){
    const zhonglin = ctrl.getBuff('钟林毓秀');
    ctrl.addDebuff(zhonglin);
}
```

#### hasDebuff(buffName: string)
查看目标是否存在某个 Buff。
```javascript
// 青冠奇穴
if (ctrl.hasDebuff('商阳指')){
    // 提高阳明指伤害
};
```

#### isTalentActive(name: string)
查看某个奇穴是否被激活。激活则返回 true。
```javascript
// 梦歌奇穴
if (ctrl.isTalentActive('梦歌')) {
    const mengGe = ctrl.getBuff('梦歌');
    ctrl.addBuff(mengGe);
}
```


## 贡献
欢迎 PR。
目前项目主要希望在性能优化上取得进展，以达到更快速的进行模拟的期望。
同时也欢迎扩展其支持其他门派。

## License
请查看 [LICENSE](https://github.com/j3pz/Acacia/blob/master/LICENSE) 文件。
