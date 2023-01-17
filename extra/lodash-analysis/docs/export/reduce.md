# reduce 

## Description 
压缩 `collection`（集合）为一个值，通过 `iteratee`（迭代函数）遍历 `collection`（集合）中的每个元素，每次返回的值会作为下一次迭代使用 (注：作为 `iteratee`（迭代函数）的第一个参数使用)。 如果没有提供 `accumulator`，则 `collection`（集合）中的第一个元素作为初始值。(注：`accumulator` 参数在第一次迭代的时候作为 `iteratee`（迭代函数）第一个参数使用。) `iteratee` 调用 4 个参数：
(accumulator, value, index|key, collection).

本质和 Array.prototype.reduce 差不多，不过 lodash.reduce 支持对象的迭代

## Params
`(collection, iteratee, accumulator)`
> collection - 要迭代的对象或数组
>
> iteratee - 每次迭代调用的函数
>
> accumulator - 默认值
>

## Return
`{*}` - 累加之后的结果
## Depend
```js
import arrayReduce from './.internal/arrayReduce.js'
import baseEach from './.internal/baseEach.js'
import baseReduce from './.internal/baseReduce.js'
```
> [arrayReduce 源码分析](../internal/arrayReduce.md)
> <br/>
> <br/>
> [baseEach 源码分析](../internal/baseEach.md)
> <br/>
> <br/>
> [baseReduce 源码分析](../internal/baseReduce.md)
>

## Code
```js
function reduce(collection, iteratee, accumulator) {
  const func = Array.isArray(collection) ? arrayReduce : baseReduce
  const initAccum = arguments.length < 3
  return func(collection, iteratee, accumulator, initAccum, baseEach)
}
```
## Analyze
1. 判断传入的 `collection` 是否为数组，如果为数组则将 `arrayReduce` 置为遍历方法，否则使用 `baseReduce`
2. 判断是否有传第四个参数，用作表示 是否将第一项作为默认值，这里是通过参数个数来判断的
3. 调用之前定义的方法来进行迭代，这里如果传入的是数组的情况下，最后一个参数 `baseEach` 是没有用到的，如果是对象 则使用 `baseEach` 来进行迭代对象操作
## Remark
1. [Array.prototype.reduce() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
2. [arguments.length MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments/length) 本次函数调用时传入函数的实参数量.
## Example
```js
reduce([1, 2], (sum, n) => sum + n, 0) // => 3

reduce({ 'a': 1, 'b': 2, 'c': 1 }, (result, value, key) => {
  (result[value] || (result[value] = [])).push(key)
  return result
}, {}) // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
```
