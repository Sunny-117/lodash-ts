# basePick 

## Description 
pick的基本实现，不支持单个属性标识符。

### pick
> 创建一个从 object 中选中的属性的对象。

## Params
`(object, paths)`
> {Object} object - 源对象
>
> {string[]} paths - 属性路径数组
>

## Return
`Object`
## Depend
```js
import basePickBy from './basePickBy.js'
import hasIn from '../hasIn.js'
```
> [basePickBy 源码分析](./basePickBy.md)
> <br/>
> <br/>
> [hasIn 源码分析](../export/hasIn.md)

## Code
```js
function basePick(object, paths) {
  return basePickBy(object, paths, (value, path) => hasIn(object, path))
}
```
## Analyze
本质就是调用 `basePickBy` 方法进行处理，这里传入的 `predicate` 函数其实是 `hasIn` 函数，用来 检查 `path` 是否是 `object` 对象的直接或继承属性。

## Remark
`basePickBy` 会使用 `baseGet` ，即使取不到值也会返回 `undefined`，所以这使用 `hasIn` 进行了判断
## Example
```js
const a = {
  a: 1,
  b: 2,
  c: [1,2,],
  d: {
    e: 4
  }
}

console.log(basePick(a, ['c', 'd'])) // { c: [ 1, 2 ], d: { e: 4 } }
```
