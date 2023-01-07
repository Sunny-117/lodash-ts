# isString

## Description
检查 value 是否是原始字符串 String 或者对象。

## Params
`value`

## Return
`Boolean`

## Depend
```js
import getTag from './.internal/getTag.js'
```
> [getTag 源码分析](../internal/getTag.md)

## Code
```js
function isString(value) {
  const type = typeof value
  return type === 'string' || (type === 'object' && value != null && !Array.isArray(value) && getTag(value) == '[object String]')
}
```

## Analyze
拿到 `value` 的 `type` ，判断 `type` 为 `string` 或者 在 `type` 为 `object` 时要判断其是否为字符串

这里 `lodash` 判断了 `value != null` 并且 `value` 不是数组，然后通过 `getTag` 判断了 `value` 的 类型

`value` 为 对象时， `getTag` 类型为 `'[object String]'` 表示其为 字符串

## Remark
这里判断了 `value != null` 和 `value` 不是 数组的情况，从某种程度上来说，完全没有必要，直接通过 `getTag(value)` 判断类型即可

## Example
```js
isString('abc')
// => true

isString(1)
// => false
```
