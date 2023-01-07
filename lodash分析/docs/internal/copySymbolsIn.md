# copySymbolsIn 

## Description 
将 `source` 的 可枚举 `symbol` 拷贝到 `object` 上，不过会将 原型链上的 可枚举 `symbol` 类型也会复制到 `object` 上
## Params
`(source, object)`
## Return
`Object`
## Depend
```js
import copyObject from './copyObject.js'
import getSymbolsIn from './getSymbolsIn.js'
```
> [copyObject 源码分析](./copyObject.md)
> <br/>
> <br/>
> [getSymbolsIn 源码分析](./getSymbolsIn.md)
>

## Code
```js
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object)
}
```
## Analyze
1. `copyObject` 就是将 `source` 的 `props` 属性 复制到 `object` 上
2. 对于 `symbol` 而言，则是调用了 `getSymbolsIn` 方法，来获取所有可枚举的 `symbol` 属性，包括 source 原型链上的 可枚举 `symbol`
3. 然后将这些可枚举的 `symbol` 属性 复制到了 `object` 上
## Remark
在 ES6 中，由于 Symbol 类型的特殊性，用 Symbol 类型的值来做对象的 key 与常规的定义或修改不同，而 [Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 是定义 key 为 Symbol 的属性的方法之一。
## Example
```js
const b = new A()

Object.defineProperty(b, Symbol(7), {
  'value': 7,
  'enumerable': true,
})

const c = {c:1}

/**
 * {
 *   c: 1,
 *   [Symbol(1)]: 1,
 *   [Symbol(2)]: 2,
 *   [Symbol(3)]: 3,
 *   [Symbol(4)]: 4,
 *   [Symbol(5)]: 5,
 *   [Symbol(7)]: 7
 * }
 * */

console.log(copySymbolsIn(b, c))
```
