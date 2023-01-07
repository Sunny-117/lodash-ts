# unset

## Description
移除 object 对象 path 路径上的属性。
## Params
`(object, path)`
## Return
`Boolean`
## Depend
```js
import baseUnset from './.internal/baseUnset.js'
```
> [baseUnset 源码分析](../internal/baseUnset.md)
> 

## Code
```js
function unset(object, path) {
  return object == null ? true : baseUnset(object, path)
}
```
## Analyze
如果 `object` 为 `null` 或者 `undefined` ，返回 ture ，否则调用 `baseUnset`

## Example
```js
const a = {a:1,b:2}
unset(a, 'b')
console.log(a) // { a: 1 }
```
