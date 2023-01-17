# nth

## Description
获取 array 数组的第 n 个元素。如果 n 为负数，则返回从数组结尾开始的第 n 个元素。

## Params
`(array, n)`

## Return
`{*}`

## Depend
```js
import isIndex from './.internal/isIndex.js'
```
> [isIndex 源码分析](../internal/isIndex.md)

## Code
```js
function nth(array, n) {
  const length = array == null ? 0 : array.length
  if (!length) {
    return
  }
  n += n < 0 ? length : 0
  return isIndex(n, length) ? array[n] : undefined
}
```

## Analyze
1. 对于参数的合法性做了校验及处理，如果 `length` 为假值，则直接返回 `undefined`
   
2. 针对 `n` 为负数做了处理，如果 为负数，则 `n = n + length`，也就是从右向左
3. 最后判断了 `n` 是不是一个 合法的索引，如果是 则返回 `array[n]`，否则返回 `undefined`

## Example
```js
console.log(nth([], 4)) // undefined
console.log(nth([1,2,3,4,5], 4)) // 5
console.log(nth([1,2,3,4,5], -4)) // 2
```
