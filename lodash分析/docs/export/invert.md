# invert

## Description
创建一个 object 键值倒置后的对象。 如果 object 有重复的值，后面的值会覆盖前面的值。

## Params
`object`

## Return
`Object`

## Code
```js
const toString = Object.prototype.toString
function invert(object) {
  const result = {}
  Object.keys(object).forEach((key) => {
    let value = object[key]
    if (value != null && typeof value.toString !== 'function') {
      value = toString.call(value)
    }
    result[value] = key
  })
  return result
}
```

## Analyze
通过 `Object.keys` 拿到 `object` 的可遍历属性，使用 `forEach` 遍历，拿到 `value` 值

判断 如果 `value` 不是 `null` 并且 不存在 `toString` 方法时，使用 `Object.prototype.toString.call` 来进行转换

如果 `value` 存在 `toString` 方法，则在设置对象 `key` 值时，会隐式的转换

将 `value` 作为 属性 ，将 `key` 作为 值 设置给 `result`

## Remark
1. [Object.prototype.toString() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) 方法返回一个表示该对象的字符串。

## Example
```js
const obj = {
  a: +new Date(),
  b: +new Date(),
  c: true,
  d: new Boolean(true),
  e: 1,
  f: '1'
}

console.log(invert(obj)) // { '1': 'f', '1615255265828': 'b', true: 'd' }
```
