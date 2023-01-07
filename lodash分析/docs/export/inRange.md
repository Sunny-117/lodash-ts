# inRange

## Description
检查 n 是否在 start 与 end 之间，但不包括 end。 如果 end 没有指定，那么 start 设置为 0。 如果 start 大于 end，那么参数会交换以便支持负范围。
## Params
`(number, start, end)`

## Return
`Boolean`

## Depend
```js
import baseInRange from './.internal/baseInRange.js'
```
> [baseInRange 源码分析](../internal/baseInRange.md)

## Code
```js
function inRange(number, start, end) {
  if (end === undefined) {
    end = start
    start = 0
  }
  return baseInRange(+number, +start, +end)
}
```

## Analyze
如果没有传入 `end` ，则将 `start` 的值赋值给 `end` ， 将 `start` 置为 0

调用 `baseInRange` 返回结果， 在调用时，会使用 一元正号转为数字

## Example
```js
console.log(inRange(3, 9)) // true
```
