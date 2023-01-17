# isFunction

## Description
检查 value 是否是 Function 对象。

## Params
`value`

## Return
`Boolean`

## Code
```js
function isFunction(value) {
  return typeof value === 'function'
}
```

## Analyze
其实就是使用 `typeof` 判断 `value` 的类型是不是 `function`

## Remark
1. [typeof MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)

## Example
```js
console.log(isFunction(() => {})) // true
console.log(isFunction(Math.floor)) // true
console.log(isFunction(Math.floor())) // false
```
