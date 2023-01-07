# isFlattenable

## Description 
`isFlattenable` 方法来判断某个值是否是一个平坦的 `arguments` 对象或数组 (数组和 `arguments` 可以通过遍历展平)
## Params
`value`
## Return
`Boolean`
## Depend
```js
import isArguments from '../isArguments.js'
```
> [isArguments 源码分析](../export/isArguments.md)
>

## Code
```js
const spreadableSymbol = Symbol.isConcatSpreadable

function isFlattenable(value) {
  return Array.isArray(value) || isArguments(value) ||
    !!(value && value[spreadableSymbol])
}
```
## Analyze
1. 如果 `value` 是数组 或者 `value` 是 `arguments`，返回 `true`
2. 通过 `ES6` 中 `Symbol.isConcatSpreadable` 来判断某个值是否可以被展开, `Symbol.isConcatSpreadable` 如果为真值时，该对象是可以展开的

```js
var x = [1, 2, 3];

var fakeArray = {
  length: 2,
  0: "hello",
  1: "world"
}

x.concat(fakeArray); // [1, 2, 3, {0: "hello", 1: "world", length: 2}]
x = [1, 2, 3]
fakeArray[Symbol.isConcatSpreadable] = true
x.concat(fakeArray); // [1, 2, 3, "hello", "world"]
```

3. 这里使用 `!!` 是为了将值转为 `Boolean`，可参考下方，_短路计算_ 和 _双重非运算符_

## Remark
1. [Symbol.isConcatSpreadable MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/isConcatSpreadable)
2. [短路计算 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_Operators#%E7%9F%AD%E8%B7%AF%E8%AE%A1%E7%AE%97)
3. [双重非(!!)运算符 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_Operators#%E9%80%BB%E8%BE%91%E9%9D%9E%EF%BC%88!%EF%BC%89)
## Example
```js
isFlattenable([1,2,3]) // true
isFlattenable({
  length:2, 
  0: "hello",
  1: "world",
  [Symbol.isConcatSpreadable]: true
}) // true
isFlattenable({
  length:2, 
  0: "hello",
  1: "world"
}) // false
```
