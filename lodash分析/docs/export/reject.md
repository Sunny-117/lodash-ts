# reject

## Description
reject 可以看作是 filter 的反操作。filter 会将 predicate 返回真值时的元素筛选出来，但是 reject 刚好想反，会将 predicate 返回假值时的元素筛选出来。

## Params
`(collection, predicate)`

## Return
`Array`

## Depend
```js
import filter from './filter.js'
import filterObject from './filterObject.js'
import negate from './negate.js'
```
> [filter 源码分析](./filter.md)
> <br/>
> <br/>
> [filterObject 源码分析](./filterObject.md)
> <br/>
> <br/>
> [negate 源码分析](./negate.md)

## Code
```js
function reject(collection, predicate) {
  const func = Array.isArray(collection) ? filter : filterObject
  return func(collection, negate(predicate))
}
```

## Analyze
首先 判断 是否为 `Array`， 如果是 数组，则使用 `filter` ， 否则使用 `filterObject` 作为遍历方法

在遍历时，使用 `negate` 对于 `predicate` 的结果取反，得到了要求中的，返回假值的数组

## Example
```js
console.log(reject([1,2,3,4,5], (v) => v&1)) // [ 2, 4 ]
console.log([1,2,3,4,5].filter((v) => !(v&1))) // [ 2, 4 ]
```
