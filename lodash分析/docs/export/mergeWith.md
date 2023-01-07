# mergeWith 

## Description 
该方法类似 merge，除了它接受一个 customizer，调用以产生目标对象和来源对象属性的合并值。如果 customizer 返回 undefined，将会由合并处理方法代替。customizer 调用与 7 个参数：(objValue, srcValue, key, object, source, stack)。

Note: 这方法会改变对象 object.
## Params
`(object, ...sources, customizer)`
> {Object} object 目标对象.
>
> {...Object} [sources] 源对象
>
> {Function} customizer - 自定义合并函数
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
const mergeWith = createAssigner((object, source, srcIndex, customizer) => {
  baseMerge(object, source, srcIndex, customizer)
})
```
## Analyze
这里处理逻辑基本和 [merge](./merge.md) 一致，除了会传入 customizer 函数之外
## Remark
1. [Object.assign() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) 方法用于将所有可枚举属性的值从一个或多个源对象分配到目标对象。它将返回目标对象。

## Example
```js
 function customizer(objValue, srcValue) {
   if (Array.isArray(objValue)) {
     return objValue.concat(srcValue)
   }
 }

 const object = { 'a': [1], 'b': [2] }
 const other = { 'a': [3], 'b': [4] }

 mergeWith(object, other, customizer)
 // => { 'a': [1, 3], 'b': [2, 4] }
```
