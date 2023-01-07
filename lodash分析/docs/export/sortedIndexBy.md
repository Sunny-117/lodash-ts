# sortedIndexBy

## Description
这个方法类似 [sortedIndex](./sortedIndex.md) ，除了它接受一个 iteratee （迭代函数），调用每一个数组（array）元素，返回结果和 value 值比较来计算排序。iteratee 会传入一个参数：(value)。

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
function sortedIndexBy(array, value, iteratee) {
  return baseSortedIndexBy(array, value, iteratee)
}
```

## Analyze
调用 `baseSortedIndexBy` 实现

## Example
```js
console.log(sortedIndexBy([{v:1},{v:2},{v:3}],{v:2}, ({v}) => v)) // 1
```
