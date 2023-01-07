# flowRight

## Description
这个方法类似 [flow](./flow.md)，除了它调用函数的顺序是从右往左的。
## Params
`funcs`
## Return
`Function`
## Depend
```js
import flow from './flow.js'
```
> [flow 源码分析](./flow.md)
> 

## Code
```js
function flowRight(...funcs) {
  return flow(...funcs.reverse())
}
```
## Analyze
就是 调用 `flow` 实现，但是对于传入的 `funcs` 数组，进行了翻转操作，也就达到了 从右到左的调用
## Remark
1. [Array.prototype.reverse() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse) 方法将数组中元素的位置颠倒，并返回该数组。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。该方法会改变原数组。

## Example
```js
const add = ([a, b]) => a + b
const test = ([x, y]) => [x * y, y]

const temp = flowRight(add, test, test, test, test)

console.log(temp([1, 2])) // 18
```
