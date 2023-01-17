# toSafeInteger

## Description
转换 value 为安全整数。 安全整数可以用于比较和准确的表示。

## Params
`value`

## Return
`Number`

## Depend
```js
import toInteger from './toInteger.js'
```
> [toInteger 源码分析](./toInteger.md)

## Code
```js
const MAX_SAFE_INTEGER = 9007199254740991
function toSafeInteger(value) {
  if (!value) {
    return value === 0 ? value : 0
  }
  value = toInteger(value)
  if (value < -MAX_SAFE_INTEGER) {
    return -MAX_SAFE_INTEGER
  }
  if (value > MAX_SAFE_INTEGER) {
    return MAX_SAFE_INTEGER
  }
  return value
}
```

## Analyze
首先判断了 `value` 为假值的情况，这里 `value === 0 ? value : 0` ，是为了处理 `+0` 和 `-0` 的情况，在三等中 `+0` 和 `-0` 都等于 `0`，所以这里不改变符号，返回 `-0`

通过 `toInteger` 将 `value` 转为一个整数

如果 小于 `-9007199254740991` ，则返回 `-9007199254740991` ，大于 `9007199254740991` 则返回 `9007199254740991`

## Remark
1. [Number.MAX_SAFE_INTEGER MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER) 常量表示在 JavaScript 中最大的安全整数（maxinum safe integer)。

## Example
```js
console.log(toSafeInteger(1.333)) // 1
console.log(toSafeInteger(-234.33)) // -234
console.log(toSafeInteger(-2.43435e100)) // -9007199254740991
```
