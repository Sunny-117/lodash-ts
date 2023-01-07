# flattenDeep

## Description
将 array 递归为一维数组。
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
const INFINITY = 1 / 0
function flattenDeep(array) {
  const length = array == null ? 0 : array.length
  return length ? baseFlatten(array, INFINITY) : []
}
```
## Analyze
和 [flatten](./flatten.md) 基本一致，只不过这里传入的展开层数，是 INF`INITY ， 也就是递归到只有一层为止
## Remark
1. [Array.prototype.flat() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。

## Example
```js
console.log(flattenDeep([[1], [[2], 3], [4], 5])) // [ 1, 2, 3, 4, 5 ]
console.log([[1], [[2], 3], [4], 5].flat(1/0)) // [ 1, 2, 3, 4, 5 ]
```
