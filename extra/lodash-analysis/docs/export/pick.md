# pick 

## Description 
创建一个从 object 中选中的属性的对象。
## Params
`(object, ...paths)`
> {...(string|string[])} [paths] 属性路径选择。
>

## Return
`Object`
## Depend
```js
import basePick from './.internal/basePick.js'
```
> [basePick 源码分析](../internal/basePick.md)
>

## Code
```js
function pick(object, ...paths) {
  return object == null ? {} : basePick(object, paths)
}
```
## Analyze
判断如果没有传入 `object` 或者 `object` 为 `null` 则返回空对象，否则调用 `basePick` 进行处理
## Remark
1. [剩余参数 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Rest_parameters) 语法允许我们将一个不定数量的参数表示为一个数组。
## Example
```js
const a = {
  a: 1,
  b: 2,
  c: 3
}

console.log(pick(a, 'a', 'c')) // { a: 1, c: 3 }
```
