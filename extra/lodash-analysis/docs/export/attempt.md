# attempt

## Description 
调用传入的 `func` ， 返回结果或者返回捕获到的错误

## Params
`(func, ...args)`
> {Function} func: function
> 
> {...*} [args]: func 调用的参数

## Return
`func` 的执行结果或者 `Error`

## Depend
```js
    import isError from './isError.js'
```
> [isError 源码分析](./isError.md)

## Code
```js
    function attempt(func, ...args) {
      try {
        return func(...args)
      } catch (e) {
        return isError(e) ? e : new Error(e)
      }
    }
```

## Analyze

1. 使用 `try catch` 进行错误处理
2. 如果 `func` 执行正常，则返回结果，否则进入 `catch`
3. 如果 `catch` 为 `Error`，则返回 `error`， 否则返回 `new Error`

## Remark

使用 `try catch` 处理有可能的 `func` 的报错，并且使用 `...args` 处理了参数的传递

1. [try catch MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/try...catch)
2. [剩余参数 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Rest_parameters)


## Example

```js
    const a = attempt((x) => {JSON.parse(x)}, '33.')
    
    a // Error
    
    const b = attempt((x) => {JSON.parse(x)}, '{“a”: “1”}')
    
    b // {a: 1}
```
