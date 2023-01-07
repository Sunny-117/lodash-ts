# flip

## Description
创建一个函数，调用 func 时候接收翻转的参数。
## Params
`func`
## Return
`Function`

## Code
```js
function flip(func) {
  if (typeof func !== 'function') {
    throw new TypeError('Expected a function')
  }
  return function(...args) {
    return func.apply(this, args.reverse())
  }
}
```
## Analyze
判断了 `func` 的合法性，如果不是 `function` 类型，则抛出类型错误

在调用时，使用 `reverse` 进行参数的翻转
## Remark
1. [Function.prototype.apply() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 方法调用一个具有给定 this 值的函数，以及以一个数组（或类数组对象）的形式提供的参数。
2. [Array.prototype.reverse() MDM](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)  方法将数组中元素的位置颠倒，并返回该数组。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。该方法会改变原数组。
## Example
```js
const func = (a,b,c,d) => a - b - c - d

const temp = flip(func)

console.log(func(20, 10, 5 ,0)) // 5
console.log(temp(20, 10, 5 ,0)) // -35
```
