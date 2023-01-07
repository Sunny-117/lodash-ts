# keyBy

## Description
keyBy 会得到一个集合，会遍历 collection，在遍历的过程中，会调用 iteratee 得到 key ，对应的 value 为生成这个 key 的最后一个元素。

## Params
`(collection, iteratee)`

## Return
`Object`

## Depend
```js
import baseAssignValue from './.internal/baseAssignValue.js'
import reduce from './reduce.js'
```
> [baseAssignValue 源码分析](../internal/baseAssignValue.md)
> <br/>
> <br/>
> [reduce 源码分析](./reduce.md)

## Code
```js
function keyBy(collection, iteratee) {
  return reduce(collection, (result, value, key) => (
    baseAssignValue(result, iteratee(value), value), result
  ), {})
}
```

## Analyze
使用 `reduce` 遍历，调用 `baseAssignValue` 方法对 `result` 进行 `key` 和 值的设置， `key` 来自于 `iteratee(value)`， 值就是 `value` 本身，使用 逗号操作符，返回 `result`

在设置过程中，`key` 值重复，会覆盖之前的值

## Remark
1. [逗号操作符 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comma_Operator) 对它的每个操作数求值（从左到右），并返回最后一个操作数的值。

## Example
```js
console.log(keyBy([
  {a: '1', b: '2'},
  {c: 1, d: 2}
], (v) => Object.keys(v)[0])) // { a: { a: '1', b: '2' }, c: { c: 1, d: 2 } }
```
