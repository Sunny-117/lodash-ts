# sum

## Description
计算 array 中值的总和
## Params
`(array)`
## Return
`number`
## Depend
```js
import baseSum from './.internal/baseSum.js'
```
> [baseSum 源码分析](../internal/baseSum.md)
> 

## Code
```js
function sum(array) {
  return (array != null && array.length)
    ? baseSum(array, (value) => value)
    : 0
}
```
## Analyze
1. 如果 `array` 为 `null` 或者 没有传入，或者其不存在 `length` 属性，则返回 0
2. 否则调用 `baseSum` 进行求和，这里的 `iteratee` 函数，就是取值本身，没有做其他处理
## Remark
数组求和这里也可以使用 reduce
```js
Array.reduce((result, val) => result+=val, 0)
```
## Example
```js
sum([4, 2, 8, 6]) // => 20
```
