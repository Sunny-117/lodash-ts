# takeRightWhile

## Description
从 array 数组的最后一个元素开始提取元素，直到 predicate 返回假值。predicate 会传入三个参数： (value, index, array)

## Params
`(array, predicate)`

## Return
`Array`

## Depend
```js
import baseWhile from './.internal/baseWhile.js'
```
> [baseWhile 源码分析](../internal/baseWhile.md)

## Code
```js
function takeRightWhile(array, predicate) {
  return (array != null && array.length)
    ? baseWhile(array, predicate, false, true)
    : []
}
```

## Analyze
本质是调用 `baseWhile` 进行处理，传入最后一个参数为 `true` ，表示从右到左，倒数第二个参数为 `false` ，表示取匹配到的值

## Example
```js
console.log(takeRightWhile([1,2,3,4,5,6], (v) => v>2)) // [ 3, 4, 5, 6 ]
```
