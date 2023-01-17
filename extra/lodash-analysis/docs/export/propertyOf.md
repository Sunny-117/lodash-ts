# propertyOf

## Description
[property](./property.md) 的反相版本。 这个方法创建的函数返回给定 path 在 object 上的值。

## Params
`object`

## Return
`Function`

## Depend
```js
import baseGet from './.internal/baseGet.js'
```
> [baseGet 源码分析](../internal/baseGet.md)

## Code
```js
function propertyOf(object) {
  return (path) => object == null ? undefined : baseGet(object, path)
}
```

## Analyze
本质也是通过 `baseGet` 来进行获取值，如果 `object` 没有传入 或者 为 `null` 则返回 `undefined`

## Example
```js
const func = propertyOf({
  a: {
    b: {
      c: {
        d: 1
      }
    }
  }
})

console.log(func('a')) // { b: { c: { d: 1 } } }
console.log(func('a.b')) // { c: { d: 1 } }
console.log(func('a.b.c')) // { c: { d: 1 } }
console.log(func('a.b.c.d')) // 1
```
