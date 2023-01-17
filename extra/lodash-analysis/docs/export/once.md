# once

## Description
创建一个只能调用 func 一次的函数。 重复调用返回第一次调用的结果。 func 调用时， this 绑定到创建的函数，并传入对应参数。

## Params
`func`

## Return
`Function`

## Depend
```js
import before from './before.js'
```
> [before 源码分析](./before.md)

## Code
```js
function once(func) {
  return before(2, func)
}
```
## Analyze
最终返回的是 `before` 的结果，这里传入的 `n` 是 2， 在 `before` 中 函数调用次数不能超过 `n` ，这里也就实现了 一次

## Example
```js
const func = (v, x) => v.push(x)

const one = once(func)

const arr = []

one(arr, 1)
one(arr, 2)
one(arr, 3)

console.log(arr) // [ 1 ]
```
