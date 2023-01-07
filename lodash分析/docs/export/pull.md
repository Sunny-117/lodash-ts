# pull

## Description
移除数组 array 中所有和给定值相等的元素
## Params
`(array, ...values)`
## Return
`Array`
## Depend
```js
import pullAll from './pullAll.js'
```
> [pullAll 源码分析](./pullAll.md)
> 

## Code
```js
function pull(array, ...values) {
  return pullAll(array, values)
}
```
## Analyze
也就是调用 `pullAll` 方法，对于传入的参数，除第一个参数之外，将剩余参数组成了数组，传给了 `pullAll`
## Remark
1. [剩余参数 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Rest_parameters) 语法允许我们将一个不定数量的参数表示为一个数组。
## Example
```js
const array = ['a', 'b', 'c', 'a', 'b', 'c']
pull(array, 'a', 'c')
console.log(array) // => ['b', 'b']
```
