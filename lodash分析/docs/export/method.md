# method

## Description
创建一个调用给定对象 path 上的函数。 任何附加的参数都会传入这个调用函数中。

## Params
`(path, args)`

## Return
`Function`

## Depend
```js
import invoke from './invoke.js'
```
> [invoke 源码分析](./invoke.md)

## Code
```js
function method(path, args) {
  return (object) => invoke(object, path, args)
}
```

## Analyze
最终返回了箭头函数，调用了 `invoke` 来进行处理

## Example
```js
const obj = {
  a: {
    b: {
      c: (v) => ++v
    }
  }
}

const func = method('a.b.c', [3])

console.log(func(obj)) // 4
```
