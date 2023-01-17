# lastIndexOf

## Description
这个方法类似 [indexOf](./indexOf.md) ，区别是它是从右到左遍历 array 的元素。

## Params
`(array, value, fromIndex)`

## Return
`Number`

## Depend
```js
import baseFindIndex from './.internal/baseFindIndex.js'
import baseIsNaN from './.internal/baseIsNaN.js'
import strictLastIndexOf from './.internal/strictLastIndexOf.js'
import toInteger from './toInteger.js'
```
> [baseFindIndex 源码分析](../internal/baseFindIndex.md)
> <br/>
> <br/>
> [baseIsNaN 源码分析](../internal/baseIsNaN.md)
> <br/>
> <br/>
> [strictLastIndexOf 源码分析](../internal/strictLastIndexOf.md)
> <br/>
> <br/>
> [toInteger 源码分析](./toInteger.md)

## Code
```js
function lastIndexOf(array, value, fromIndex) {
  const length = array == null ? 0 : array.length
  if (!length) {
    return -1
  }
  let index = length
  if (fromIndex !== undefined) {
    index = toInteger(fromIndex)
    index = index < 0 ? Math.max(length + index, 0) : Math.min(index, length - 1)
  }
  return value === value
    ? strictLastIndexOf(array, value, index)
    : baseFindIndex(array, baseIsNaN, index, true)
}
```

## Analyze
1. 首先处理 数组为 null 或者 undefined 或者空数组，这个情况下 返回 -1
   
2. 处理 `fromIndex` ，如果 `fromIndex` 是 负数，则表示从右往左数几位，所以 `length + fromIndex` 如果小于 0，就超出数组边界了，所以需要在 `length + fromIndex` 和 `0` 中取最大值，同理 如果 `fromIndex` 是 0 或者 正数，则不能超过数组最后一个元素的索引，所以取 `fromIndex` 和 `length - 1` 中最小值

   对于 `fromIndex` 使用 `toInteger` 处理成了正数
3. 最后会进行判断，如果 value 不是 NaN 则使用 `strictLastIndexOf` 进行查找，否则使用 `baseFindIndex` ， 传递 `baseIsNaN` 作为了比较函数

## Example
```js
console.log(lastIndexOf([6,2,3,4,5,6], 6)) // 5
```
