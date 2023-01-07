# copySymbols 

## Description 
将 `source` 的 可枚举 symbol 拷贝到 `object` 上
## Params
`(source, object)`
## Return
`Object`
## Depend
```js
import copyObject from './copyObject.js'
import getSymbols from './getSymbols.js'
```
> [copyObject 源码分析](./copyObject.md)
> <br/>
> <br/>
> [getSymbols 源码分析](./getSymbols.md)
>

## Code
```js
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object)
}
```
## Analyze
1. `copyObject` 就是将 `source` 的 `props` 属性 复制到 `object` 上
2. 对于 `symbol` 而言，则是调用了 `getSymbols` 方法，来获取所有可枚举的 `symbol` 属性
3. 然后将这些可枚举的 `symbol` 属性 复制到了 `object` 上
## Remark
在 ES6 中，由于 Symbol 类型的特殊性，用 Symbol 类型的值来做对象的 key 与常规的定义或修改不同，而 [Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 是定义 key 为 Symbol 的属性的方法之一。

## Example
```js
const a = {a: 1}

;[1,2,3,4,5].forEach(k => {
  Object.defineProperty(a, Symbol(k), {
    'enumerable': true,
    'value': k,
  })
})

Object.defineProperty(a, Symbol(6), {
  'value': 6,
})

const b = {b: 1}

/**
* {
*   b: 1,
*   [Symbol(1)]: 1,
*   [Symbol(2)]: 2,
*   [Symbol(3)]: 3,
*   [Symbol(4)]: 4,
*   [Symbol(5)]: 5
* }
* 
*/
console.log(copySymbols(a, b)) 
```
