# nthArg

## Description
创建一个函数，这个函数返回第 n 个参数。如果 n 为负数，则返回从结尾开始的第 n 个参数。

## Params
`n`

## Return
`Function`

## Depend
```js
import nth from './nth.js'
```
> [nth 源码分析](./nth.md)

## Code
```js
function nthArg(n) {
  return (...args) => nth(args, n)
}
```

## Analyze
源码相对比较简单，也就是返回了一个箭头函数，拿到 剩余参数数组，传递给 `nth` 拿到最终的结果

## Remark
1. [剩余参数 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Rest_parameters)

## Example
```js
console.log(func(11,22,33,44)) // 33
console.log(func('a', 'b', 'c', 'd')) // c
```
