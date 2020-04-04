# react-fullpage-hooks

使用`React Hooks`写的一个关于全屏轮播的小插件，适用作官网

## 依赖

- react
- react-scroll-wheel-handler

## 配置参数

| 参数      | 说明                         | 类型   | 可选值                   | 默认值   |
| --------- | ---------------------------- | ------ | ------------------------ | -------- |
| initPage  | 初始页码                     | number |                          | 0        |
| direction | 翻页模式                     | string | `vertical`, `horizontal` | vertical |
| duration  | 翻页动画持续时间（单位：秒） | number |                          | 0.3      |

## TODO

- [x] 基础功能（滚轮翻页、键盘翻页）
- [x] 支持水平/垂直模式（左右/上下翻页）
- [x] 支持自定义初始页码
- [x] 支持自定义翻页动画持续时间
- [x] 点击翻页
- [ ] 增加轮播点
- [ ] 支持自定义轮播点
- [ ] 支持设置普通网页浏览模式
- [ ] 支持设置高度阈值且当达到阈值时切换成普通网页浏览模式
- [ ] 删除`react-scroll-wheel-handler`依赖并实现相同的功能
- [ ] 将组件抽离成独立插件并发布 npm
