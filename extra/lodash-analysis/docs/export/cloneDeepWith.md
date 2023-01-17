# cloneDeepWith 

## Description 
这个方法类似 [cloneWith](./cloneWith.md)，除了它会递归拷贝 value。
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
const CLONE_DEEP_FLAG = 1
const CLONE_SYMBOLS_FLAG = 4

function cloneDeepWith(value, customizer) {
  customizer = typeof customizer === 'function' ? customizer : undefined
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer)
}
```
## Analyze
1. 判断了传入的 `customizer` 是否为 `function`，如果是 `function` ，则使用 传入的 `customizer` ，否则就定义为 `undefined`，使用 `baseClone` 的逻辑
2. 这里和 `cloneDeep` 一致，也是 深拷贝 和 拷贝 symbol （4 | 1）
```js
4 | 1 // 0100 | 0001 => 5
```
## Remark
1. [| (按位或) MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#%E6%8C%89%E4%BD%8D%E6%88%96)
## Example
```js
function customizer(value) {
  if (isElement(value)) {
    return value.cloneNode(true)
  }
}

const el = cloneDeepWith(document.body, customizer)

console.log(el === document.body) // => false
console.log(el.nodeName) // => 'BODY'
console.log(el.childNodes.length) // => 20
```
