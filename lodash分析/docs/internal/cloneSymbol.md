# cloneSymbol 

## Description 
symbol 是JavaScript的一种基本数据类型，每个从 Symbol() 返回的 symbol 值都是唯一的。一个 symbol 值能作为对象属性的标识符；这是该数据类型仅有的目的。
## Params
`{Object} symbol`
## Return
`{Object} symbol`

## Code
```js
const symbolValueOf = Symbol.prototype.valueOf

function cloneSymbol(symbol) {
  return Object(symbolValueOf.call(symbol))
}

```
## Analyze
使用 `valueOf` 返回当前 `Symbol` 对象所包含的 `Symbol` 原始值，通过 Object 构造函数将返回的 `Symbol` 包装成为一个新的 `Symbol` 对象
## Remark
1. [Symbol MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
2. [Object () 构造函数 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/Object)
## Example
```js
const a = Symbol(1)

console.log(cloneSymbol(a)) // [Symbol: Symbol(1)]
```
