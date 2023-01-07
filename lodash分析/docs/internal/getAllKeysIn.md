# getAllKeysIn 

## Description 
获取 object 所有可枚举属性以及原型链上的属性，包括可枚举的 symbol 以及原型链可枚举的 symbol
## Params
`{Object} object`
## Return
`Array`
## Depend
```js
import getSymbolsIn from './getSymbolsIn.js'
```
> [getSymbolsIn 源码分析](./getSymbolsIn.md)
>

## Code
```js
function getAllKeysIn(object) {
  const result = []
  for (const key in object) {
    result.push(key)
  }
  if (!Array.isArray(object)) {
    result.push(...getSymbolsIn(object))
  }
  return result
}
```
## Analyze
1. 使用 `for...in` 拿到 `object` 除 `symbol` 外所有可枚举属性
2. 判断 `object` 是否为 `array`，如果不是 `array` ，则使用 `getSymbolsIn` 拿到所有可遍历 `symbol` 包括原型链上
## Remark
1. [for...in MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in)
2. [展开语法 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
## Example
```js
function A () {
  ;[1,2,3,4,5].forEach(k => {
    Object.defineProperty(this, Symbol(k), {
      'enumerable': true,
      'value': k,
    })
  })
}

const b = new A()
b['test'] = 'test'

Object.defineProperty(b, Symbol(7), {
  'value': 7,
  'enumerable': true,
})

console.log(getAllKeysIn(b)) // [ 'test', Symbol(1), Symbol(2), Symbol(3), Symbol(4), Symbol(5), Symbol(7) ]
```
