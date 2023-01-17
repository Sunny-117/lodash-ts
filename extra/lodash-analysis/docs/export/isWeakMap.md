# isWeakMap

## Description
检查 value 是否是 WeakMap 对象

## Params
`value`

## Return
`Boolean`

## Depend
```js
import getTag from './.internal/getTag.js'
import isObjectLike from './isObjectLike.js'
```
> [getTag 源码分析](../internal/getTag.md)
> <br/>
> <br/>
> [isObjectLike 源码分析](./isObjectLike.md)

## Code
```js
function isWeakMap(value) {
  return isObjectLike(value) && getTag(value) == '[object WeakMap]'
}
```
## Analyze
判断如果 `value` 是 `object`， 并且 `value` 的 `tag` 是 `[object WeakMap]`， 都满足则说明是 `WeakMap` 对象

## Example
```js
isWeakMap(new WeakMap)
// => true

isWeakMap(new Map)
// => false
```
