# isArrayLike 

## Description 
检查 value 是否是类数组。 如果一个值被认为是类数组，那么它不是一个函数，并且 value.length 是个整数，大于等于 0，小于或等于 Number.MAX_SAFE_INTEGER
## Params
`value`
## Return
`Boolean`
## Depend
```js
import isLength from './isLength.js'
```
> [isLength 源码分析](./isLength.md)
>

## Code
```js
function isArrayLike(value) {
  return value != null && typeof value !== 'function' && isLength(value.length)
}
```
## Analyze
1. 判断 value != null ，同时也包含了 undefined
2. 并且 value 的类型 不是 function 
3. value.length 可以通过 isLength 的校验
## Remark
1. [Function.length MDN](https://developer.mozilla.org/zh-cn/docs/Web/JavaScript/Reference/Global_Objects/Function/length)
2. Array 的 length 属性的值是一个 0 到 2<sup>32</sup> -1 (4294967295) 的整数，如果超过了这个值，会报 `RangeError: 无效数组长度` ---- [Array.length MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
## Example
```js
isArrayLike([1, 2, 3]) // => true

isArrayLike(document.body.children) // => true

isArrayLike('abc') // => true

isArrayLike(Function) // => false
```
