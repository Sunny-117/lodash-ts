# baseIndexOf 

## Description 
没有 `fromIndex` 边界检查的 `indexOf` 的基本实现。找到返回下标，否则返回-1

没有处理 `fromIndex` 为负数的情况

可以匹配 `NaN`
## Params
`(array, value, fromIndex)`
> fromIndex - 开始的下标
>

## Return
`Number`
## Depend
```js
import baseFindIndex from './baseFindIndex.js'
import baseIsNaN from './baseIsNaN.js'
import strictIndexOf from './strictIndexOf.js'
```
> [baseFindIndex 源码分析](./baseFindIndex.md)
> <br/>
> <br/>
> [baseIsNaN 源码分析](./baseIsNaN.md)
> <br/>
> <br/>
> [strictIndexOf 源码分析](./strictIndexOf.md)
>

## Code
```js
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex)
}
```
## Analyze
1. 判断 `value === value` ,调用 `strictIndexOf` 查找下标
   
2. 否则使用 `baseFindIndex` 查找，传给 `baseFindIndex` 的判断方法为 `baseIsNaN`
## Remark
1. 全等操作符认为 `NaN` 与其他任何值都不全等，包括它自己。等式 (x !== x) 成立的唯一情况是 x 的值为 NaN
   
2. 对于 `NaN` 使用了自己定义的 `baseIsNaN` 进行判断，会返回 `true`
3. [JavaScript 中的相等性判断 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness)
4. [Array.prototype.indexOf() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)
## Example
```js
const a = [1,2, NaN, 4, 5]
baseIndexOf(a, 2, 0) // 1
baseIndexOf(a, 3, 0) // -1
baseIndexOf(a, NaN, 0) // 2
```
