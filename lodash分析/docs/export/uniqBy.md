# uniqBy

## Description
这个方法类似 [uniq](./uniq.md) ，除了它接受一个 iteratee （迭代函数），调用每一个数组（array）的每个元素以产生唯一性计算的标准。iteratee 调用时会传入一个参数：(value)。

## Params
`(array, iteratee)`

## Return
`Array`

## Depend
```js
import baseUniq from './.internal/baseUniq.js'
```
> [baseUniq 源码分析](../internal/baseUniq.md)

## Code
```js
function uniqBy(array, iteratee) {
  return (array != null && array.length)
    ? baseUniq(array, iteratee)
    : []
}
```

## Analyze
本质也是调用了 `baseUniq` 来进行处理，只不过传入了 `iteratee` 函数

## Example
```js
console.log(uniqBy([1.32,2.321,323.2,2.3,43.1,43.4,2.56,323.32], (v) => v|0)) // [ 1.32, 2.321, 323.2, 43.1 ]
```
