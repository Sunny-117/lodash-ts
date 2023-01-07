# isDate

## Description
检查 value 是否是 Date 对象。

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
const nodeIsDate = nodeTypes && nodeTypes.isDate
const isDate = nodeIsDate
  ? (value) => nodeIsDate(value)
  : (value) => isObjectLike(value) && getTag(value) == '[object Date]'
```

## Analyze
和 [isArrayBuffer](./isArrayBuffer.md) 基本一致，也是判断了 `node` 是否可用，不可用时就通过 `getTag` 判断了类型

## Remark
1. [Date MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Date)

## Example
```js
console.log(isDate(new Date)) // true
```
