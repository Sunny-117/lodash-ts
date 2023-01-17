# baseOrderBy 

## Description 
没有参数保护的`orderBy`的基本实现。
## Params
`(collection, iteratees, orders)`
> {Array|Object} collection - 要遍历的集合
>
> {Function[]|Object[]|string[]} iteratees - 排序函数的集合
>
> {string[]} orders - 排序顺序
>

## Return
`Array`
## Depend
```js
import baseEach from './baseEach.js'
import baseSortBy from './baseSortBy.js'
import baseGet from './baseGet.js'
import compareMultiple from './compareMultiple.js'
import isArrayLike from '../isArrayLike.js'
```
> [baseEach 源码分析](./baseEach.md)
> <br/>
> <br/>
> [baseSortBy 源码分析](./baseSortBy.md)
> <br/>
> <br/>
> [baseGet 源码分析](./baseGet.md)
> <br/>
> <br/>
> [compareMultiple 源码分析](./compareMultiple.md)
> <br/>
> <br/>
> [isArrayLike 源码分析](../export/isArrayLike.md)

## Code
```js
const identity = (value) => value

function baseOrderBy(collection, iteratees, orders) {
  if (iteratees.length) {
    iteratees = iteratees.map((iteratee) => {
      if (Array.isArray(iteratee)) {
        return (value) => baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee)
      }

      return iteratee
    })
  } else {
    iteratees = [identity]
  }

  let criteriaIndex = -1
  let eachIndex = -1

  const result = isArrayLike(collection) ? new Array(collection.length) : []

  baseEach(collection, (value) => {
    const criteria = iteratees.map((iteratee) => iteratee(value))

    result[++eachIndex] = {
      criteria,
      index: ++criteriaIndex,
      value
    }
  })

  return baseSortBy(result, (object, other) => compareMultiple(object, other, orders))
}
```
## Analyze
1. 处理 `iteratees`
```js
  if (iteratees.length) {
    iteratees = iteratees.map((iteratee) => {
      if (Array.isArray(iteratee)) {
        return (value) => baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee)
      }

      return iteratee
    })
  } else {
    iteratees = [identity]
  }
```
如果 `iteratees` 为空数组，则使用默认的 `identity` 函数，返回 `value` 值本身

如果 `iteratees` 有长度，则进行 `map` 遍历，得到 合规化的结果

如果 `iteratee` 为 数组，则有可能为` ['a', 'b', 'c']` 这样的属性数组，则使用 `baseGet` 拿到对应的值

在 `baseGet` 时，iteratee 也有可能为 `['a.b.c']`, 所以，如果 `iteratee` `length` 为 1，直接取出即可

如果不是数组，则不需要处理，直接返回 `iteratee` 即可

2. 添加比较属性到 `collection` 上
```js
 let criteriaIndex = -1
  let eachIndex = -1

  const result = isArrayLike(collection) ? new Array(collection.length) : []

  baseEach(collection, (value) => {
    const criteria = iteratees.map((iteratee) => iteratee(value))

    result[++eachIndex] = {
      criteria,
      index: ++criteriaIndex,
      value
    }
  })
```
首先判断 `collection` 是否为类数组，如果是 则 `new` 一个长度一致的数组，否则定义一个空数组

然后 `baseEach` 进行遍历，使用 `iteratee` 函数对 每个 `value` 值进行处理，拿到所有比较维度的值，存入 `criteria` 中，同时扩展 `index` 属性
3. 最后使用 `baseSortBy` 进行排序，排序函数是 `compareMultiple`

`compareMultiple` 会根据 第二步生成的 `criteria` 进行排序
## Remark
1. `baseSortBy` 就类似于 [Array.prototype.sort()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) , 这里的排序函数就是 `compareMultiple` 的结果
## Example
```js
// 生成的 result
const users = [
  { 'user': 'fred',   'age': 48 },
  { 'user': 'barney', 'age': 34 },
  { 'user': 'fred',   'age': 40 },
  { 'user': 'barney', 'age': 36 }
]

baseOrderBy(users, [['user'], ['age']], ['asc', 'desc'])

result = [
           {
             criteria: [ 'fred', 48 ],
             index: 0,
             value: { user: 'fred', age: 48 }
           },
           {
             criteria: [ 'barney', 34 ],
             index: 1,
             value: { user: 'barney', age: 34 }
           },
           {
             criteria: [ 'fred', 40 ],
             index: 2,
             value: { user: 'fred', age: 40 }
           },
           {
             criteria: [ 'barney', 36 ],
             index: 3,
             value: { user: 'barney', age: 36 }
           }
         ]
// 排序结果
[
  { user: 'barney', age: 34 },
  { user: 'barney', age: 36 },
  { user: 'fred', age: 48 },
  { user: 'fred', age: 40 }
]
```
