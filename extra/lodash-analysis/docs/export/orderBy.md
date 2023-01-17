# orderBy 

## Description 
此方法类似于 sortBy，除了它允许指定 iteratee（迭代函数）结果如何排序。 如果没指定 orders（排序），所有值以升序排序。 否则，指定为 "desc" 降序，或者指定为 "asc" 升序，排序对应值。
## Params
`(collection, iteratees, orders)`
>  {Array|Object} collection - 要迭代的集合
>
> {Array[]|Function[]|Object[]|string[]} [iteratees=[identity]] - 要排序的迭代对象。
>
> {(string|function)[]} [orders] - ' iteratees '的排序顺序。
## Return
`Array`
## Depend
```js
import baseOrderBy from './.internal/baseOrderBy.js'
```
> [baseOrderBy 源码分析](../internal/baseOrderBy.md)
>

## Code
```js
function orderBy(collection, iteratees, orders) {
  if (collection == null) {
    return []
  }
  if (!Array.isArray(iteratees)) {
    iteratees = iteratees == null ? [] : [iteratees]
  }
  if (!Array.isArray(orders)) {
    orders = orders == null ? [] : [orders]
  }
  return baseOrderBy(collection, iteratees, orders)
}
```
## Analyze
1. 如果 `collection` 为 `null` 或者 `undefined` 则返回 空数组
2. 判断 `iteratees` 和 `orders` 是否为 `Array`， 如果不是 `Array`，则判断是否传入了，没有传入，则将其置为 空数组，否则 将其转为数组
3. 最终调用 `baseOrderBy` 进行排序并返回
## Remark
1. `orderBy` ，这里需要传入排序函数，否则结果可能和 [Array.prototype.sort()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) 结果不同
```js
orderBy([2,3,4,1,8,7]) // [ 7, 8, 1, 4, 3, 2 ]
[2,3,4,1,8,7].sort() // [1, 2, 3, 4, 7, 8]
```
当传入了比较函数，这里结果就正确了
```js
orderBy([2,3,4,1,8,7], undefined, (a,b) => a-b) // [1, 2, 3, 4, 7, 8]
```
2. 官方 `orderBy` 的例子，`iteratees` 传入的是 `['user', 'age']`，但是 这样传入会报错，在 `baseOrderBy` 中，`iteratee` 是以函数的形式存在
```js
 const criteria = iteratees.map((iteratee) => iteratee(value))
```
这里传入的 是单属性，所以不会做处理，导致运行到 `baseOrderBy` 这一行就会报错
```js
TypeError: iteratee is not a function
```

这里有可能是后续官方对于 `baseOrderBy` 有修改，但是没有修改 `orderBy` 的问题
## Example
```js
const users = [
  { 'user': 'fred',   'age': 48 },
  { 'user': 'barney', 'age': 34 },
  { 'user': 'fred',   'age': 40 },
  { 'user': 'barney', 'age': 36 }
]
orderBy(users, [['user'], ['age']], ['asc', 'desc'])

[
  { user: 'barney', age: 34 },
  { user: 'barney', age: 36 },
  { user: 'fred', age: 48 },
  { user: 'fred', age: 40 }
]
```
这里需要将单属性转为数组，在 `baseOrderBy` 中，会判断如果为 数组，会使用 `baseGet` 进行取值，这样才不会报错
