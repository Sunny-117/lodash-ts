# isStrictComparable 

## Description 
检查value是否适合严格相等比较，即===。
## Params
`value`
## Return
`Boolean`
## Depend
```js
import isObject from '../isObject.js'
```
> [isObject 源码分析](../export/isObject.md)
>

## Code
```js
function isStrictComparable(value) {
  return value === value && !isObject(value)
}
```
## Analyze
1. `value === value` ，除 `NaN` 以外都满足
2. `!isObject(value)` ，也就是说 `typeof value != 'object'` 即可
3. 也就是说满足以上条件的值，都可以使用 `===` 来进行判断
## Remark
1. [严格相等 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness#%E4%B8%A5%E6%A0%BC%E7%9B%B8%E7%AD%89)
## Example
```js
console.log(isStrictComparable(3)) // true
console.log(isStrictComparable({a: 1})) // false
console.log(isStrictComparable(() => {})) // false

```
