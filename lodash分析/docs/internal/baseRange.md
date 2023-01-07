# baseRange 

## Description 
`baseRange` 用来根据 `start` 、 `end` 和 `step` 来创建一个数组，这个数组的所有数字都在 `start` 和 `end` 之间，并且相邻两个之间的差值是 `step` 。 一般情况下，如果 `start` 比 `end` 小，则从小大到排序，否则从大到小排序，如果 `fromRight` 为 `true` ，则排序方式和前面相反。
## Params
`(start, end, step, fromRight)`
## Return
`Array`

## Code
```js
function baseRange(start, end, step, fromRight) {
  let index = -1
  let length = Math.max(Math.ceil((end - start) / (step || 1)), 0)
  const result = new Array(length)

  while (length--) {
    result[fromRight ? length : ++index] = start
    start += step
  }
  return result
}
```
## Analyze
1. 首先确定数组的长度
    - `(end - start) / (step || 1)` ， 使用 `end` 减去 `start` 然后除以 步进的值，得到数组的长度
    - 因为上述结果有可能为小数，所以通过 `Math.ceil` 进行取整
    - 即使取整之后，也有可能为负数，所以通过 `Math.max` 拿到 0 和上述结果的比较值，取其中较大的值作为 `length`
2. `new` 一个新数组，长度为 `length`
3. while 循环进行数组填值
    - 首先判断是否 `fromRight` ， 如果 `fromRight` 为 `true` ，则取 `length` 作为索引，也就实现了从右到左
    - 将 `start` 的值设置给对应的索引
    - `start` 加等于 `step` 的值，这里如果 `step` 为正数，则是递增，负数为递减
## Remark
1. [Math.ceil() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil) 函数返回大于或等于一个给定数字的最小整数。
2. [Math.max() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/max) 函数返回一组数中的最大值。
## Example
```js
console.log(baseRange(-1, -10, -1)) // [-1, -2, -3, -4, -5, -6, -7, -8, -9]
console.log(baseRange(-10, -1, 1)) // [-10, -9, -8, -7, -6, -5, -4, -3, -2]
console.log(baseRange(1, 10, 2)) // [ 1, 3, 5, 7, 9 ]
console.log(baseRange(1, 10, 0)) // [ 1, 1, 1, 1, 1,  1, 1, 1, 1]
```
