# uniq

## Description
创建一个去重后的 array 数组副本。使用了 SameValueZero 做等值比较。只有第一次出现的元素才会被保留。

## Params
`array`

## Return
`Array`

## Depend
```js
import baseUniq from './.internal/baseUniq.js'
```
> [baseUniq 源码分析](../internal/baseUniq.md)

## Code
```js
function uniq(array) {
  return (array != null && array.length)
    ? baseUniq(array)
    : []
}
```

## Analyze
如果 `array` 有值，则使用 `baseUniq` 进行处理，否则返回空数组

## Example
```js
console.log(uniq([1,2,3,3,3,4,5,6,5])) // [ 1, 2, 3, 4, 5, 6 ]
```
