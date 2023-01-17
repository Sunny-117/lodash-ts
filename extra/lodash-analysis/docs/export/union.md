# union

## Description
创建一个按顺序排列的唯一值的数组。所有给定数组的元素值使用 SameValueZero做等值比较。（注： arrays（数组）的并集，按顺序返回，返回数组的元素是唯一的）

## Params
`...arrays`

## Return
`Array`

## Depend
```js
import baseFlatten from './.internal/baseFlatten.js'
import baseUniq from './.internal/baseUniq.js'
import isArrayLikeObject from './isArrayLikeObject.js'
```
> [baseFlatten 源码分析](../internal/baseFlatten.md)
> <br/>
> <br/>
> [baseUniq 源码分析](../internal/baseUniq.md)
> <br/>
> <br/>
> [isArrayLikeObject 源码分析](./isArrayLikeObject.md)

## Code
```js
function union(...arrays) {
  return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true))
}
```

## Analyze
使用 `baseFlatten` 展平数组 `arrays`， 在 展平过程中，只有通过 `isArrayLikeObject` 校验的值才回返回，展平后 通过 `baseUniq` 进行去重

## Example
```js
console.log(union([1,2,3], [2,3,4],[3,4,5])) // [ 1, 2, 3, 4, 5 ]
```
