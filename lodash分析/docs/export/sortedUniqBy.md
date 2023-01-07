# sortedUniqBy

## Description
这个方法类似 [uniqBy](./uniqBy.md)，除了它会优化排序数组。

## Params
`(array, iteratee)`

## Return
`Array`

## Depend
```js
import baseSortedUniq from './.internal/baseSortedUniq.js'
```
> [baseSortedUniq 源码分析](../internal/baseSortedUniq.md)

## Code
```js
function sortedUniqBy(array, iteratee) {
  return (array != null && array.length)
    ? baseSortedUniq(array, iteratee)
    : []
}
```

## Analyze
本质是调用 `baseSortedUniq` ，传入了 `iteratee`

## Example
```js
console.log(sortedUniqBy([1.1,1.2,1.3,2.1,2.2,2.3,3.1,3.2,3.3], (v) => v|0)) // [ 1.1, 2.1, 3.1 ]
```
