# intersectionWith

## Description
这个方法类似 [intersection](./intersection.md)，区别是它接受一个 comparator 调用比较 arrays 中的元素。结果值是从第一数组中选择。comparator 会传入两个参数：(arrVal, othVal)。

## Params
`arrays`

最后一个参数作为 `comparator`

## Return
`Array`

## Depend
```js
import map from './map.js'
import baseIntersection from './.internal/baseIntersection.js'
import castArrayLikeObject from './.internal/castArrayLikeObject.js'
import last from './last.js'
```
> [map 源码分析](./map.md)
> <br/>
> <br/>
> [baseIntersection 源码分析](../internal/baseIntersection.md)
> <br/>
> <br/>
> [castArrayLikeObject 源码分析](../internal/castArrayLikeObject.md)
> <br/>
> <br/>
> [last 源码分析](./last.md)

## Code
```js
function intersectionWith(...arrays) {
  let comparator = last(arrays)
  const mapped = map(arrays, castArrayLikeObject)

  comparator = typeof comparator === 'function' ? comparator : undefined
  if (comparator) {
    mapped.pop()
  }
  return (mapped.length && mapped[0] === arrays[0])
    ? baseIntersection(mapped, undefined, comparator)
    : []
}
```

## Analyze
和 [intersectionBy](./intersectionBy.md) 基本一致，只不过这里对于 `comparator` 的合法性做了校验

## Example
```js
console.log(intersectionWith([1,2,3,4,5], [2,3,4,5,6], 5)) // []
```
