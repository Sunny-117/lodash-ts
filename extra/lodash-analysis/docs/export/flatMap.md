# flatMap

## Description
创建一个扁平化（注：同阶数组）的数组，这个数组的值来自 collection（集合）中的每一个值经过 iteratee（迭代函数） 处理后返回的结果，并且扁平化合并。 iteratee 调用三个参数： (value, index|key, collection)。
## Params
`(collection, iteratee)`
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
function flatMap(collection, iteratee) {
  return baseFlatten(map(collection, iteratee), 1)
}
```
## Analyze
首先通过 `map` 遍历数组，保证每一个元素都经过 `iteratee` 的处理

紧接着使用 `baseFlatten` 将处理过的数组进行扁平化，这里只扁平化 1 级
## Remark
1. [Array.prototype.flatMap() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap) 方法首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。它与 map 连着深度值为 1 的 flat 几乎相同，但 flatMap 通常在合并成一种方法的效率稍微高一些。
## Example
```js
console.log(flatMap([1,2,3,4,5], (x) => ++x)) // [ 2, 3, 4, 5, 6 ]
console.log([1,2,3,4,5].flatMap((x) => ++x)) // [ 2, 3, 4, 5, 6 ]
```
