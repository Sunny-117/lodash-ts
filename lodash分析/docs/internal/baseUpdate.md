# baseUpdate

## Description
可以使用 updater 来更新 object 中 path 路径的值，在 set 时，也可以使用 customizer 来处理
## Params
`(object, path, updater, customizer)`
## Return
`Object`
## Depend
```js
import baseGet from './baseGet.js'
import baseSet from './baseSet.js'
```
> [baseGet 源码分析](./baseGet.md)
> <br/>
> <br/>
> [baseSet 源码分析](./baseSet.md)
> 

## Code
```js
function baseUpdate(object, path, updater, customizer) {
  return baseSet(object, path, updater(baseGet(object, path)), customizer)
}
```
## Analyze
使用 `baseGet` 取出当前路径对应的值 调用 `updater` 更新，然后调用 `baseSet` ，将更新后的值重新赋值给 `path` 路径

## Example
```js
console.log(baseUpdate({a: 1}, 'a', (val) => ++val)) // {a: 2}
```
