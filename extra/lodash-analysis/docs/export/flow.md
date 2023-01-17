# flow

## Description
创建一个函数。 返回的结果是调用提供函数的结果，this 会绑定到创建函数。 每一个连续调用，传入的参数都是前一个函数返回的结果。
## Params
`funcs`
## Return
`Function`

## Code
```js
function flow(...funcs) {
  const length = funcs.length
  let index = length
  while (index--) {
    if (typeof funcs[index] !== 'function') {
      throw new TypeError('Expected a function')
    }
  }
  return function(...args) {
    let index = 0
    let result = length ? funcs[index].apply(this, args) : args[0]
    while (++index < length) {
      result = funcs[index].call(this, result)
    }
    return result
  }
}
```
## Analyze
首先判断了传入参数的合法性，如果 `funcs` 中有不是 `function` 类型的，则抛出类型错误

紧接着会返回一个函数，这个函数的 `this` 是 `flow` 执行时的 `this`

在这个函数中进行了判断，如果 `length` 为 0，将传入的第一个参数作为 `result`，否则使用 `funcs` 中第一个函数，拿到执行结果 赋值给 `result`

接着 `while` 循环遍历，每次都更新 `result` 值，每次 `funcs` 对应索引的函数 执行时，`this` 都是 `flow` 调用时的 `this`，并且参数为上一次执行的结果 `result`

在 `while` 循环完成后，最终 返回 `result` 结果
## Remark
1. [Function.prototype.call() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call) 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。
2. [Function.prototype.apply() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply) 方法调用一个具有给定 this 值的函数，以及以一个数组（或类数组对象）的形式提供的参数。
## Example
```js
const add = (a, b) => a + b
const add1 = (v) => ++v

const temp = flow(add, add1, add1, add1, add1)

console.log(temp(1, 2)) // 7
```
