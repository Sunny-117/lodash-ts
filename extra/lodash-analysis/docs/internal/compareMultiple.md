# compareMultiple 

## Description 
由orderBy用来将一个值的多个属性与另一个进行比较，并对其进行稳定排序。
如果未指定orders，则所有值均按升序排序。否则，请为相应值的降序指定 `desc` 的顺序，或为升序指定 `asc` 的顺序。
## Params
`(object, other, orders)`
> {(string|function)[]} orders - 可以指定多个维度的对比，为数组

```js
const a = [
    {type: 10, name: 'Java'},
    {type: 20, name: 'JavaScript'},
    {type: 5, name: 'python'},
]
```

这个时候就可以根据 type 和 name 进行排序，多个维度

## Return
`number`
## Depend
```js
import compareAscending from './compareAscending.js'
```
> [compareAscending 源码分析](./compareAscending.md)
>

## Code
```js
function compareMultiple(object, other, orders) {
  let index = -1
  const objCriteria = object.criteria
  const othCriteria = other.criteria
  const length = objCriteria.length
  const ordersLength = orders.length

  while (++index < length) {
    const order = index < ordersLength ? orders[index] : null
    const cmpFn = (order && typeof order === 'function') ? order: compareAscending
    const result = cmpFn(objCriteria[index], othCriteria[index])
    if (result) {
      if (order && typeof order !== 'function') {
        return result * (order == 'desc' ? -1 : 1)
      }
      return result
    }
  }
  // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
  // that causes it, under certain circumstances, to provide the same value for
  // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
  // for more details.
  //
  // This also ensures a stable sort in V8 and other engines.
  // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
  return object.index - other.index
}
```
## Analyze
1. 首先获取到 `object` 和 `other` 的 `criteria` 的值，拿到 `objCriteria` 和 `orders` 的 `length`
2. `while` 循环进行排序，条件是 `objCriteria` 的 `length > index`
3. 首先拿到每一个 `order` ，根据 `orders` `length` 是否大于 当前迭代的下标，满足条件取对应的 `order`， 否则为 `null`
4. 每个维度都有自己的 `cmpFn` 函数，用来比较排序，如果 `order` 不存在，或者 `order` 不是 `function`，则使用默认的 `compareAscending` 来进行比较
5. 调用 `cmpFn` 拿到比较的结果
6. 如果 `result` 不为 0，判断 `order` 如果不是 `function` ，则判断升序或降序，如果 `order` 为 `desc` ，则降序排列，乘以 `-1 取反`
7. 如果 `while` 循环完成后，都没有得到结果，或者结果为0，则使用 `object.index - other.index`，如果直接返回 `undefined`，在 V8 中不能确保稳定排序，则使用 `object.index - other.index` ，这个 `index` 属性，是 `baseOrderBy` 在调用时，会生成的，这里会返回 `0`
## Remark
1. compareMultiple 为lodash 内部使用的方法，所以对于 criteria 和 index 属性是会从调用的地方传入的， compareMultiple 函数 如果不传入这些，结果和预期就会有差，甚至有可能会报错
2. 整个 orderBy 排序，最终会使用到 [Array.prototype.sort()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) 来进行排序修改
## Example
```js
console.log(compareMultiple({a:1, criteria: ['a'], index: 0}, {a:1, criteria: ['a'],index: 0}, ['desc'])) // 0
```
