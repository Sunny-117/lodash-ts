# baseIsNaN 

## Description 
isNaN的 基本实现不支持 对象类型的数字。
## Params
`value`
## Return
`Boolean`

## Code
```js
function baseIsNaN(value) {
  return value !== value
}
```
## Analyze
全等操作符认为 NaN 与其他任何值都不全等，包括它自己。等式 (x !== x) 成立的唯一情况是 x 的值为 NaN
## Remark
1. [JavaScript 中的相等性判断 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness)
2. [Number.isNaN() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN) 方法确定传递的值是否为 NaN，并且检查其类型是否为 Number。
## Example
```js
baseIsNaN(1) // false
baseIsNaN(NaN) // true
baseIsNaN(undefined) // false
```
