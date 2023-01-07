# baseSortedUniq

## Description
baseSortedUniq 是用来实现 sortedUniq 和 sortedUniqBy 的内部方法，它的作用和 uniq 函数的作用差不多，传入一个数组 array ，然后返回这个数组去重后的结果。

但是 baseSortedUniq 和 uniq 不同的是，baseSortedUniq 只接受已经排好序的数组。

## Params
`(array, iteratee)`
## Return
`Array`
## Depend
```js
import eq from '../eq.js'
```
> [eq 源码分析](../export/eq.md)
> 

## Code
```js
function baseSortedUniq(array, iteratee) {
  let seen
  let index = -1
  let resIndex = 0

  const { length } = array
  const result = []

  while (++index < length) {
    const value = array[index], computed = iteratee ? iteratee(value) : value
    if (!index || !eq(computed, seen)) {
      seen = computed
      result[resIndex++] = value === 0 ? 0 : value
    }
  }
  return result
}
```
## Analyze
1. 首先传入的数组为排好序的，所以只需要和上一次的值进行对比即可
2. 定义 `seen` 缓存上一次的值，拿到 `length` 等
3. `while` 循环，拿到当前值 `value` ，会根据 是否传入 `iteratee` 函数来判断要不要处理 `value`
4. `!index` 为第一次循环，`!eq(computed, seen)` 判断和上一次的值是否相等，这里加 `!index` 是为了处理第一次值就是 `undefined` 的情况，如果不加 `!index` 第一次值为 `undefined`， `eq` 判断不过，是不会加入到结果数组的
5. 在结果数组中，会将 `+0` 和 `-0` 都转为 `0` 存进去
## Remark
在严格相等(===)中，两个值分别为 +0 和 -0 时，两个值被认为是全等的。
## Example
```js
console.log(baseSortedUniq([1,1,2,2,2,2,3,4,5,6,6,6])) // [ 1, 2, 3, 4, 5, 6 ]
```
