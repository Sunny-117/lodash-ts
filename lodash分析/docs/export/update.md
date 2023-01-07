# update

## Description
update 用来更新路径 path 下的值。
## Params
`(object, path, updater)`
## Return
`Object`
## Depend
```js
import baseUpdate from './.internal/baseUpdate.js'
```
> [baseUpdate 源码分析](../internal/baseUpdate.md)
> 

## Code
```js
function update(object, path, updater) {
  return object == null ? object : baseUpdate(object, path, updater)
}
```
## Analyze
本质还是调用 `baseUpdate` 方法，会做判断，如果 `object` 为 `null` 或者 `undefined` ，则返回 `object`

## Example
```js
console.log(update({a:1}, 'a',(v) => ++v)) // { a: 2 }
```
