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
编写中...

### 控制器 Controller
编写中...

## 贡献
欢迎 PR。
目前项目主要希望在性能优化上取得进展，以达到更快速的进行模拟的期望。
同时也欢迎扩展其支持其他门派。

## License
请查看 [LICENSE](https://github.com/j3pz/Acacia/blob/master/LICENSE) 文件。
