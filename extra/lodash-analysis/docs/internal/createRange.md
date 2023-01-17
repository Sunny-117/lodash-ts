# createRange

## Description
创建一个`range`或`rangeRight`函数。
## Params
`(fromRight)`
## Return
`Function`
## Depend
```js
import baseRange from './baseRange.js'
import toFinite from '../toFinite.js'
```
> [baseRange 源码分析](./baseRange.md)
> <br/>
> <br/>
> [toFinite 源码分析](../export/toFinite.md)
> 

## Code
```js
function createRange(fromRight) {
  return (start, end, step) => {
    // Ensure the sign of `-0` is preserved.
    start = toFinite(start)
    if (end === undefined) {
      end = start
      start = 0
    } else {
      end = toFinite(end)
    }
    step = step === undefined ? (start < end ? 1 : -1) : toFinite(step)
    return baseRange(start, end, step, fromRight)
  }
}
```
## Analyze
1. 最终返回的是一个函数，会做一些参数合规化的处理
2. 首先通过 `toFinite` 将 `start` 转为一个有限数字，会保留 `-0` 的符号
3. 如果 `end` 没有传入，则将 `start` 的值赋值给 `end`， 将 `start` 置为 0，此时数组范围为 `0 - start`
4. 如果传入了 `end` ，同样的转为一个有限数字
5. `step` 如果没有传入，会做判断， `start < end` 的话为 `1`， 否则为 `-1`，这里是做递增和递减
6. 如果传入了同样转为有限数字
7. 最终调用 `baseRange` 生成数组，如果传入了 `fromRight` 则 **从右到左** 生成
## Remark
在 js 中 `0 === -0` 为 `true` ，这里通过 `toFinite` 转换时，会保留 `-0` 的符号位，便于后续处理
## Example
```js
const func = createRange()

console.log(func(9)) // [ 0, 1, 2, 3, 4, 5, 6, 7, 8]
console.log(func(9, 0)) // [ 9, 8, 7, 6, 5, 4, 3, 2, 1]
console.log(func(1, 10, 3)) // [ 1, 4, 7]
```
