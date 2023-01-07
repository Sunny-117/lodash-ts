# dropWhile

## Description
创建一个切片数组，去除 array 中从起点开始到 predicate 返回假值结束部分。predicate 会传入 3 个参数： (value, index, array)。
## Params
`(array, predicate)`
## Return
`Array`
## Depend
```js
import baseWhile from './.internal/baseWhile.js'
```
> [baseWhile](../internal/baseWhile.md)
>

## Code
```js
function dropWhile(array, predicate) {
  return (array != null && array.length)
    ? baseWhile(array, predicate, true)
    : []
}
```
## Analyze
和 [dropRightWhile](./dropRightWhile.md) 逻辑基本一致，除了 `dropWhile` 是从左往右遍历之外

## Example
```js
console.log(dropWhile([1,2,3,4,5,6], (v) => v > 3)) // [ 1, 2, 3, 4, 5, 6 ]
console.log(dropWhile([1,2,3,4,5,6], (v) => v < 3)) // [ 3, 4, 5, 6 ]
```
