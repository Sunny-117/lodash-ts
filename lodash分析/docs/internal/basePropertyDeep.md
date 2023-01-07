# basePropertyDeep 

## Description 
支持深层路径的 [baseProperty](./baseProperty.md) 的专用版本。
## Params
`(path)`
## Return
`Function`
## Depend
```js
import baseGet from './baseGet.js'
```
> [baseGet 源码分析](./baseGet.md)
>

## Code
```js
function basePropertyDeep(path) {
  return (object) => baseGet(object, path)
}
```
## Analyze
和 `baseProperty` 基本一致，不同在于，这里会使用 `baseGet` 进行深度路径的值的获取，没有找到时，也会返回 `undefined`
## Remark

[^_^]: 实在是不知道写什么了
 
1. [箭头函数 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
## Example
```js
const func = basePropertyDeep('a.b.c')

console.log(func()) // undefined
console.log(func({a:{b: 1}})) // undefined
console.log(func({a:{b: {c: 1}}})) // 1
```
