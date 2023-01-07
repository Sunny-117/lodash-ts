# take

## Description
创建一个数组切片，从 array 数组的起始元素开始提取 n 个元素

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
function take(array, n=1) {
  if (!(array != null && array.length)) {
    return []
  }
  return slice(array, 0, n < 0 ? 0 : n)
}
```

## Analyze
本质是通过 `slice` 进行截取得到结果，如果 n 小于 0 则 取 0

## Example
```js
console.log(take([1,2,3,4], 2)) // [ 1, 2 ]
```
