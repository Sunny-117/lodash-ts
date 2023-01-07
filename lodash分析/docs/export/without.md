# without

## Description
创建一个剔除所有给定值的新数组，剔除值的时候，使用 SameValueZero做相等比较。
## Params
`(array, ...values)`
## Return
`Array`
## Depend
```js
import baseDifference from './.internal/baseDifference.js'
import isArrayLikeObject from './isArrayLikeObject.js'
```
> [baseDifference 源码分析](../internal/baseDifference.md)
> <br/>
> <br/>
> [isArrayLikeObject 源码分析](./isArrayLikeObject.md)

## Code
```js
function without(array, ...values) {
  return isArrayLikeObject(array) ? baseDifference(array, values) : []
}
```
## Analyze
其实本质比较简单，如果传入的 `array` 是一个数组，则调用 `baseDifference` 取到 `array` 相对于 `values` 的差集即可，否则返回 空数组

## Example
```js
console.log(without([1,2,3,4,5], 1,2,3)) // [ 4, 5 ]
```
