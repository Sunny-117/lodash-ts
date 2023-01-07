# xorWith

## Description
该方法是像 [xor](./xor.md)，除了它接受一个 comparator ，以调用比较数组的元素。 comparator 调用 2 个参数：(arrVal, othVal).
## Params
`(...arrays)`
## Return
`Array`
## Depend
```js
import baseXor from './.internal/baseXor.js'
import isArrayLikeObject from './isArrayLikeObject.js'
import last from './last.js'
```
> [baseXor 源码分析](../internal/baseXor.md)
> <br/>
> <br/>
> [isArrayLikeObject 源码分析](./isArrayLikeObject.md)
> <br/>
> <br/>
> [last 源码分析](./last.md)


## Code
```js
function xorWith(...arrays) {
  let comparator = last(arrays)
  comparator = typeof comparator === 'function' ? comparator : undefined
  return baseXor(arrays.filter(isArrayLikeObject), undefined, comparator)
}
```
## Analyze
和 [xorBy](./xorBy.md) 基本一致，除了传递给 `baseXor` 的参数是 `comparator`， 也就是比较函数

## Example
```js
console.log(xorWith([1,3],[2,4],[5,6], (x,y) => x > ++y)) // [ 1, 2 ]
```
