# isMap

## Description
检查 value 是否为一个 Map 对象。

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
const nodeIsMap = nodeTypes && nodeTypes.isMap
const isMap = nodeIsMap
  ? (value) => nodeIsMap(value)
  : (value) => isObjectLike(value) && getTag(value) == '[object Map]'
```
## Analyze
和 [isArrayBuffer](./isArrayBuffer.md) 类似，只不过 `node` 的方法和 `getTag` 的判断条件不同罢了

## Remark
1. [Map MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)

## Example
```js
isMap(new Map)
// => true

isMap(new WeakMap)
// => false
```
