# sortedLastIndex

## Description
此方法类似于 [sortedIndex](./sortedIndex.md)，除了 它返回 value 值 在 array 中尽可能大的索引位置（index）。

## Params
`(array, value)`

## Return
`Number`

## Depend
```js
import baseSortedIndex from './.internal/baseSortedIndex.js'
```
> [baseSortedIndex 源码分析](../internal/baseSortedIndex.md)

## Code
```js
function sortedLastIndex(array, value) {
  return baseSortedIndex(array, value, true)
}
```

## Analyze
是通过调用 `baseSortedIndex` 实现的，只不过从右到左的参数为 `true`

## Example
```js
console.log(sortedLastIndex([1,2,4,4,5], 4)) // 4
```
