# toLength

## Description
转换 value 为用作类数组对象的长度整数。
## Params
`value`
## Return
`Number`
## Depend
```js
import toInteger from './toInteger.js'
```
> [toInteger 源码分析](./toInteger.md)
> 

## Code
```js
/** Used as references for the maximum length and index of an array. */
const MAX_ARRAY_LENGTH = 4294967295
function toLength(value) {
  if (!value) {
    return 0
  }
  value = toInteger(value)
  if (value < 0) {
    return 0
  }
  if (value > MAX_ARRAY_LENGTH) {
    return MAX_ARRAY_LENGTH
  }
  return value
}
```
## Analyze
1. 如果没有传入 `value` 或者 `value` 为假值，则返回 0
2. 使用 `toInteger` 将 `value` 转为一个 整数
3. 如果 `value` 小于 0 ，返回 0
4. 如果 `value` 大于数组最大长度，返回数组最大长度
5. 最后返回 `value`
## Remark
1. [Array.length MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length)  属性的值是一个 0 到 232-1 的整数。
## Example
```js
console.log(toLength(3.666)) // 3
```
