# cloneWith 

## Description 
这个方法类似 [clone](./clone.md)，除了它接受一个 customizer 定制返回的克隆值。 如果 customizer 返回 undefined 将会使用拷贝方法代替处理。 customizer 调用 4 个参数： (value \[, index|key, object, stack])。
## Params
`(value, customizer)`
> customizer -- 拷贝的方法
>

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

function cloneWith(value, customizer) {
  customizer = typeof customizer === 'function' ? customizer : undefined
  return baseClone(value, CLONE_SYMBOLS_FLAG, customizer)
}
```
## Analyze
1. 判断了传入的 `customizer` 是否为 `function`，如果是 `function` ，则使用 传入的 `customizer` ，否则就定义为 `undefined`，使用 `baseClone` 的逻辑
2. 调用`baseClone`这里传入的 `bitmask` 为 4， 表示会拷贝 `symbol`
## Remark
和 clone 一样 借鉴了 [结构化克隆算法 MDN](https://developer.mozilla.org/zh-CN/docs/Web/Guide/API/DOM/The_structured_clone_algorithm) 以及支持 arrays、array buffers、 booleans、 date objects、maps、 numbers， Object 对象，regexes, sets, strings, symbols, 以及 typed arrays。 arguments 对象的可枚举属性会拷贝为普通对象。 一些不可拷贝的对象，例如 error objects、functions, DOM nodes, 以及 WeakMaps 会返回空对象
## Example
```js
function customizer(value) {
  if (_.isElement(value)) {
    return value.cloneNode(false);
  }
}
 
var el = _.cloneWith(document.body, customizer);
 
console.log(el === document.body); // => false
console.log(el.nodeName); // => 'BODY'
console.log(el.childNodes.length); // => 0
```
