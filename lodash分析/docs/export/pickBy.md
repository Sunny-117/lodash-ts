# pickBy 

## Description 
创建一个对象，这个对象组成为从 object 中经 predicate 判断为真值的属性。 predicate 调用 2 个参数：(value, key)。
## Params
`(object, predicate)`
## Return
`Object`
## Depend
```js
import map from './map.js'
import basePickBy from './.internal/basePickBy.js'
import getAllKeysIn from './.internal/getAllKeysIn.js'
```
> [map 源码分析](./map.md)
> <br/>
> <br/>
> [basePickBy 源码分析](../internal/basePickBy.md)
> <br/>
> <br/>
> [getAllKeysIn 源码分析](../internal/getAllKeysIn.md)

## Code
```js
function pickBy(object, predicate) {
  if (object == null) {
    return {}
  }
  const props = map(getAllKeysIn(object), (prop) => [prop])
  return basePickBy(object, props, (value, path) => predicate(value, path[0]))
}
```
## Analyze
1. 如果 `object` 为 `null` 或者 `undefined` ，返回空对象
2. 使用 `getAllKeysIn` 获取 `object` 所有可枚举属性，包括原型链上，包括 `symbol`，并使用 `map` 将每个属性转换为数组，符合 `basePickBy` 要求
3. 使用 `basePickBy` 进行结果对象的生成，调用传入的 `predicate` 函数，只不过会取出 `path`
## Remark
1. [属性的可枚举性和所有权 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)
## Example
```js
const a = {
  a: 1,
  b: 2,
  c: 3
}

console.log(pickBy(a, (value, path) => value > 1)) // { b: 2, c: 3 }
```
