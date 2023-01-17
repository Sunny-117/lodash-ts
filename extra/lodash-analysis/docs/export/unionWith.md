# unionWith

## Description
这个方法类似 [union](./union.md)， 除了它接受一个 comparator 调用比较 arrays 数组的每一个元素。 comparator 调用时会传入 2 个参数： (arrVal, othVal)。

## Params
`(...arrays)`

## Return
`Array`

## Depend
```js
import baseFlatten from './.internal/baseFlatten.js'
import baseUniq from './.internal/baseUniq.js'
import isArrayLikeObject from './isArrayLikeObject.js'
import last from './last.js'
```
> [baseFlatten 源码分析](../internal/baseFlatten.md)
> <br/>
> <br/>
> [baseUniq 源码分析](../internal/baseUniq.md)
> <br/>
> <br/>
> [isArrayLikeObject 源码分析](./isArrayLikeObject.md)
> <br/>
> <br/>
> [last 源码分析](./last.md)

## Code
```js
function unionWith(...arrays) {
  let comparator = last(arrays)
  comparator = typeof comparator === 'function' ? comparator : undefined
  return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined, comparator)
}
```

## Analyze
整体逻辑和 [unionBy](./unionBy.md) 类似，只不过这里的判断比 `unionBy` 严谨，到最后也是传递 `comparator` 给 `baseUniq` 使用

## Example
```js
console.log(unionWith([1,2,3],['2',3,4],['3','4',5], (x,y) => x==y)) // [ 1, 2, 3, 4, 5 ]
```
