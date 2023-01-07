# difference

## Description
创建一个具有唯一 array 值的数组，每个值不包含在其他给定的数组中。（注：即创建一个新数组，这个数组中的值，为第一个数组（array 参数）排除了给定数组（values）中的值。）该方法使用 SameValueZero做相等比较。结果值的顺序是由第一个数组中的顺序确定。
## Params
`(array, ...values)`
## Return
`Array`
## Depend
```js
import baseDifference from './.internal/baseDifference.js'
import baseFlatten from './.internal/baseFlatten.js'
import isArrayLikeObject from './isArrayLikeObject.js'
```
> [baseDifference 源码分析](../internal/baseDifference.md)
> <br/>
> <br/>
> [baseFlatten 源码分析](../internal/baseFlatten.md)
> <br/>
> <br/>
> [isArrayLikeObject 源码分析](./isArrayLikeObject.md)
> 

## Code
```js
function difference(array, ...values) {
  return isArrayLikeObject(array)
    ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
    : []
}
```
## Analyze
1. 如果 `array` 不是数组或者类数组，则会返回空数组
2. 否则，首先调用 `baseFlatten` 将 `values` 展开为 一维数组，在 `baseFlatten` 展开时，也会使用 `isArrayLikeObject` 来判断其是否为 数组或类数组，并且只有通过了 `isArrayLikeObject` 检验，才会返回，展开深度为 1
3. 调用 `baseDifference` 拿到 `array` 相对于 处理过之后的数组的差集
## Remark
1. [剩余参数 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Rest_parameters)
## Example
```js
console.log(difference([1,2,3], [2], 3, [4], 1)) // [ 1, 3 ]
```
