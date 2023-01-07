# sortedLastIndexBy

## Description
这个方法类似 [sortedLastIndex](./sortedLastIndex.md) ，除了它接受一个 iteratee （迭代函数），调用每一个数组（array）元素，返回结果和 value 值比较来计算排序。iteratee 会传入一个参数：(value)。

## Params
`(array, value, iteratee)`

## Return
`Number`

## Depend
```js
import baseSortedIndexBy from './.internal/baseSortedIndexBy.js'
```
> [baseSortedIndexBy 源码分析](../internal/baseSortedIndexBy.md)

## Code
```js
function sortedLastIndexBy(array, value, iteratee) {
  return baseSortedIndexBy(array, value, iteratee, true)
}
```

## Analyze
调用 `baseSortedIndexBy` 实现，传入了 `iteratee` 函数，已经 从右到左为 `true`

## Example
```js
console.log(sortedLastIndexBy([1,2,2,3,4,5,5], 2, (v) => v)) // 3
```
