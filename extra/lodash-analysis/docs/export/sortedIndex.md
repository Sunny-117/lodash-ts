# sortedIndex

## Description
使用二进制的方式检索来决定 value 值 应该插入到数组中 尽可能小的索引位置，以保证 array 的排序。

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
function sortedIndex(array, value) {
  return baseSortedIndex(array, value)
}
```

## Analyze
也是调用了 `baseSortedIndex` 来返回结果

## Example
```js
console.log(sortedIndex([1,2,3,4,5,6,7,8], 5)) // 4
```
