# createSet

## Description
createSet 是一个用来将 array 转换为 set 的函数。
## Params
`Array`
## Return
`Object`
## Depend
```js
import setToArray from './setToArray.js'
```
> [setToArray 源码分析](./setToArray.md)
> 

## Code
```js
const INFINITY = 1 / 0

const createSet = (Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY)
  ? (values) => new Set(values)
  : () => {}
```
## Analyze
其实本质就是可以使用 Set 时，返回 set，否则就是空函数

比较难的点在于 `(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY)` 的判断

Set 就是判断是否可以使用 Set 对象，没有问题

后面的 `1 / setToArray(new Set([,-0]))[1]) == INFINITY`

主要是为了浏览器兼容性，正常情况下， Set 中 +0 和 -0 是相等的，但是在 IE 中是区分的，所以 如果是 IE 浏览器也会返回 空函数
## Remark
1. [Set MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)

   因为 Set 中的值总是唯一的，所以需要判断两个值是否相等。在 ECMAScript 规范的早期版本中，这不是基于和 === 操作符中使用的算法相同的算法。具体来说，对于 Set s， +0 （+0 严格相等于 - 0）和 - 0 是不同的值。然而，在 ECMAScript 2015 规范中这点已被更改。

   `Key equality for -0 and 0` 这一点，在 IE 中是不支持的
## Example
```js
console.log(createSet([1,2,3,4,5])) // Set { 1, 2, 3, 4, 5 }
```
