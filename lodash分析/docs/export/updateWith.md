# updateWith

## Description
该方法类似 [update](./update.md)，不同之处在于它接受 customizer，调用来生成新的对象的 path。如果 customizer 返回 undefined，路径创建由该方法代替。customizer 调用有三个参数：(nsValue, key, nsObject) 。
## Params
`(object, path, updater, customizer)`
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
function updateWith(object, path, updater, customizer) {
  customizer = typeof customizer === 'function' ? customizer : undefined
  return object == null ? object : baseUpdate(object, path, updater, customizer)
}
```
## Analyze
判断了传入的 `customizer` 是否为 `function` ，如果不是 则将其置为 `undefined`

接着就和 [update](./update.md) 基本一致了，如果对象存在，则调用 `baseUpdate` 

## Example
```js
console.log(updateWith({a:1},'a',(v) => ++v,(v) => ++v)) // { a: 2 }
```
