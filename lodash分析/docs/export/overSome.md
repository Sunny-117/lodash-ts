# overSome

## Description
创建一个函数，传入提供的参数的函数并调用 predicates 判断是否 存在 有真值。

## Params
`iteratees`

## Return
`Function`

## Depend
```js
import some from './some.js'
```
> [some 源码分析](./some.md)

## Code
```js
function overSome(iteratees) {
  return function(...args) {
    return some(iteratees, (iteratee) => iteratee.apply(this, args))
  }
}
```

## Analyze
和 [overEvery](./overEvery.md) 类似，只不过 `some` 是在返回 真值时，结束遍历，返回 `true`， 否则在遍历完成后 返回 `false`

## Remark
1. [Array.prototype.some() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some) 方法测试数组中是不是至少有 1 个元素通过了被提供的函数测试。它返回的是一个 Boolean 类型的值。

## Example
```js
const func = overSome([
  (v) => v > 10,
  (v) => v < 100
])

console.log(func(12)) // true
console.log(func(40)) // true
console.log(func(1)) // true
console.log(func(199)) // true
```
