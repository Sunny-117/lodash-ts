# findLast

## Description
从右往左找到第一个符合条件的值
## Params
`(collection, predicate, fromIndex)`
## Return
`{*}`
## Depend
```js
import findLastIndex from './findLastIndex.js'
import isArrayLike from './isArrayLike.js'
```
> [findLastIndex 源码分析](./findLastIndex.md)
> <br/>
> <br/>
> [isArrayLike 源码分析](./isArrayLike.md)

## Code
```js
function findLast(collection, predicate, fromIndex) {
  let iteratee
  const iterable = Object(collection)
  if (!isArrayLike(collection)) {
    collection = Object.keys(collection)
    iteratee = predicate
    predicate = (key) => iteratee(iterable[key], key, iterable)
  }
  const index = findLastIndex(collection, predicate, fromIndex)
  return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined
}
```
## Analyze
1. 定义了暂存对象 `iterable`
2. 判断了 传入的 `collection` 是否为类数组，如果是则进行了 `predicate` 和 `iteratee` 的重新定义
    - 将 `collection` 定义为 `Object.keys(collection)`
    - `iteratee` 赋值为 `predicate`，暂存
    - `predicate` 这里重新修改为 `(value, key, array)` 模式
3. 使用 `findLastIndex` 拿到最后一个符合的 `index`
4. 如果 `index` 不是 -1，则判断 `iteratee` 是否存在，如果存在表示 `collection` 为一个类数组， 则取 `collection[index]`， 否则取 `index`

## Example
```js
console.log(findLast({a:{v: 1},b:{v: 2},c:{v:3},d:{v:4}}, ({v}) => v < 3)) // { v: 2 }
console.log(findLast([1,2,3,4], (v) => v < 3)) // 2
```
