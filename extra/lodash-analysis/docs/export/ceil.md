# ceil 

## Description 
根据 `precision`（精度） 向上舍入 `number`。（注： `precision`（精度）可以理解为保留几位小数。）
## Params
`{number} number`
## Return
`Number`
## Depend
```js
import createRound from './.internal/createRound.js'
```
> [createRound 源码分析](../internal/createRound.md)
>

## Code
```js
const ceil = createRound('ceil')
```
## Analyze
本质就是调用 `createRound` 创建了一个 `Math.ceil` 函数的调用，在返回结果时，对于传入的 `precision` 进行了数值的转换处理，保证了 `precision` 的准确性
## Remark
1. [ceil MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil)
## Example
```js
ceil(4.006) // => 5

ceil(6.004, 2) // => 6.01

ceil(6040, -2) // => 6100
```
