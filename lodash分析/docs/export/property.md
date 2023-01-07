# property

## Description
创建一个返回给定对象的 path 的值的函数。

## Params
`path`

## Return
`Function`

## Depend
```js
import baseProperty from './.internal/baseProperty.js'
import basePropertyDeep from './.internal/basePropertyDeep.js'
import isKey from './.internal/isKey.js'
import toKey from './.internal/toKey.js'
```
> [baseProperty 源码分析](../internal/baseProperty.md)
> <br/>
> <br/>
> [basePropertyDeep 源码分析](../internal/basePropertyDeep.md)
> <br/>
> <br/>
> [isKey 源码分析](../internal/isKey.md)
> <br/>
> <br/>
> [toKey 源码分析](../internal/toKey.md)

## Code
```js
function property(path) {
  return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path)
}
```

## Analyze
判断 如果 `path` 是一个合法的 `key`， 如果是则使用 `baseProperty` 获取到值

否则有可能 `path` 是 一个路径，那就使用 `basePropertyDeep` 进行深层的获取

## Example
```js
const func = property('a.b.c')

console.log(func({a: {b: { c: 1}}})) // 1
```
