# toInteger 

## Description 
转换 `value` 为一个整数。
## Params
`Value`
## Return
`Number`
## Depend
```js
import toFinite from './toFinite.js'
```
> [toFinite 源码分析](./toFinite.md)
>

## Code
```js
function toInteger(value) {
  const result = toFinite(value)
  const remainder = result % 1

  return remainder ? result - remainder : result
}
```
## Analyze
1. 首先通过 `toFinite` 将 `value` 转换为一个 有限数字
2. 通过 `%` 运算拿到 小数点之后的部分
3. 判断如果存在小数部分，则返回 `result` 减去小数部分的结果，否则直接返回 `result`

## Remark
1. [求余(%) MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#%E6%B1%82%E4%BD%99)
2. 这里关于数字的计算会出现一些比较有意思的事情，可以查看 [0.1+0.2 != 0.3](../other/0.1+0.2.md)
```js
// 1. 如果我们传入的 value  为 3.33
const result = 3.33
// 2. 得到小数部分
const remainder = result % 1 // 0.33000000000000007
// 3. 最终返回的结果
return 3.33 - 0.33000000000000007 // 3

3.33 - 0.33000000000000007 === 3 // true
```

## Example
```js
toInteger(3.2) // => 3

toInteger(Number.MIN_VALUE) // => 0

toInteger(Infinity) // => 1.7976931348623157e+308

toInteger('3.2') // => 3
```
