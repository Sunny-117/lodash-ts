# pullAllWith

## Description
这个方法类似于 [pullAll](./pullAll.md)，区别是这个方法接受 comparator 调用 array 中的元素和 values 比较。comparator 会传入两个参数：(arrVal, othVal)。
## Params
`(array, values, comparator)`
## Return
`Array`
## Depend
```js
import basePullAll from './.internal/basePullAll.js'
```
> [basePullAll 源码分析](../internal/basePullAll.md)
> 

## Code
```js
function pullAllWith(array, values, comparator) {
  return (array != null && array.length && values != null && values.length)
    ? basePullAll(array, values, undefined, comparator)
    : array
}
```
## Analyze
整体处理逻辑可 [pullAll](./pullAll.md) 一致，只不过多了将 `comparator` 传递

basePullAll 四个参数，最后一个 为 `comparator` ，这里不需要 `iteratee`， 所以传 `undefined` 即可

## Example
```js
const a = [1,2,3,4,5,6,7]

pullAllWith(a, [2,3,4,5,6], (arrVal, othVal) => arrVal + 1 === othVal)

console.log(a) // [6, 7]
```
