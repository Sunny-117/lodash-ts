# baseConformsTo 

## Description 
[`conformsto`](../export/conformsTo.md) 的基本实现，接受 `props` 检查。

> 会对 object 的 指定 props 属性做检查，检查函数由source提供


## Params
`(object, source, props)`
> {Object} object 
>
> {Object} source
>

## Return
`Boolean`

## Code
```js
function baseConformsTo(object, source, props) {
  let length = props.length
  if (object == null) {
    return !length
  }
  object = Object(object)
  while (length--) {
    const key = props[length]
    const predicate = source[key]
    const value = object[key]

    if ((value === undefined && !(key in object)) || !predicate(value)) {
      return false
    }
  }
  return true
}
```
## Analyze
1. 首先拿到 `props.length` ， 判断传入的 `object` 是否为 `null` 或者 `undefined`，如果是则返回 `!length` 即可。如果有要检测的 属性则返回 `false` ，否则返回 `true`
2. 使用 `Object()` 构造函数，将 `object` 包装为一个新对象 ，基础类型也会转为 `object`
3. 使用 `while` 循环遍历，条件为 `length--`，在条件中已经进行了递减，在代码块中就从 `length - 1` 开始
4. 首先从 `props` 中获取对应的 `key` ， 根据 `key` 分别从 `source` 和 `object` 中拿到 `predicate` 和 `value`
5. 判断 `key` 是否在 `object` 和其原型链 上存在，或者 `value` 不通过 `predicate` 的校验，则返回 `false`
6. 如果全部通过校验，并且 所有 `key` 都在 `object` 和其原型链上，则返回 `true`
## Remark
1. [Object () 构造函数 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/Object)
2. [in MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in) 如果指定的属性在指定的对象或其原型链中，则in 运算符返回 true
## Example
```js
const a = {a: 1, b: 2}
const b = Object.create(null)

b['a'] = b['b'] = x => x > 0

baseConformsTo(a, b, ['a', 'b']) // true
```
