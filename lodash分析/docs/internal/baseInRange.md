# baseInRange 

## Description 
inRange 的基本实现，检查 number 是否在 start 和 end 之间，但不包括 end。

## Params
`(number, start, end)`

## Return
`Boolean`

## Code
```js
function baseInRange(number, start, end) {
  return number >= Math.min(start, end) && number < Math.max(start, end)
}
```
## Analyze
判断 `number` **大于等于** start 和 end 之间的 **最小值** ， 小于 start 和 end 之间的 **最大值**

## Remark
1. [Math.min() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/min) 返回零个或更多个数值的最小值。
   
2. [Math.max() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/max) 函数返回一组数中的最大值。

## Example
```js
baseInRange(9, 18, 3) // true
```
