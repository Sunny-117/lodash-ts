# isRegExp

## Description
检查 value 是否为 RegExp 对象。

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
const nodeIsRegExp = nodeTypes && nodeTypes.isRegExp
const isRegExp = nodeIsRegExp
  ? (value) => nodeIsRegExp(value)
  : (value) => isObjectLike(value) && getTag(value) == '[object RegExp]'

```
## Analyze
和 [isArrayBuffer](./isArrayBuffer.md) 类似,具体不在赘述

## Example
```js
isRegExp(/abc/)
// => true

isRegExp('/abc/')
// => false
```
