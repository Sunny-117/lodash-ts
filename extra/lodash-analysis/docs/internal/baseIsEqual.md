# baseIsEqual 

## Description 
判断 value 和 other 是否相等
## Params
`(value, other, bitmask, customizer, stack)`
> value - 要判断的值
>
> other - 要判断的另一个值
>
> bitmask - 标志位
>
> customizer - 自定义比较函数
>
> stack - stack 实例，用来处理循环引用的问题
>

## Return
`Boolean`
## Depend
```js
import baseIsEqualDeep from './baseIsEqualDeep.js'
import isObjectLike from '../isObjectLike.js'
```
> [baseIsEqualDeep 源码分析](./baseIsEqualDeep.md)
> <br/>
> <br/>
> [isObjectLike 源码分析](../export/isObjectLike.md)
>

## Code
```js
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack)
}
```
## Analyze
1. 首先判断，如果 `value` 全等于 `other` ，则返回 `true`，认为二者相等
2. 判断 `value` 和 `other` 是否都为 `NaN`，如果二者都为 `NaN` 则认为 二者是相等的 
3. 调用 `baseIsEqualDeep` 进行比较，这里传入的 `equalFunc` 则是 `baseIsEqual` 本身，也就是 `equalArrays` 等函数会递归比较的原因
## Remark
1. 等式 (x !== x) 成立的唯一情况是 x 的值为 NaN ，所以这里第二步判断的时候，就是判断 NaN 
## Example
```js
const a = {a: 1, b: 1}
const b = Object.create(null)
b.a = b.b = 1

console.log(baseIsEqual(a,b)) // true
```
