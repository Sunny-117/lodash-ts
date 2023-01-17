# flatMapDepth

## Description
该方法类似 [flatMap](./flatMap.md)，不同之处在于，flatMapDepth 会根据指定的 depth（递归深度）继续扁平化递归映射结果。
## Params
`(collection, iteratee, depth)`
## Return
`Array`
## Depend
```js
import baseFlatten from './.internal/baseFlatten.js'
import map from './map.js'
```
> [baseFlatten 源码分析](../internal/baseFlatten.md)
> <br/>
> <br/>
> [map 源码分析](./map.md)

## Code
```js
function flatMapDepth(collection, iteratee, depth) {
  depth = depth === undefined ? 1 : +depth
  return baseFlatten(map(collection, iteratee), depth)
}
```
## Analyze
和 `flatMap` 基本类似，除了 `flatMapDepth` 对于 `depth` 参数做了处理，如果没有传入 则取1，否则使用一元正号转为数字
## Remark
1. [Array.prototype.flat() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
## Example
```js
console.log(flatMapDepth([[[1], [2]], [3]], (v) => v, 2)) // [ 1, 2, 3 ]
console.log([[[1], [2]], [3]].flat(2)) // [ 1, 2, 3 ]
```
