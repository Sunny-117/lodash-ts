# xor

## Description
创建一个给定数组唯一值的数组，使用 symmetric difference 做等值比较。返回值的顺序取决于他们数组的出现顺序。
## Params
`(...arrays)`
## Return
`Array`
## Depend
```js
import baseXor from './.internal/baseXor.js'
import isArrayLikeObject from './isArrayLikeObject.js'
```
> [baseXor 源码分析](../internal/baseXor.md)
> <br/>
> <br/>
> [isArrayLikeObject 源码分析](./isArrayLikeObject.md)
> 

## Code
```js
function xor(...arrays) {
  return baseXor(arrays.filter(isArrayLikeObject))
}
```
## Analyze
调用 filter 进行过滤，将不是数组的元素剔除，然后调用 baseXor 的到结果
## Remark
1. [Array.prototype.filter() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 方法创建一个新数组，其包含通过所提供函数实现的测试的所有元素。
## Example
```js
 xor([2, 1], [2, 3])
 // => [1, 3]
```
