# baseSortedIndex

## Description
baseSortedIndex 的作用和 baseSortedIndexBy 的作用差不多， 缺少了 iteratee 函数
## Params
`(array, value, retHighest)`
## Return
`Number`
## Depend
```js
import baseSortedIndexBy from './baseSortedIndexBy.js'
import isSymbol from '../isSymbol.js'
```
> [baseSortedIndexBy 源码分析](./baseSortedIndexBy.md)
> <br/>
> <br/>
> [isSymbol 源码分析](../export/isSymbol.md)
> 

## Code
```js
/** Used as references for the maximum length and index of an array. */
const MAX_ARRAY_LENGTH = 4294967295
const HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1

function baseSortedIndex(array, value, retHighest) {
  let low = 0
  let high = array == null ? low : array.length

  if (typeof value === 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
    while (low < high) {
      const mid = (low + high) >>> 1
      const computed = array[mid]
      if (computed !== null && !isSymbol(computed) &&
        (retHighest ? (computed <= value) : (computed < value))) {
        low = mid + 1
      } else {
        high = mid
      }
    }
    return high
  }
  return baseSortedIndexBy(array, value, (value) => value, retHighest)
}
```
## Analyze
其实如果去掉中间的 `if` 判断，就和 `baseSortedIndexBy` 基本一致了，调用的也是 `baseSortedIndexBy` 方法，所以我们具体看看中间的 `if` 判断做了什么事情

中间的 `if` 判断也是使用二分法来确定元素的索引

```js
  if (typeof value === 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
    while (low < high) {
      const mid = (low + high) >>> 1
      const computed = array[mid]
      if (computed !== null && !isSymbol(computed) &&
        (retHighest ? (computed <= value) : (computed < value))) {
        low = mid + 1
      } else {
        high = mid
      }
    }
    return high
  }
```

可以看到条件是 `value` 为 `number` 类型，`value` 不是 `NaN` , 并且数组的长度小于等于 数组最大长度的一半

其中的 `while` 循环和 `baseSortedIndexBy` 也基本一致，是二分法的思想，只不过简化了很多

首先拿到中间位 `const mid = (low + high) >>> 1` 索引， 这里使用右移 1，达到的效果就是 `Math.floor((low + high) / 2)`,只不过相比起来，右移运算符会更快

然后通过 索引拿到中间位的值 `computed`

判断 如果 `computed` 不是 `null` 不是 `symbol` ，在 `retHighest` 为真值时 小于等于 `value` ，在 `retHighest` 假值时，小于 `value`。在满足这些条件时，取高位，否则的话 取低位，然后循环往复，使用二分法来确定最后的 索引

## Remark
1. [无符号右移 >>> MDN](https://developer.mozilla.org/zh-CN/docs/conflicting/Web/JavaScript/Reference/Operators_7c8eb9475d97a4a734c5991857698560#%3E%3E%3E_(%E6%97%A0%E7%AC%A6%E5%8F%B7%E5%8F%B3%E7%A7%BB)) 该操作符会将第一个操作数向右移动指定的位数。向右被移出的位被丢弃，左侧用 0 填充。因为符号位变成了 0，所以结果总是非负的。

2. [二分查找算法 Wikipedia](https://zh.wikipedia.org/wiki/%E4%BA%8C%E5%88%86%E6%90%9C%E5%B0%8B%E6%BC%94%E7%AE%97%E6%B3%95)

<img  :src="$withBase('/assets/binarySearchAlgorithm.png')" />

## Example
```js
console.log(baseSortedIndex([1,3,5,7,9,11], 4)) // 2
```
