# conformsTo 

## Description 
通过调用断言 source 的属性与 object 的相应属性值，检查 object 是否符合 source。
## Params
`(object, source)`
> object 需要校验的对象
>
> source 提供校验函数的对象
>

## Return
`Boolean`
## Depend
```js
import baseConformsTo from './.internal/baseConformsTo.js'
import keys from './keys.js'
```
> [baseConformsTo 源码分析](../internal/baseConformsTo.md)
> <br/>
> <br/>
> [keys](./keys.md)
>

## Code
```js
function conformsTo(object, source) {
  return source == null || baseConformsTo(object, source, keys(source))
}
```
## Analyze
1. 如果 source 为 null 或 undefined 则表示没有需要校验的 key， 则直接返回 true
2. 调用 baseConformsTo 对 object 进行校验，校验函数又 source 提供，校验所有 source 的 key
## Remark
1. 和 `conforms` 不同的是， `conforms` 会返回一个函数，可以由外部调用；`conformsTo` 会直接返回校验的结果
2. [柯里化（Currying）](https://zh.javascript.info/currying-partials)
3. 偏应用，又称作部分应用，它允许开发者部分地应用函数参数。实际上，偏应用是为一个多元函数预先提供部分参数，从而在调用时可以省略这些参数。
4. 柯里化是把一个多参数函数转换为一个嵌套的一元函数的过程
5. [简明 JavaScript 函数式编程 —— 入门篇](https://juejin.cn/post/6844903936378273799)
## Example
```js
const a = {a: 1, b: 2}
const b = Object.create(null)
b['a'] = b['b'] = (x) => x > 0

conformsTo(a, b) // true
```
