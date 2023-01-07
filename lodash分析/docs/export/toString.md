# toString 

## Description 
转换 `value` 为字符串。 `null` 和 `undefined` 将返回空字符串。`-0` 将被转换为字符串 `"-0"`。
## Params
`value`
## Return
`String`
## Depend
```js
import isSymbol from './isSymbol.js'
```
> [isSymbol 源码分析](./isSymbol.md)
>

## Code
```js
const INFINITY = 1 / 0

function toString(value) {
  if (value == null) {
    return ''
  }
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value === 'string') {
    return value
  }
  if (Array.isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return `${value.map((other) => other == null ? other : toString(other))}`
  }
  if (isSymbol(value)) {
    return value.toString()
  }
  const result = `${value}`
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result
}
```
## Analyze
1. 如果传入的 `value == null` ，则返回 空字符串，这里使用 `==` ，兼容了 `undefined`
   
2. 如果传入的 `value` 本身 `typeof` 就是字符串，则直接返回 `value`
3. 针对数组的处理，这里使用了递归调用进行处理,与 `Array.prototype.toString` 不同的是，`lodash` 的 `toString` 可以处理数组中的 `Symbol` 以及将 `-0` 转为 `'-0'` , 原生的 `Array.prototype.toString` 在处理 `Symbol` 时 会报 `Uncaught TypeError: Cannot convert a Symbol value to a string`
4. 如果 `value` 为 `symbol` 类型，则直接调用 `Symbol.prototype.toString` 方法进行处理
5. 使用模板字符串转换为字符串型，到最后做了 `-0` 的判断，正确的返回了字符串 `'-0'`

## Remark
1. [Number.prototype.toString ECMAScript 2015](https://262.ecma-international.org/6.0/#sec-number.prototype.tostring)

2.[Number.prototype.toString() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toString) 、 [Object.prototype.toString() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString) 、 [RegExp.prototype.toString() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/toString) 、 [BigInt.prototype.toString() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/BigInt/toString) 、 [Function.prototype.toString() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/toString) 、 [Boolean.prototype.toString() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean/toString)  、 [Error.prototype.toString() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error/toString) 、 [Symbol.prototype.toString() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toString) 、 [Date.prototype.toString() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date/toString) 、 [Array.prototype.toString() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/toString) 、 [String.prototype.toString() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/toString)

3. [Strict equality (===) MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Strict_equality) -- [ECMA](https://262.ecma-international.org/5.1/#sec-11.9.6)
   
4. [相等(==) MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/%E7%9B%B8%E7%AD%89)
5. [模板字面量(模板字符串) MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/template_strings)
6. [Number.NEGATIVE_INFINITY MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/NEGATIVE_INFINITY)
7. [Number.POSITIVE_INFINITY MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY)
## Example
```js
toString([null,2,undefined,Symbol(1),[1,[2,[3]]]]) // ,2,,Symbol(1),1,2,3
toString('3') // 3
toString(3) // 3
toString(-0) // -0
```
