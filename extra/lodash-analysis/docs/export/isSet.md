# isSet

## Description
检查 value 是否是一个 Set 对象。

## Params
`value`

## Return
`Boolean`

## Depend
```js
import getTag from './.internal/getTag.js'
import isObjectLike from './isObjectLike.js'
import nodeTypes from './.internal/nodeTypes.js'
```
> [getTag 源码分析](../internal/getTag.md)
> <br/>
> <br/>
> [isObjectLike 源码分析](./isObjectLike.md)
> <br/>
> <br/>
> [nodeTypes 源码分析](../internal/nodeTypes.md)

## Code
```js
const nodeIsSet = nodeTypes && nodeTypes.isSet
const isSet = nodeIsSet
  ? (value) => nodeIsSet(value)
  : (value) => isObjectLike(value) && getTag(value) == '[object Set]'
```
## Analyze
和 [isArrayBuffer](./isArrayBuffer.md) 类似,具体不在赘述

## Example
```js
isSet(new Set)
// => true

isSet(new WeakSet)
// => false
```
