# isObject 

## Description 
检查 value 是否为 Object 的 [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types) 。 (例如： arrays, functions, objects, regexes,new Number(0), 以及 new String(''))
## Params
`Value`
## Return
`Boolean`

## Code
```js
function isObject(value) {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}
```
## Analyze
1. 拿到 `value` 的 `typeof` 值
2. `type` 不为 `null` 并且 `type` 等于 `object` 或者 `function`
## Remark
1. 使用 `new` 构造的 `string`  和 `number` 是 `object` 类型， [Number 构造函数 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/Number) ，[String 构造函数 MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/String)
2. [typeof MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)
3. [ECMA Function](https://tc39.es/ecma262/#sec-function-p1-p2-pn-body)
## Example
```js
isObject({}) // => true

isObject([1, 2, 3]) // => true

isObject(Function) // => true

isObject(null) // => false
```
