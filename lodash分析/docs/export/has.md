# has

## Description
检查key是否是object的直接属性。
## Params
`(object, key)`
## Return
`Boolean`

## Code
```js
const hasOwnProperty = Object.prototype.hasOwnProperty
function has(object, key) {
  return object != null && hasOwnProperty.call(object, key)
}
```
## Analyze
如果 `object` 不是 `null` 或者 `undefined` ，则使用 `Object.prototype.hasOwnProperty` 进行判断
## Remark
使用 [Object.prototype.hasOwnProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty) (方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）。)，原因在于 有可能 object 原型 或者 原型链上自定义了 `hasOwnProperty` 方法，使用 `Object.prototype.hasOwnProperty.call` 就可以得到正确的结果
## Example
```js
function A() {
  this.b = 1
}
A.c = 1

const a = new A

a.a = 1

console.log(has(a, 'a')) // true
console.log(has(a, 'b')) // true
console.log(has(a, 'c')) // false
```
