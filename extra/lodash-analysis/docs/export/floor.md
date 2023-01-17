# floor

## Description
根据 precision（精度） 向下舍入 number。（注： precision（精度）可以理解为保留几位小数。）
## Params
`(number, precision)`
## Return
`Number`
## Depend
```js
import createRound from './.internal/createRound.js'
```
> [createRound 源码分析](../internal/createRound.md)

## Code
```js
const floor = createRound('floor')
```
## Analyze
调用 `createRound` 方法，创建了 `Math.floor` 的方法，只不过对于 精度进行了处理
## Remark
1. [Math.floor() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)  返回小于或等于一个给定数字的最大整数。 也就是向下取整
## Example
```js
floor(4.006)
// => 4
floor(0.046, 2)
// => 0.04
floor(4060, -2)
// => 4000
```
