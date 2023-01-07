# initial

## Description
获取数组 array 中除了最后一个元素之外的所有元素（注：去除数组 array 中的最后一个元素）。

## Params
`array`

## Return
`Array`

## Depend
```js
import slice from './slice.js'
```
> [slice 源码分析](./slice.md)
> 

## Code
```js
function initial(array) {
  const length = array == null ? 0 : array.length
  return length ? slice(array, 0, -1) : []
}
```

## Analyze
判断了 `length` 的合法性，如果 `length` 有值，且大于 0， 则使用  `slice(array, 0, -1)` 裁剪后返回，否则返回空数组

`slice` 第三个参数传 -1， 表示从后往前数1位，也就达到了函数要求

## Example
```js
console.log(initial([1,2,3,4,5])) // [ 1, 2, 3, 4 ]
```
