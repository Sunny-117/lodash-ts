# pullAllBy

## Description
这个方法类似于 [pullAll](./pullAll.md) ，区别是这个方法接受一个 iteratee（迭代函数） 调用 array 和 values 的每个值以产生一个值，通过产生的值进行了比较。iteratee 会传入一个参数： (value)。
## Params
`(array, values, iteratee)`
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
function pullAllBy(array, values, iteratee) {
  return (array != null && array.length && values != null && values.length)
    ? basePullAll(array, values, iteratee)
    : array
}
```
## Analyze
整体处理逻辑可 [pullAll](./pullAll.md) 一致，只不过多了将 `iteratee` 传递

## Example
```js
const a = [1,2,3,4,5,6,7]

pullAllBy(a, [-1,-2,-3,-4], Math.abs)

console.log(a) // [5, 6, 7]
```
