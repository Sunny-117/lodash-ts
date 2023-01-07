# functions

## Description
创建一个函数属性名称的数组，函数属性名称来自 object 对象自身可枚举属性。
## Params
`object`
## Return
`Array`

## Code
```js
function functions(object) {
  if (object == null) {
    return []
  }
  return Object.keys(object).filter((key) => typeof object[key] === 'function')
}
```
## Analyze
如果 `object` 为 `null` 或者 没有传入 ，则返回空数组

通过 `Object.keys` 拿到所有可遍历的属性，通过 `filter` 进行过滤，过滤条件是 当前 `key` 对应的 值是一个 `function` 类型
## Remark
1. [Object.keys() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) 方法会返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和正常循环遍历该对象时返回的顺序一致 。
2. [Array.prototype.filter() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 方法创建一个新数组，其包含通过所提供函数实现的测试的所有元素。
## Example
```js
const a = {
  a: () => {},
  b: () => {},
  c: 3
}

console.log(functions(a)) // [ 'a', 'b' ]
```
