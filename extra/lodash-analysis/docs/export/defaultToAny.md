# defaultToAny 

## Description 
此方法类似于defaultTo，不同的是它接受多个默认值并返回不是NaN，null或undefined的第一个默认值。
## Params
`(value, ...defaultValues)`
## Return
`{*}`
## Depend
```js
import arrayReduce from './.internal/arrayReduce.js'
import defaultTo from './defaultTo.js'
```
> [arrayReduce 源码分析](../internal/arrayReduce.md)
> <br/>
> <br/>
> [defaultTo 源码分析](./defaultTo.md)
>

## Code
```js
function defaultToAny(value, ...defaultValues) {
  return arrayReduce(defaultValues, defaultTo, value)
}
```
## Analyze
调用 `arrayReduce` 进行遍历，这里的迭代函数传入的是 `defaultTo` ， 参数第一个为 `arrayReduce` 累加的值，第二个参数为 当前迭代的值，对于 `defaultTo` 的判断如下
```js
function defaultTo(value, defaultValue) {
  return (value == null || value !== value) ? defaultValue : value
}
```
如果判断累加的值不为 `null` `undefined` `NaN` ,则直接返回 `value` ，否则才会返回 `defaultValue`

所以也就达到了 `defaultToAny` 的目的，拿到默认值中第一个 不是 `null` `undefined` `NaN` 的值
## Remark
1. [Array.prototype.reduce() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) 方法对数组中的每个元素执行一个由您提供的 reducer 函数 (升序执行)，将其结果汇总为单个返回值。
## Example
```js
defaultToAny(1, 10, 20)
// => 1

defaultToAny(undefined, 10, 20)
// => 10

defaultToAny(undefined, null, 20)
// => 20

defaultToAny(undefined, null, NaN)
// => NaN
```
