# assignMergeValue 

## Description 
和 [assignValue](./assignValue.md) 类似,将 `object` 的 `key` 设置为 `value` 不同的是 它不会将 `undefined` 赋值给 `object` 上已有的 `key` 
## Params
`(object, key, value)`

## Depend
```js
import baseAssignValue from './baseAssignValue.js'
import eq from '../eq.js'
```
> [baseAssignValue 源码分析](./baseAssignValue.md)
> <br/>
> <br/>
> [eq 源码分析](../export/eq.md)
>

## Code
```js
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq(object[key], value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value)
  }
}
```
## Analyze
1. 进入 if 代码块的条件为 `value !== undefined && !eq(object[key], value)` 或 `value === undefined && !(key in object)`
2. `value !== undefined && !eq(object[key], value)`
    - 传入的 `value` 值不为 `undefined` （null !== undefined）
    - 根据 `key` 从 `object` 获取到的 `value` 值 和 传入的 `value` 值不相等
3. `value === undefined && !(key in object)`
    - 传入的 `value` 为 `undefined`
    - 传入的 `key` 不在 `object` 及其原型链上
4. 满足 2 或者 3，会将 `key` 和 对应的 `value` 设置到 `object` 上
## Remark
1. [in MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in) 如果指定的属性在指定的对象或其原型链中，则in 运算符返回 true
2. [Object.defineProperty() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
## Example
```js
const a = {a: 1}
a['b'] = undefined

assignMergeValue(a, 'c') // { a: 1, b: undefined, c: undefined }

assignMergeValue(a, 'c', 1) // { a: 1, b: undefined, c: 1 }

assignMergeValue(a, 'b', 'b') // { a: 1, b: 'b', c: 1 }
```
