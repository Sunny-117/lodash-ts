# getAllKeys 

## Description 
获取 object 所有可枚举属性，包括可枚举的 symbol
## Params
`{Object} object`
## Return
`Array`
## Depend
```js
import getSymbols from './getSymbols.js'
import keys from '../keys.js'
```
> [getSymbols 源码分析](./getSymbols.md)
> <br/>
> <br/>
> [keys 源码分析](../export/keys.md)

## Code
```js
function getAllKeys(object) {
  const result = keys(object)
  if (!Array.isArray(object)) {
    result.push(...getSymbols(object))
  }
  return result
}
```
## Analyze
1. 首先通过 `keys` 拿到 所有的可枚举属性，不包括原型链上
2. 判断 传入的 `object` 是否为 数组，如果不是数组，则使用 `getSymbols` 拿到可枚举的 `symbol` 属性，并 `push` 到 `result` 数组
## Remark
1. [Array.isArray MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)
2. [展开语法 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
## Example
```js
const a = {a: 1, b:2, c:3}

;[1,2,3,4,5].forEach(k => {
  Object.defineProperty(a, Symbol(k), {
    'enumerable': true,
    'value': k,
  })
})

Object.defineProperty(a, Symbol(6), {
  'value': 6,
})

console.log(getAllKeys(a)) // ['a', 'b', 'c', Symbol(1), Symbol(2), Symbol(3), Symbol(4), Symbol(5)]
```
