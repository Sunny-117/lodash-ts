# flatten

## Description
减少一级 array 嵌套深度。
## Params
`array`
## Return
`Array`
## Depend
```js
import baseFlatten from './.internal/baseFlatten.js'
```
> [baseFlatten 源码分析](../internal/baseFlatten.md)

## Code
```js
function flatten(array) {
  const length = array == null ? 0 : array.length
  return length ? baseFlatten(array, 1) : []
}
```
## Analyze
判断了参数的合法性，如果存在 `length`，则使用 `baseFlatten` 将数组展开，展开一层，否则返回空数组
## Remark
1. [Array.prototype.flat() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
## Example
```js
console.log(flatten([[1,2], [3], 4, 5])) // [ 1, 2, 3, 4, 5 ]
console.log([[1,2], [3], 4, 5].flat()) // [ 1, 2, 3, 4, 5 ]

```
