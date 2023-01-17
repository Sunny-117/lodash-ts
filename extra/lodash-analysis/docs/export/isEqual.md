# isEqual

## Description
执行深比较来确定两者的值是否相等。
## Params
`(value, other)`
## Return
`Boolean`
## Depend
```js
import baseIsEqual from './.internal/baseIsEqual.js'
```
> [baseIsEqual 源码分析](../internal/baseIsEqual.md)
> 

## Code
```js
function isEqual(value, other) {
  return baseIsEqual(value, other)
}
```
## Analyze
本质就是调用了 baseIsEqual 方法，所以具体可查看 [baseIsEqual](../internal/baseIsEqual.md) 

## Example
```js
const object = { 'a': 1 }
const other = { 'a': 1 }
isEqual(object, other)
// => true
object === other
// => false
```
