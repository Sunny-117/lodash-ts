# sortedIndexOf

## Description
这个方法类似 [indexOf](./indexOf.md)，除了它是在已经排序的数组 array 上执行二进制检索。

## Params
`(array, value)`

## Return
`Number`

## Depend
```js
import baseSortedIndex from './.internal/baseSortedIndex.js'
import eq from './eq.js'
```
> [baseSortedIndex 源码分析](../internal/baseSortedIndex.md)
> <br/>
> <br/>
> [eq 源码分析](./eq.md)

## Code
```js
function sortedIndexOf(array, value) {
  const length = array == null ? 0 : array.length
  if (length) {
    const index = baseSortedIndex(array, value)
    if (index < length && eq(array[index], value)) {
      return index
    }
  }
  return -1
}
```

## Analyze
通过 `baseSortedIndex` 来确定需要插入的元素的位置，拿到 `index`

在一个排好序的数组中进行检索，那就是说 得到的 `index` 只能小于数组的长度 `length` ，并且当前值和传入的值是相等的，都满足才说明传入的  `value` 是存在于 `array` 中的，那么此时 返回 `index` 即可，否则返回 `-1`

对于引用类型的对比，则不能返回正确的结果

## Example
```js
console.log(sortedIndexOf([1,2,3,4,5,6], 5)) // 4
console.log(sortedIndexOf([{v:1},{v:2},{v:3}], {v:2})) // -1
```
