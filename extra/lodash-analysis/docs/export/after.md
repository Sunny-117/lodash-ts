# after

## Description 
`after` 会返回一个函数，在调用这个函数 `n` 次后，会调用传入的 `func` 
## Params
`(n, func)`
> {Number} n: 次数
> 
> {Function} func: 回调的函数
> 

## Return
`Function`

## Code
```js
    function after(n, func) {
      if (typeof func !== 'function') {
        throw new TypeError('Expected a function')
      }
      n = n || 0
      return function(...args) {
        if (--n < 1) {
          return func.apply(this, args)
        }
      }
    }
```

## Analyze
1. `typeof func != 'function'`,如果传入的`func` 不是一个 `function`，则报错 `throw TypeError`
2. 返回一个函数，函数每次调用时都会进行 `--n` 的操作，并对`n`判断，`n < 1` 时，则调用 `func.apply(this, args)`，`func` 的 `this` 会绑定创建函数的 `this`

## Remark
1. 采用闭包的概念，抛出了 `n`,每次函数调用都会改变 `n` 的值
2. call、apply、bind 的区别，用一句话总结就是，它们都是用来改变相关函数 this 的指向，但是 call 和 apply 是直接进行相关函数调用的；bind 不会执行相关函数，而是返回一个新的函数，这个新的函数已经自动绑定了新的 this 指向，开发者可以手动调用它。
3. [闭包 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)
4. [apply MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
5. [call MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
6. [call、apply、bind 区别](https://juejin.cn/post/6844903567967387656#comment)
7. [剩余参数 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Rest_parameters)
## Example
```js
    const a = after(2,()=>{console.log(1)})
    
    a()
    a() // 1
```

## PS
[call、apply、bind 区别 PNG](/assets/call_apply_bind.png)
