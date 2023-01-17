# getSymbolsIn 

## Description 
拿到 `object` 的可枚举 `symbol` 数组，同时会处理原型链上所有可枚举的 `symbol`
## Params
`{Object} object`
## Return
`Array`
## Depend
```js
import getSymbols from './getSymbols.js'
```
> [getSymbols 源码分析](./getSymbols.md)
>

## Code
```js
function getSymbolsIn(object) {
  const result = []
  while (object) {
    result.push(...getSymbols(object))
    object = Object.getPrototypeOf(Object(object))
  }
  return result
}
```
## Analyze
1. 定义空数组用来接收结果
2. 使用 `while` 循环，结束条件为 `object` 为真，所以没有一开始处理 `object == null` 的情况
3. 使用展开运算符，拿到 `getSymbols` 返回数据的每一项，扁平化 `result`
4. `Object.getPrototypeOf()` 方法返回指定对象的原型（内部 \[\[Prototype]] 属性的值）。
5. `Object.getPrototypeOf` 在获取 `object` 的原型，每一次都会重新赋值 `object`， 到最终会返回 `null` ，也就是 `while` 条件的结束
6. 返回得到的 `symbol` 结果数组
## Remark
1. [Object.getPrototypeOf() MND](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/GetPrototypeOf)
2. [展开语法 (Spread syntax) MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
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

Object.defineProperty(b, Symbol(7), {
  'value': 7,
  'enumerable': true,
})

console.log(getSymbolsIn(b)) // [ Symbol(1), Symbol(2), Symbol(3), Symbol(4), Symbol(5), Symbol(7) ]


```
