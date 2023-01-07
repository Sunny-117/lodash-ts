# clone 

## Description 
创建一个 value 的浅拷贝

这个方法参考自 [structured clone algorithm](https://developer.mozilla.org/zh-CN/docs/Web/Guide/API/DOM/The_structured_clone_algorithm) 以及支持 arrays、array buffers、 booleans、 date objects、maps、 numbers， Object 对象，regexes, sets, strings, symbols, 以及 typed arrays。 arguments 对象的可枚举属性会拷贝为普通对象。 一些不可拷贝的对象，例如 error objects、functions, DOM nodes, 以及 WeakMaps 会返回空对象。
## Params
`value`
## Return
`{*}` -- 拷贝的结果
## Depend
```js
import baseClone from './.internal/baseClone.js'
```
> [baseClone 源码分析](../internal/baseClone.md)
>

## Code
```js
const CLONE_SYMBOLS_FLAG = 4
function clone(value) {
  return baseClone(value, CLONE_SYMBOLS_FLAG)
}
```
## Analyze
调用 `baseClone` 进行拷贝，并返回结果，这里传入的 `bitmask` 为 4， 表示会拷贝 `symbol`
## Remark
1. [结构化克隆算法 MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/API/DOM/The_structured_clone_algorithm)
## Example
```js
const objects = [{ 'a': 1 }, { 'b': 2 }]

const shallow = clone(objects)
console.log(shallow[0] === objects[0]) // => true
```
