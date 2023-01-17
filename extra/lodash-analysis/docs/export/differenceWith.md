# differenceWith

## Description
这个方法类似 [difference](./difference.md) ，除了它接受一个 comparator （注：比较器），它调用比较 array，values 中的元素。 结果值是从第一数组中选择。comparator 调用参数有两个：(arrVal, othVal)。
## Params
`(array, ...values)`
## Return
`Array`
## Depend
```js
import baseDifference from './.internal/baseDifference.js'
import baseFlatten from './.internal/baseFlatten.js'
import isArrayLikeObject from './isArrayLikeObject.js'
import last from './last.js'
```
> [baseDifference 源码分析](../internal/baseDifference.md)
> <br/>
> <br/>
> [baseFlatten 源码分析](../internal/baseFlatten.md)
> <br/>
> <br/>
> [isArrayLikeObject 源码分析](./isArrayLikeObject.md)
> <br/>
> <br/>
> [last 源码分析](./last.md)
>

## Code
```js
function differenceWith(array, ...values) {
  let comparator = last(values)
  if (isArrayLikeObject(comparator)) {
    comparator = undefined
  }
  return isArrayLikeObject(array)
    ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), undefined, comparator)
    : []
}
```
## Analyze
整体代码的逻辑和 [differenceBy](./differenceBy.md) 基本一致，除了最后传递给 `baseDifference` 的参数为最后一个，也就是比较函数，`iteratee` 函数这里传的是 `undefined`

## Example
```js
console.log(differenceWith([1,2,3,4,5], [1], 2, [3], 4, [5], (x,y) => ++x === y)) // [ 1, 3, 5 ]
```
