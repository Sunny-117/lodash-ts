# isWeakSet

## Description
检查 value 是否是 WeakSet 对象。

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
function isWeakSet(value) {
  return isObjectLike(value) && getTag(value) == '[object WeakSet]'
}
```
## Analyze
和 [isWeakMap](./isWeakMap.md) 基本类似，不再赘述

## Example
```js
isWeakSet(new WeakSet)
// => true

isWeakSet(new Set)
// => false
```
