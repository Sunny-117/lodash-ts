# takeWhile

## Description
从 array 数组的起始元素开始提取元素，，直到 predicate 返回假值。predicate 会传入三个参数： (value, index, array)。

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
function takeWhile(array, predicate) {
  return (array != null && array.length)
    ? baseWhile(array, predicate)
    : []
}
```

## Analyze
`array` 合法且有值，则使用 `baseWhile` 进行处理，否则返回空数组

## Example
```js
console.log(takeWhile([1,2,3,4,5], (v) => v<4)) // [ 1, 2, 3 ]
```
