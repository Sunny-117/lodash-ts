# hasIn 

## Description 
检查 path 是否是 object 对象的直接或继承属性。

## Params
`(object, key)`
## Return
`Boolean`

## Code
```js
function hasIn(object, key) {
  return object != null && key in Object(object)
}
```
## Analyze
也就是判断了 `object` 是否为 `null` 或者 `undefined` ， 并且通过 `in` 来判断 `key` 是否在 `object` 原型及其原型链上
## Remark
1. [in MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in)
## Example
```js
const a = {a: 1, b:2}
console.log(hasIn(a, 'a')) // true
```
