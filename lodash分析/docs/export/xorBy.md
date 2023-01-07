# xorBy

## Description
这个方法类似 [xor](./xor.md) ，除了它接受 iteratee（迭代器），这个迭代器 调用每一个 arrays（数组）的每一个值，以生成比较的新值。iteratee 调用一个参数：(value).
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
function xorBy(...arrays) {
  let iteratee = last(arrays)
  if (isArrayLikeObject(iteratee)) {
    iteratee = undefined
  }
  return baseXor(arrays.filter(isArrayLikeObject), iteratee)
}
```
## Analyze
和 `xor` 不同的是，这里取出了最后一个传入的参数做判断，如果 最后一个传入的参数是一个数组，则将其 置为 `undefined`，否则的话就当做迭代函数传递给 `baseXor` 使用
## Remark
1. [Array.prototype.filter() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 方法创建一个新数组，其包含通过所提供函数实现的测试的所有元素。

## Example
```js
console.log(xorBy([1,2], [2,3], (v) => ++v)) // [ 1, 3 ]
```
