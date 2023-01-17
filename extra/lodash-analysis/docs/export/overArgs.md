# overArgs

## Description
创建一个函数，调用 func 时参数为相对应的 transforms 的返回值。

## Params
`(func, transforms)`

## Return
`Function`

## Code
```js
function overArgs(func, transforms) {
  const funcsLength = transforms.length
  return function(...args) {
    let index = -1
    const length = Math.min(args.length, funcsLength)
    while (++index < length) {
      args[index] = transforms[index].call(this, args[index])
    }
    return func.apply(this, args)
  }
}
```

## Analyze
拿到 `transforms` 的长度，最终会返回一个函数

在这个函数里，会做一些处理，首先对于 `length` 做了判断，取 `args` 和 `funcsLength` 中较小的值

然后 `while` 循环，`args` 的每一个参数 和 `transforms` 的每一个方法的索引是一一对应的

在 `args` 处理完成后，会返回 `func` 调用 新的 `args` 的结果， `this` 绑定的是创建函数时的 `this`

## Example
```js
const func = overArgs((...v) => {
  return v.reverse()
}, [
  (v)=>++v,
  (v)=>v**2,
  (v)=>--v,
])

console.log(func(1,2,3)) // [ 2, 4, 2 ]
```
