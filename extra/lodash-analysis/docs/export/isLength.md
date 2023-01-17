# isLength 

## Description 
检查 `value` 是否为有效的类数组长度。
## Params
`value`
## Return
`Boolean`

## Code
```js
const MAX_SAFE_INTEGER = 9007199254740991

function isLength(value) {
  return typeof value === 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER
}
```
## Analyze
整体判断逻辑比较清晰明了，number 类型、大于 -1 、为整数、小于等于最大安全整数，如果这些都满足，则判定为一个有效的 length ，判断频率高的条件在前面
## Remark
1. Array 的 length 属性的值是一个 0 到 2<sup>32</sup> -1 (4294967295) 的整数，如果超过了这个值，会报 RangeError: 无效数组长度 ---- [Array.length MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
## Example
```js
console.log(isLength(4294967296)) // true
console.log(isLength(-100)) // false
console.log(isLength('100')) // false
```
