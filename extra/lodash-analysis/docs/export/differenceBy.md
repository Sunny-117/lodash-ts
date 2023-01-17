# differenceBy

## Description
这个方法类似 [difference](./difference.md) ，除了它接受一个 iteratee （注：迭代器）， 调用 array 和 values 中的每个元素以产生比较的标准。 结果值是从第一数组中选择。iteratee 会调用一个参数：(value)。（注：首先使用迭代器分别迭代 array 和 values 中的每个元素，返回的值作为比较值）。
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
function differenceBy(array, ...values) {
  let iteratee = last(values)
  if (isArrayLikeObject(iteratee)) {
    iteratee = undefined
  }
  return isArrayLikeObject(array)
    ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), iteratee)
    : []
}
```
## Analyze
1. 首先通过 `last` 拿到 `values` 的最后一个元素，定义为 `iteratee`
2. 判断如果 `iteratee` 为数组或类数组，则将 `iteratee` 置为 `undefined`
3. 接着就和 [difference](./difference.md) 处理逻辑一致了，不同的是 `baseDifference` 传入了 第三个参数 `iteratee` 函数（每个元素调用的迭代器）
## Remark
一开始的判断这里，简单来说其实可以只判断 `typeof last(values)` 是否为 `function` 即可

也就是
```js
let iteratee = last(values)
iteratee = typeof iteratee === 'function' ? iteratee : undefined
```
## Example
```js
console.log(differenceBy([1,2,3,4], 1, [3], [4], 2, (v) => ++v)) // [ 1, 2 ]
```
