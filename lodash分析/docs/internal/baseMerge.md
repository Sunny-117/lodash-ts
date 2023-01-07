# baseMerge 

## Description 
不支持多个源的`merge`的基本实现

merge 的解释
> 递归合并 sources 来源对象自身和继承的可枚举属性到 object 目标对象。如果目标值存在，被解析为 undefined 的 sources 来源对象属性将被跳过。数组和普通对象会递归合并，其他对象和值会被直接分配覆盖。源对象从从左到右分配。后续的来源对象属性会覆盖之前分配的属性。
>

## Params
`(object, source, srcIndex, customizer, stack)`
> {Object} object - 目标对象。
>
> {Object} source - 源对象。
>
> {number} srcIndex - “source”的索引。
>
> {Function} [customizer] - 自定义合并函数
>
> {Object} [stack] - Stack 实例，用来处理循环引用
>

## Depend
```js
import Stack from './Stack.js'
import assignMergeValue from './assignMergeValue.js'
import baseFor from './baseFor.js'
import baseMergeDeep from './baseMergeDeep.js'
import isObject from '../isObject.js'
import keysIn from '../keysIn.js'
```
> [Stack 源码分析](./stack.md)
> <br/>
> <br/>
> [assignMergeValue 源码分析](./assignMergeValue.md)
> <br/>
> <br/>
> [baseFor 源码分析](./baseFor.md)
> <br/>
> <br/>
> [baseMergeDeep 源码分析](./baseMergeDeep.md)
> <br/>
> <br/>
> [isObject 源码分析](../export/isObject.md)
> <br/>
> <br/>
> [keysIn 源码分析](../export/keysIn.md)

## Code
```js
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return
  }
  baseFor(source, (srcValue, key) => {
    if (isObject(srcValue)) {
      stack || (stack = new Stack)
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack)
    }
    else {
      let newValue = customizer
        ? customizer(object[key], srcValue, `${key}`, object, source, stack)
        : undefined

      if (newValue === undefined) {
        newValue = srcValue
      }
      assignMergeValue(object, key, newValue)
    }
  }, keysIn)
}
```
## Analyze
1. 如果 `object` 与 `source` 在严格相等模式下为 `ture`， 直接 `return`， 什么都不用做，对象的严格相等，指 二者引用地址相同
2. `baseFor` 它迭代由 `keysFunc` 返回的 `object` 属性，并为每个属性调用 `iteratee`

    所以这里 baseFor 可以看成这样
```js
// iteratee(iterable[key], key, iterable)
const iteratee = (srcValue, key) => {
 if (isObject(srcValue)) {
   stack || (stack = new Stack)
   baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack)
 }
 else {
   let newValue = customizer
     ? customizer(object[key], srcValue, `${key}`, object, source, stack)
     : undefined

   if (newValue === undefined) {
     newValue = srcValue
   }
   assignMergeValue(object, key, newValue)
 }
}

baseFor(source, iteratee, keysIn)
```

也就是说，对于 `source` 使用 `keysIn`（创建一个 `object` 自身 和 继承的可枚举属性名为数组） 方法获取 `key` 数组

3. 主要来看 每次迭代的函数
```js
 if (isObject(srcValue)) {
   stack || (stack = new Stack)
   baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack)
 }
```
首先，如果 当前 `srcValue` 为 `object` 类型(数组 `typeof` 也为 `object`)，会调用 `baseMergeDeep` 来进行合并，这里的 `mergeFuc` 传入的是 `baseMerge
` ， 也就是这里会产生递归调用

```js
 else {
   let newValue = customizer
     ? customizer(object[key], srcValue, `${key}`, object, source, stack)
     : undefined

   if (newValue === undefined) {
     newValue = srcValue
   }
   assignMergeValue(object, key, newValue)
 }
```
如果不是 `object` 类型，则进行基础类型的合并

如果传入了 自定义处理函数，则调用自定义处理函数，否则先定义 `newValue` 为 `undefined`

判断 如果 `newValue` 为 `undefined` （即使经过 `customizer` 处理，返回值也有可能为 `undefined` ），则将 `srcValue` 赋值给 `newValue`

调用 `assignMergeValue` 进行合并

4. 在 `baseFor` 完成后，也就完成了每个属性值的合并
## Remark
1. [typeof MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)
2. 对于引用类型值的处理，会产生递归处理，所以 stack 的作用为解决循环引用，具体见 [equalArrays](./equalArrays.md)
## Example
```js
const a = {a: {a_a: 1}, b: 2, c: [1,2,3]}
const b = {a: {a_b: 2}, b: {b_a: 1}, c: [4,5,6]}

baseMerge(a,b,undefined,undefined)
console.log(a) // { a: { a_a: 1, a_b: 2 }, b: { b_a: 1 }, c: [ 4, 5, 6 ] }
```
