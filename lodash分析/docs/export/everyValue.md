# everyValue

## Description
检查predicate是否对对象的所有属性都返回truthy。一旦predicate返回falsey，则停止迭代。predicate被调用时有三个参数。(value, key, object).
## Params
`(object, predicate)`
## Return
`Boolean`

## Code
```js
function everyValue(object, predicate) {
  object = Object(object)
  const props = Object.keys(object)

  for (const key of props) {
    if (!predicate(object[key], key, object)) {
      return false
    }
  }
  return true
}
```
## Analyze
和 [every](./every.md) 处理逻辑差别不大，只不过这里将 `while` 循环改为了 `for...of` ，通过 `Object.keys` 获取了 `object` 的所有可遍历 `key` 
## Remark
1. [for...of MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of) 语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句
2. [Object.keys() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)  方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致 。
## Example
```js
console.log(everyValue({a:1,b:2,c:3,d:4}, (v) => v>0)) // true
```
