# overEvery

## Description
建一个函数，传入提供的参数的函数并调用 predicates 判断是否 全部 都为真值

## Params
`iteratees`

## Return
`Function`

## Depend
```js
import every from './every.js'
```
> [every 源码分析](./every.md)

## Code
```js
function overEvery(iteratees) {
  return function(...args) {
    return every(iteratees, (iteratee) => iteratee.apply(this, args))
  }
}
```

## Analyze
最终会返回一个函数，绑定的 `this` 是 `overEvery` 创建时的 `this`

会使用 `every` 进行遍历， `every` 在有假值返回时，会结束迭代，并返回 `false` ，否则在遍历完成后会返回 `true`

## Remark
1. [Array.prototype.every() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every) 方法测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个布尔值。

## Example
```js
const func = overEvery([
  (v) => v<99,
  (v) => v>10
])

console.log(func(100)) // false
console.log(func(1)) // false
console.log(func(20)) // true
```
