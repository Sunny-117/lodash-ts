# cloneDeep 

## Description 
这个方法类似 [clone](./clone.md) ，除了它会递归拷贝 value。（注：也叫深拷贝）
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
const CLONE_DEEP_FLAG = 1
const CLONE_SYMBOLS_FLAG = 4

function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG)
}
```
## Analyze
调用 `baseClone` 进行拷贝，并返回结果，这里传入的 `bitmask` 为 4 | 1， 表示深拷贝和拷贝 `symbol`
```js
4 | 1 // 0100 | 0001 => 5
```
## Remark
1. [| (按位或) MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#%E6%8C%89%E4%BD%8D%E6%88%96)
## Example
```js
const objects = [{ 'a': 1 }, { 'b': 2 }]

const deep = cloneDeep(objects)
console.log(deep[0] === objects[0]) // => false
```
