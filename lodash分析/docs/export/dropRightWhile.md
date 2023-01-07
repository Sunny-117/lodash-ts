# dropRightWhile

## Description
创建一个切片数组，去除 array 中从 predicate 返回假值开始到尾部的部分。predicate 会传入 3 个参数： (value, index, array)。
## Params
`(array, predicate)`
## Return
`Array`
## Depend
```js
import baseWhile from './.internal/baseWhile.js'
```
> [baseWhile 源码分析](../internal/baseWhile.md)
> 

## Code
```js
function dropRightWhile(array, predicate) {
  return (array != null && array.length)
    ? baseWhile(array, predicate, true, true)
    : []
}
```
## Analyze
如果 `array` 不是 `null` 或者 `undefined` ，并且具有 `length` 属性，那么会调用 `baseWhile` 方法，否则返回 空数组

`baseWhile` 方法这里，`isDrop` 和 `fromRight` 传入的是 `true`

也就是说，会从右往左遍历，并且会将遍历过的部分移除掉，返回剩余的值

## Example
```js
console.log(dropRightWhile([1,2,3,4,5,6], (v) => v > 3)) // [ 1, 2, 3 ]
console.log(dropRightWhile([1,2,3,4,5,6], (v) => v < 3)) // [ 1, 2, 3, 4, 5, 6 ]
```
