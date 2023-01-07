# isMatch 

## Description 
执行一个深度比较，来确定 object 是否含有和 source 完全相等的属性值。
## Params
`(object, source)`
## Return
`Boolean`
## Depend
```js
import baseIsMatch from './.internal/baseIsMatch.js'
import getMatchData from './.internal/getMatchData.js'
```
> [baseIsMatch 源码分析](../internal/baseIsMatch.md)
> <br/>
> <br/>
> [getMatchData 源码分析](../internal/getMatchData.md)
>

## Code
```js
function isMatch(object, source) {
  return object === source || baseIsMatch(object, source, getMatchData(source))
}
```
## Analyze
1. 如果 `object === source`，则认为 `object` 是包含 `source` 的
2. 否则使用 `baseIsMatch` 来进行判断
## Remark
1. 对于对象的 `===` 判断，如果两个对象指向同一个内存空间，则认为两个对象是相等的
## Example
```js
const object = { 'a': 1, 'b': 2 }
isMatch(object, { 'b': 2 })  // => true 
isMatch(object, { 'b': 1 })  // => false
```
