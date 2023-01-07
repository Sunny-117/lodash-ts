# findLastIndex

## Description
和 [findIndex](./findLastIndex.md) 类似，只不过是从右往左
## Params
`(array, predicate, fromIndex)`
## Return
`Number`
## Depend
```js
import baseFindIndex from './.internal/baseFindIndex.js'
import toInteger from './toInteger.js'
```
> [baseFindIndex 源码分析](../internal/baseFindIndex.md)
> <br/>
> <br/>
> [toInteger 源码分析](./toInteger.md)

## Code
```js
function findLastIndex(array, predicate, fromIndex) {
  const length = array == null ? 0 : array.length
  if (!length) {
    return -1
  }
  let index = length - 1
  if (fromIndex !== undefined) {
    index = toInteger(fromIndex)
    index = fromIndex < 0
      ? Math.max(length + index, 0)
      : Math.min(index, length - 1)
  }
  return baseFindIndex(array, predicate, index, true)
}
```
## Analyze
1. 首先判断了array参数，然后拿到length，如果没有length，则返回 -1
2. 判断是否传入了 `fromIndex` ，传入的话，将其转为整数
3. 如果 `fromIndex` 小于 0，则取 `length` 加上转换之后的 `fromIndex`  和 0 中较大的值
4. 如果 `fromIndex` 大于等于 0，则取 转换之后的 `fromIndex` 和 `length - 1` 中较小的值
5. 最终调用 `baseFindIndex` 方法，最后一个参数传入 `true` ， 从右到左进行查询

## Example
```js
console.log(findLastIndex([1,2,3,4,5], (v) => v<5, 3)) // 3
```
