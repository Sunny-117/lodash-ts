# assignValue 

## Description 
给 object 的 key 设置 value
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
function assignValue(object, key, value) {
  const objValue = object[key]

  if (!(hasOwnProperty.call(object, key) && eq(objValue, value))) {
    if (value !== 0 || (1 / value) === (1 / objValue)) {
      baseAssignValue(object, key, value)
    }
  } else if (value === undefined && !(key in object)) {
    baseAssignValue(object, key, value)
  }
}
```
## Analyze
1. 首先拿到当前对象中`key` 对应的`value` 值
2. 然后判断当前对象是否包含对应的`key`，并且看传入的`value` 和 之前的 `value` 是否相等
3. 因为 `eq` 这里会将 `0` 和 `-0` 返回成 `true`
4. 如果传入了 `NaN` 和 `NaN` 或者 `+-0` 的值进入了 `eq`， 则都是`true`
5. 如果满足了 2 则进入 `if` 判断， 这里判断 `value !== 0` 或者 `1 / value === 1 / objValue` , 在这种判断下，会进入 `1 / value === 1 / objValue` 的只有 `value` 为 `+-0`的情况， 除非是 `objValue` 和 `value` 完全相等的情况下 `1 / value === 1 / objValue` 才会通过，所以 `assignValue` 并不会处理 `+-0`  的情况，也就是说 如果 `objValue` 为 `-0` ，`value` 为 `0` ，`assignValue`并不会进行更新，会依旧保留 `-0` ，反之一样
6. 如果当前对象不包含对应的key，或者新值和旧值不同时，会进入 `else` 分支
7. 在 else if 中判断了 传入的value是否为 undefined ，并且 key 值不存在与 object 或者其原型链上时，才会进入 代码块进行赋值，相当于给当前对象添加了一个属性，值为undefined
## Remark
1. [Object.prototype.hasOwnProperty() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty) 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）
2. [in MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in) 如果指定的属性在指定的对象或其原型链中，则in 运算符返回 true
3. [Object.defineProperty() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
## Example
```js
var a = {a: 0}

assignValue(a, 'a', -0)

console.log(a) // {a: 0}

assignValue(a, 'a', 'zero')

console.log(a) // { a: 'zero' }

assignValue(a, 'b')

console.log(a) // { a: 'zero', b: undefined }

assignValue(a, 'b', null)

console.log(a) // { a: 'zero', b: null }

assignValue(a, 'b', null)

console.log(a) // { a: 'zero', b: null }
```
