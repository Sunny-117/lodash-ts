# methodOf

## Description
[method](./method.md) 的反向版。 这个创建一个函数调用给定 object 的 path 上的方法， 任何附加的参数都会传入这个调用函数中

## Params
`(object, args)`

## Return
`Function`

## Depend
```js
import invoke from './invoke.js'
```
> [invoke 源码分析](./invoke.md)

## Code
```js
function methodOf(object, args) {
  return (path) => invoke(object, path, args)
}
```

## Analyze
和 [method](./method.md) 不同的是，这是规定了 `object`，而 `path` 是传入的参数

## Example
```js
const obj = {
  a: {
    b:(v) => ++v,
    c:(v) => --v
  }
}

const func = methodOf(obj, [5])

console.log(func('a.b')) // 6
console.log(func('a.c')) // 4
```
