# castArrayLikeObject

## Description
如果 value 不是类数组对象，则将 value 转换为空数组。
## Params
`value`
## Return
`{Array|Object}`
## Depend
```js
import isArrayLikeObject from '../isArrayLikeObject.js'
```
> [isArrayLikeObject 源码分析](../export/isArrayLikeObject.md)
> 

## Code
```js
function castArrayLikeObject(value) {
  return isArrayLikeObject(value) ? value : []
}
```
## Analyze
如果通过 `isArrayLikeObject` 的判断，则返回 `value` ，否则返回空数组

## Remark
如果一个值被认为是类数组，那么它不是一个函数，并且 `value.length` 是个整数，大于等于 0，小于或等于 `Number.MAX_SAFE_INTEGER`

## Example
```js
const a = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3
}

console.log(castArrayLikeObject(a)) // { '0': 'a', '1': 'b', '2': 'c', length: 3 }
```
