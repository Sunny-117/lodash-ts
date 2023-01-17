# meanBy

## Description
这个方法类似 [mean](./mean.md)， 除了它接受 iteratee 来调用 array 中的每一个元素，来生成其值排序的标准。 iteratee 会调用 1 个参数: (value) 。

## Params
`(array, iteratee)`

## Return
`Number`

## Depend
```js
import baseSum from './.internal/baseSum.js'
```
> [baseSum](../internal/baseSum.md)

## Code
```js
const NAN = 0 / 0
function meanBy(array, iteratee) {
  const length = array == null ? 0 : array.length
  return length ? (baseSum(array, iteratee) / length) : NAN
}
```

## Analyze
判断了 `length` 是否真值

如果是 则使用 `baseSum` 求和，然后除以 `length` 得到平均值，否则返回 `NaN`

## Example
```js
console.log(meanBy([1,2,3,4,5,6,7], (v) => v)) // 4
console.log(meanBy([{v: 1}, {v: 2}, {v: 3}], ({v}) => v)) // 2
```
