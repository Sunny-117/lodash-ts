# flatMapDeep

## Description
这个方法类似 [flatMap](./flatMap.md) 不同之处在于，flatMapDeep 会继续扁平化递归映射的结果。
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
const INFINITY = 1 / 0

function flatMapDeep(collection, iteratee) {
  return baseFlatten(map(collection, iteratee), INFINITY)
}
```
## Analyze
和 `flatMap` 类似，只不过这里传给 `baseFlatten` 的深度为 `INFINITY` ，也就是说会一直递归处理，加上 `baseFlatten` 里面对于 `value` 的判断，就可以达到递归到只有一层
## Remark
1. [Array.prototype.flat() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flat) 方法会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回。
## Example
```js
console.log(flatMapDeep([[[[1], [2], [3]], [4]], [5], [6]], (v) => v)) // [ 1, 2, 3, 4, 5, 6 ]
console.log([[[[1], [2], [3]], [4]], [5], [6]].flat(1/0)) // [ 1, 2, 3, 4, 5, 6 ]
```
