# isBoolean

## Description
检查 value 是否是原始 boolean 类型或者对象。

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
function isBoolean(value) {
  return value === true || value === false ||
    (isObjectLike(value) && getTag(value) == '[object Boolean]')
}
```

## Analyze
整体判断比较简单，首先判断了 `value` 是否为 `true` 或者 `false`

接着判断了 `Boolean` 对象，如果 `value` 为对象类型，并且 `Object.prototype.toString.call` 的类型为 `'[object Boolean]'`

满足任一条件，都认为是 `Boolean` 类型

## Remark
1. [Boolean MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

## Example
```js
 isBoolean(false)
 // => true

 isBoolean(null)
 // => false
```
