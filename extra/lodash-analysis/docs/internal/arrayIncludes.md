# arrayIncludes 

## Description 
和 数组的 includes 方法类似，不过不支持从特定位置开始查找
## Params
`(array, value)`
## Return
`Boolean`
## Depend
```js
import baseIndexOf from './baseIndexOf.js'
```
> [baseIndexOf 源码分析](./baseIndexOf.md)
>

## Code
```js
function arrayIncludes(array, value) {
  const length = array == null ? 0 : array.length
  return !!length && baseIndexOf(array, value, 0) > -1
}
```
## Analyze
1. 判断 `array` 是否为 `null`（兼容`undefined`），如果是 取 `length` 为0，否则取 `array.length`
2. 如果 `length` 为假值，则返回 `false`， 否则 调用 `baseIndexOf` 拿到元素下标，判断下标是否大于 `-1`，如果大于 `-1`，说明找到了，返回 `true`，否则返回 `false`
## Remark
1. [短路计算 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_Operators#%E7%9F%AD%E8%B7%AF%E8%AE%A1%E7%AE%97)
2. 双重非（!!）运算符显式地将任意值强制转换为其对应的布尔值
3. [Array.prototype.includes() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回 false。
## Example 
```js
const a = [1,2,3,4,5, NaN]
arrayIncludes(a, 3) // true
arrayIncludes(a, -1) // false
arrayIncludes(a, NaN) // true
```
