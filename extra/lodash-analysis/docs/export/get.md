# get

## Description 
获取对象深层的值，主要是基于 `baseGet` 实现，不同在于 `get` 可以添加默认值
## Params
`(object, path, defaultValue)`
> {Object} object: 原对象
>
> {Array|string} path: 属性路径 或 属性名
>
> {*} defaultValue: 默认值
>


## Return
`{*} value`
> 返回获取到的值或者默认值


## Depend
```js
import baseGet from './.internal/baseGet.js'
```
> [baseGet 源码分析](../internal/baseGet.md)
>

## Code
```js
function get(object, path, defaultValue) {
  const result = object == null ? undefined : baseGet(object, path)
  return result === undefined ? defaultValue : result
}
```

## Analyze
1. 首先判断 `object` 是否为 `null` ，如果为 `null` ，`result` 则为 `undefined` ， 否则使用 `baseGet` 返回的值
2. 如果 `result` 为 `undefined` 则返回 `defaultValue` ，否则返回 `result`

## Remark
1. 如果不传入 `defaultValue`， `defaultValue` 默认为 `undefined`
2. [默认参数 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Default_parameters)

## Example
```js
const object = { 'a': [{ 'b': { 'c': 3 } }] }

get(object, 'a[0].b.c') // 3
get(object, ['a', '0', 'b', 'c']) // 3
get(object, 'a.b.c', 'default') // default
```
