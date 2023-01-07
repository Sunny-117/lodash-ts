# sumBy

## Description
这个方法类似 [sum](./sum.md) 除了它接受 iteratee 来调用 array 中的每一个元素，来生成其值排序的标准。 iteratee 会调用 1 个参数: (value) 。
## Params
`(array, iteratee)`
## Return
`number`
## Depend
```js
import baseSum from './.internal/baseSum.js'
```
> [baseSum 源码分析](../internal/baseSum.md)
> 

## Code
```js
function sumBy(array, iteratee) {
  return (array != null && array.length)
    ? baseSum(array, iteratee)
    : 0
}
```
## Analyze
和 [sum](./sum.md) 基本一致，除了 iteratee 是自定义的之外

## Example
```js
const a = [
  {v: 1},
  {v: 2},
  {v: 3},
  {v: 4},
  {v: 5}
]

console.log(sumBy(a, ({v}) => v)) // 15
```
