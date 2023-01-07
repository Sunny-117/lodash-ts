# at

## Description 
创建一个数组，值来自 `object` 的 `paths` 路径相应的值。
## Params
`(object, ...paths)`
> {Object} object: 要迭代的对象。
>
> {...(string|string[])} [paths]: 要获取的对象的元素路径，单独指定或者指定在数组中
>

## Return
`Array`
## Depend
```js
import baseAt from './.internal/baseAt.js'
import baseFlatten from './.internal/baseFlatten.js'
```
> [baseAt 源码分析](../internal/baseAt.md)
> <br/>
> <br/>
> [baseFlatten 源码分析](../internal/baseFlatten.md)
>

## Code
```js
const at = (object, ...paths) => baseAt(object, baseFlatten(paths, 1))
```

## Analyze
1. 对于 `paths` 调用 `baseFlatten` 方法进行扁平化处理，递归深度为 `1`
2. 调用 `baseAt` 方法来获取 基于 `paths` 的 `object` 值
## Remark
1. [剩余参数 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Rest_parameters) —— 允许我们将一个不定数量的参数表示为一个数组
## Example
```js
var object = { 'a': [{ 'b': { 'c': 3 } }, 4] }
 
at(object, ['a[0].b.c', 'a[1]']) // [3, 4]
at(object, 'a[0].b.c', 'a[1]') // [3, 4]
```
