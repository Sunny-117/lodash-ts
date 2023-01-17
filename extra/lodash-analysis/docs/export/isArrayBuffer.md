# isArrayBuffer

## Description
检查 value 是否是 ArrayBuffer 对象。

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
const nodeIsArrayBuffer = nodeTypes && nodeTypes.isArrayBuffer
const isArrayBuffer = nodeIsArrayBuffer
  ? (value) => nodeIsArrayBuffer(value)
  : (value) => isObjectLike(value) && getTag(value) == '[object ArrayBuffer]'
```
## Analyze
可以看到，如果可以使用 `node` 的 `isArrayBuffer` 来判断，则使用 `node` ，否则就判断 `value` 是否为一个对象，并且 `getTag` 之后的值为 `'[object ArrayBuffer]'`

满足的情况下，则表示 value 是一个 `ArrayBuffer` 对象

## Remark
1. [ArrayBuffer MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer) 对象用来表示通用的、固定长度的原始二进制数据缓冲区。

## Example
```js
 isArrayBuffer(new ArrayBuffer(2))
 // => true

 isArrayBuffer(new Array(2))
 // => false
```
