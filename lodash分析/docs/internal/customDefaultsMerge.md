# customDefaultsMerge

## Description
customDefaultsMerge 会被 defaultsDeep 使用， defaultsDeep 可以合并多个对象， customDefaultsDeep 只合并两个对象。
## Params
`(objValue, srcValue, key, object, source, stack)`

参数详见 [baseMerge](./baseMerge.md)
## Return
`{*}`
## Depend
```js
import baseMerge from './baseMerge.js'
import isObject from '../isObject.js'
```
> [baseMerge 源码分析](./baseMerge.md)
> <br/>
> <br/>
> [isObject 源码分析](../export/isObject.md)
> 

## Code
```js
function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
  if (isObject(objValue) && isObject(srcValue)) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, objValue)
    baseMerge(objValue, srcValue, undefined, customDefaultsMerge, stack)
    stack['delete'](srcValue)
  }
  return objValue
}
```
## Analyze
如果 `objValue` 和 `srcValue` 都是对象的话，就会调用 `baseMerge` 进行合并，否则会返回 `objValue`

这里使用 `stack` 是为了防止循环依赖的问题 [循环依赖](../other/CircularReferences.md)
## Remark
`customDefaultsMerge` 在这里是一个递归调用的函数，用来进行合并
## Example
```js
const a = {
  a: {
    b: {
      c: 1
    }
  }
}

const b = {
  a: 2,
  b: {
    c: 1
  }
}

const stack = new Map

console.log(customDefaultsMerge(a, b, undefined, null, null, stack)) 
// { a: { b: { c: 1 } }, b: { c: 1 } }
```
