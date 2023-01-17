# defaultsDeep

## Description
这个方法类似 [defaults](./defaults.md)，除了它会递归分配默认属性。
## Params
`(...args)`
## Return
`Object`
## Depend
```js
import customDefaultsMerge from './.internal/customDefaultsMerge.js'
import mergeWith from './mergeWith.js'
```
> [customDefaultsMerge 源码分析](../internal/customDefaultsMerge.md)
> <br/>
> <br/>
> [mergeWith 源码分析](./mergeWith.md)
> 

## Code
```js
function defaultsDeep(...args) {
  args.push(undefined, customDefaultsMerge)
  return mergeWith.apply(undefined, args)
}
```
## Analyze
过程类似于 `merge` ，但是只有在属性值为 `undefined` 或者 没有对应的属性时，才会合并

所以这里调用 `mergeWith` ，本质是调用 `baseMerge` ，使用了自定义合并函数 `customDefaultsMerge`

这里 `args` `push` `undefined` 是为了参数合法化，具体可以查看 `customDefaultsMerge` 参数和 `mergeWith` 所需要的参数

## Remark
1. [Function.prototype.apply() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
## Example
```js
 defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } }) // => { 'a': { 'b': 2, 'c': 3 } }
```
