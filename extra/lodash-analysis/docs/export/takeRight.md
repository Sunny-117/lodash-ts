# takeRight

## Description
创建一个数组切片，从 array 数组的最后一个元素开始提取 n 个元素

## Params
`(array, n=1)`

## Return
`Array`

## Depend
```js
import slice from './slice.js'
```
> [slice 源码分析](./slice.md)

## Code
```js
function takeRight(array, n=1) {
  const length = array == null ? 0 : array.length
  if (!length) {
    return []
  }
  n = length - n
  return slice(array, n < 0 ? 0 : n, length)
}
```

## Analyze
本质是通过 `slice` 进行截取，从 n 开始，到 `length` 结束， n 会做处理，使用 `length - n` 得到新的值，并且会判断，如果小于0 则 取 0

## Example
```js
console.log(takeRight([1,2,3,4,5,6], 2)) // [ 5, 6 ]
```
