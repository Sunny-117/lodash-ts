# range

## Description
创建一个包含从 start 到 end，但不包含 end 本身范围数字的数组。 如果 start 是负数，而 end 或 step 没有指定，那么 step 从 -1 为开始。 如果 end 没有指定，start 设置为 0。 如果 end 小于 start ，会创建一个空数组，除非指定了 step。
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
const range = createRange()
```
## Analyze
也就是通过 `createRange` 创建了一个生成数组的函数
## Remark
step如果不传入，默认值为 1 或者 -1，具体可查看 [createRange](../internal/createRange.md)
## Example
```js
console.log(range(9)) // [ 0, 1, 2, 3, 4, 5, 6, 7, 8]
console.log(range(9, 0)) // [ 9, 8, 7, 6, 5, 4, 3, 2, 1]
console.log(range(1, 10, 3)) // [ 1, 4, 7]
```
