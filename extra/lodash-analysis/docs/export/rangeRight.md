# rangeRight

## Description
这个方法类似 [range](./range.md) ， 除了它是降序生成值的。
## Params
`(start, end, step)`
## Return
`Array`
## Depend
```js
import createRange from './.internal/createRange.js'
```
> [createRange 源码分析](../internal/createRange.md)
>

## Code
```js
const rangeRight = createRange(true)
```
## Analyze
和 [range](./range.md) 基本一致，除了生成顺序从右到左之外

## Example
```js
console.log(rangeRight(0,10,2)) // [ 8, 6, 4, 2, 0 ]
console.log(rangeRight(10)) // [ 9, 8, 7, 6, 5, 4, 3, 2, 1, 0 ]
```
