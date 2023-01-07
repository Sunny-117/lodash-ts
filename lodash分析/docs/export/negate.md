# negate

## Description
创建一个针对断言函数 func 结果取反的函数。 func 断言函数被调用的时候，this 绑定到创建的函数，并传入对应参数。

## Params
`predicate` - 断言函数

## Return
`Function`

## Code
```js
function negate(predicate) {
  if (typeof predicate !== 'function') {
    throw new TypeError('Expected a function')
  }
  return function(...args) {
    return !predicate.apply(this, args)
  }
}
```

## Analyze
判断了 `predicate` 的合法性，如果传入的 `predicate` 不是 `function` 类型，则抛出类型错误

最终返回一个方法，这个方法返回的是 `predicate` 函数的结果取反

## Remark
1. [Function.prototype.apply() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 方法调用一个具有给定 this 值的函数，以及以一个数组（或类数组对象）的形式提供的参数。

## Example
```js
const func = negate((v) => v< 4)

console.log([1,2,3,4,5,6].filter(func)) // [ 4, 5, 6 ]
```
