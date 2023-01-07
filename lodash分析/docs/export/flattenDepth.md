# flattenDepth

## Description
根据 depth 递归减少 array 的嵌套层级
## Params
`(array, depth)`
## Return
`Array`
## Depend
```js
import baseFlatten from './.internal/baseFlatten.js'
```
> [baseFlatten 源码分析](../internal/baseFlatten.md)

## Code
```js
function flattenDepth(array, depth) {
  const length = array == null ? 0 : array.length
  if (!length) {
    return []
  }
  depth = depth === undefined ? 1 : +depth
  return baseFlatten(array, depth)
}
```
## Analyze
和 `flatten` 基本一致，这里就是处理了 `depth` 参数，传递给了 `baseFlatten` 作为展开深度
## Remark
1. [Array.prototype.flat() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

## Example
```js
console.log(flattenDepth([[1], [[2], 3], [4], 5], 2)) // [ 1, 2, 3, 4, 5 ]
console.log([[1], [[2], 3], [4], 5].flat(2)) // [ 1, 2, 3, 4, 5 ]
```
