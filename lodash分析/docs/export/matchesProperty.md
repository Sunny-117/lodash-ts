# matchesProperty 

## Description 
创建一个深比较的方法来比较给定对象的 path 的值是否是 srcValue 。 如果是返回 true ，否则返回 false 。
## Params
`(path, srcValue)`
## Return
`Function`
## Depend
```js
import baseClone from './.internal/baseClone.js'
import baseMatchesProperty from './.internal/baseMatchesProperty.js'
```
> [baseClone 源码分析](../internal/baseClone.md)
> <br/>
> <br/>
> [baseMatchesProperty 源码分析](../internal/baseMatchesProperty.md)
>

## Code
```js
/** Used to compose bitmasks for cloning. */
const CLONE_DEEP_FLAG = 1

function matchesProperty(path, srcValue) {
  return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG))
}
```
## Analyze
本质为调用 `baseMatchesProperty` 创建一个 比较函数，区别在于，`matchesProperty` 会深拷贝 `srcValue` 的值
## Remark
matchesProperty 和 baseMatchesProperty 一样，对于 深度路径，同时值为 undefined 的判断，可能会出错，具体可查看 [baseMatchesProperty 源码分析](../internal/baseMatchesProperty.md) 
## Example
```js
const objects = [
  { 'a': 1, 'b': 2, 'c': 3 },
  { 'a': 4, 'b': 5, 'c': 6 }
]

console.log(objects.find(matchesProperty('a', 4)))
// => { 'a': 4, 'b': 5, 'c': 6 }
```
