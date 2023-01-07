# merge 

## Description 
该方法类 assign， 除了它递归合并 sources 来源对象自身和继承的可枚举属性到 object 目标对象。如果目标值存在，被解析为 undefined 的 sources 来源对象属性将被跳过。数组和普通对象会递归合并，其他对象和值会被直接分配覆盖。源对象从从左到右分配。后续的来源对象属性会覆盖之前分配的属性。

Note: 这方法会改变对象 object.
## Params
`(object, ...sources)`
> {Object} object 目标对象.
>
> {...Object} [sources] 源对象
>

## Return
`Object`
## Depend
```js
import baseMerge from './.internal/baseMerge.js'
import createAssigner from './.internal/createAssigner.js'
```
> [baseMerge 源码分析](../internal/baseMerge.md)
> <br/>
> <br/>
> [createAssigner 源码分析](../internal/createAssigner.md)
>

## Code
```js
const merge = createAssigner((object, source, srcIndex) => {
  baseMerge(object, source, srcIndex)
})
```
## Analyze
调用 createAssigner 函数，创建了一个 merge 函数返回

```js
(object, source, srcIndex) => {
  baseMerge(object, source, srcIndex)
}
```
这里是使用箭头函数，将 baseMerge 作为值合并的函数传入

## Remark
1. [Object.assign() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。
## Example
```js
const object = {
  'a': [{ 'b': 2 }, { 'd': 4 }]
}

const other = {
  'a': [{ 'c': 3 }, { 'e': 5 }]
}

merge(object, other)
// => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }

```
