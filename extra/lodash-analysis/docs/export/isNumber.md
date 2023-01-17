# isNumber

## Description
检查 value 是否是原始 Number 数值型 或者 对象。

要排除 Infinity, -Infinity, 以及 NaN 数值类型，用 [isFinite](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/isFinite) 方法。

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
function isNumber(value) {
  return typeof value === 'number' ||
    (isObjectLike(value) && getTag(value) == '[object Number]')
}
```

## Analyze
通过 `typeof` 判断 `value` 的类型 是否为 `number`

如果 `value` 是 `object`， 则通过 `getTag` 获取 `toString` 类型 判断

## Example
```js
console.log(isNumber(3)) // true
console.log(isNumber(new Number(3))) // true
```
