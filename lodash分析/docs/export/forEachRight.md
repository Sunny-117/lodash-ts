# forEachRight

## Description
这个方法类似 [forEach](./forEach.md)，不同之处在于，forEachRight 是从右到左遍历集合中每一个元素的。
## Params
`(collection, iteratee)`
## Return
`{Array|Object}`
## Depend
```js
import arrayEachRight from './.internal/arrayEachRight.js'
import baseEachRight from './.internal/baseEachRight.js'
```
> [arrayEachRight 源码分析](../internal/arrayEachRight.md)
> <br/>
> <br/>
> [baseEachRight 源码分析](../internal/baseEachRight.md)

## Code
```js
function forEachRight(collection, iteratee) {
  const func = Array.isArray(collection) ? arrayEachRight : baseEachRight
  return func(collection, iteratee)
}
```
## Analyze
和 [forEach](./forEach.md) 基本一致，除了调用方法不同之外

## Example
```js
console.log(forEachRight([1,2,3,4,5], (v, i, arr) => arr[i] = ++v)) // [ 2, 3, 4, 5, 6 ]
```
