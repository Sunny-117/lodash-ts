# baseSortedIndexBy

## Description
baseSortedIndexBy 是实现 sortedIndexBy 和 sortedLastIndexBy 的基础方法。

其作用是找出，指定的 value 在一个已经排好序的数组 array 中，应该插入的位置，这样就算这个 value 插入到这个位置，原来的数组的排序不会打乱。

使用 retHighest 来区分 baseSortedIndexBy 和 sortedLastIndexBy
## Params
`(array, value, iteratee, retHighest)`
## Return
`Number`
## Depend
```js
import isSymbol from '../isSymbol.js'
```
> [isSymbol 源码分析](../export/isSymbol.md)
> 

## Code
```js
/** Used as references for the maximum length and index of an array. */
const MAX_ARRAY_LENGTH = 4294967295
const MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1

function baseSortedIndexBy(array, value, iteratee, retHighest) {
  let low = 0
  let high = array == null ? 0 : array.length
  if (high == 0) {
    return 0
  }

  value = iteratee(value)

  const valIsNaN = value !== value
  const valIsNull = value === null
  const valIsSymbol = isSymbol(value)
  const valIsUndefined = value === undefined

  while (low < high) {
    let setLow
    const mid = Math.floor((low + high) / 2)
    const computed = iteratee(array[mid])
    const othIsDefined = computed !== undefined
    const othIsNull = computed === null
    const othIsReflexive = computed === computed
    const othIsSymbol = isSymbol(computed)

    if (valIsNaN) {
      setLow = retHighest || othIsReflexive
    } else if (valIsUndefined) {
      setLow = othIsReflexive && (retHighest || othIsDefined)
    } else if (valIsNull) {
      setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull)
    } else if (valIsSymbol) {
      setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol)
    } else if (othIsNull || othIsSymbol) {
      setLow = false
    } else {
      setLow = retHighest ? (computed <= value) : (computed < value)
    }
    if (setLow) {
      low = mid + 1
    } else {
      high = mid
    }
  }
  return Math.min(high, MAX_ARRAY_INDEX)
}
```
## Analyze
1. 首先如果没有传入数组，或者传入的 array length 为假值，则返回 0
2. 调用传入的 iteratee 函数来处理 value 的值
3. 接着二分法，分别取低位和高位，每次拿到中间的值进行判断，setLow 表示排除低位
    ```js
        const mid = Math.floor((low + high) / 2)
        const computed = iteratee(array[mid])
    ```
   
    首先判断 value 是 NaN
    ```js
        if (valIsNaN) {
          setLow = retHighest || othIsReflexive
        }
    ```
    判断是否传入了 `retHighest` 或者 判断 `computed` 是否不是 `NaN`，在这种情况下，会往高位走，`setLow` 这时为 `true`

    value 是 undefined
    ```js
    if (valIsUndefined) {
      setLow = othIsReflexive && (retHighest || othIsDefined)
    }
    ```
    如果 `computed` 不是 `NaN`，然后判断  `retHighest` 或者当前 `computed` 不是 `undefined` ，则向高位查找，否则向低位查找

    value 是 Null
    ```js
    if (valIsNull) {
      setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull)
    }
    ```
    判断 `computed` 不是 `NaN` , `computed` 不是 `undefined` , 并且 判断了 `retHighest` 或者 `computed` 不是 `Null`，满足这些条件，则向高位，否则向低位查找

    value 是 symbol
    ```js
    if (valIsSymbol) {
      setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol)
    }
    ```
    前面的判断条件和 处理 `Null` 时基本一致，后面也就是判断了 `computed` 不是 `symbol` 或者 `retHighest` 为真

    处理 computed
    ```js
    if (othIsNull || othIsSymbol) {
      setLow = false
    }
    ```
    在 `value` 上述条件都不满足时，会判断 `computed` ，如果 `computed` 为 `null` 或者是 `symbol` 时， 会将 `setLow` 置为 `false`， 也就是向下查找

    最后，以上条件都不满足时
    ```js
      setLow = retHighest ? (computed <= value) : (computed < value)
    ```
    直接比较大小，如果 retHighest 为真值，则会判断 小于等于，也就是说等于时也会向高位查找，否则判断 `computed < value`

    也就是说如果 `[1,2,2,3]` ， value 为 2，`retHighest` 为真时， index 为 3，否则为 1

4. 最后会根据第三条判断出的 setLow 的值，对 low 和 high 重新进行赋值
```js
    if (setLow) {
      low = mid + 1
    } else {
      high = mid
    }
```
可以看到，如果 `setLow` 为 `true`，则会改变 `low` 的值，也就是会向高位查找，否则 会改变 `high` 的值，向低位查找

5. 最终返回 `high` 和 `MAX_ARRAY_INDEX` 中较小的值，数组最大长度为 `MAX_ARRAY_LENGTH` ，那么有效索引也就是 `MAX_ARRAY_LENGTH - 1 `
## Remark
1. [Array.length MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length) 属性的值是一个 0 到 232-1 的整数。

2. baseSortedIndexBy 对于排好序的数组还是有一定的要求的，基本就是 数字在前，`null`  `undefined` `symbol` 等值在后，按照这种形式排序，会得到正确的 `index`

3. 计算  `const mid = Math.floor((low + high) / 2)` 这里，可以改为 `const mid = (low + high) >>> 1`
## Example
```js
console.log(baseSortedIndexBy([1,2,3,4,5], null, v => v)) // 5
console.log(baseSortedIndexBy([1, 2, null, null], null, v => v)) // 2
console.log(baseSortedIndexBy([1, null, null], null, v => v)) // 1
console.log(baseSortedIndexBy([1, null, null], undefined, v => v)) // 3
console.log(baseSortedIndexBy([1, 2, 3], Symbol(1), v => v)) // 3
console.log(baseSortedIndexBy([1, Symbol(1), Symbol(2)], Symbol(1), v => v)) // 1
```
