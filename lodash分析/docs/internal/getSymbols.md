# getSymbols 

## Description 
拿到 `object` 的可枚举 `symbol` 数组
## Params
`object`
## Return
`Array`

## Code
```js
const propertyIsEnumerable = Object.prototype.propertyIsEnumerable

const nativeGetSymbols = Object.getOwnPropertySymbols

function getSymbols(object) {
  if (object == null) {
    return []
  }
  object = Object(object)
  return nativeGetSymbols(object).filter((symbol) => propertyIsEnumerable.call(object, symbol))
}
```
## Analyze
1. 如果传入的 object 为 null ，则直接 返回 空数组
2. 调用 Object 构造函数，将 object 包装成一个新的对象
3. Object.getOwnPropertySymbols() 方法返回一个给定对象自身的所有 Symbol 属性的数组。
4. Object.prototype.propertyIsEnumerable() 方法返回一个布尔值，表示指定的属性是否可枚举。
5. 通过以上两个方法，过滤出可以枚举的 symbol 数组，并返回
## Remark
1. [Object () 构造函数 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/Object)
2. [Object.prototype.propertyIsEnumerable() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/propertyIsEnumerable)
3. [Object.getOwnPropertySymbols() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols)
4. [Object.defineProperty() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
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

console.log(getSymbols(a)) // [ Symbol(1), Symbol(2), Symbol(3), Symbol(4), Symbol(5) ]

```
