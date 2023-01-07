# sortedUniq

## Description
这个方法类似 [uniq](./uniq.md)，除了它会优化排序数组。

## Params
`array`

## Return
`Array`

## Depend
```js
import baseSortedUniq from './.internal/baseSortedUniq.js'
```
> [baseSortedUniq 源码分析](../internal/baseSortedUniq.md)

## Code
```js
function sortedUniq(array) {
  return (array != null && array.length)
    ? baseSortedUniq(array)
    : []
}
```

## Analyze
如果 array 有值，则使用 baseSortedUniq 进行处理，否则返回空数组

## Example
```js
console.log(sortedUniq([1,2,2,3,3,4,5,6,6,7])) // [1,2,3,4,5,6,7]
```
