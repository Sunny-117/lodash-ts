# zip

## Description
创建一个分组元素的数组，数组的第一个元素包含所有给定数组的第一个元素，数组的第二个元素包含所有给定数组的第二个元素，以此类推。

## Params
`...Array`

## Return
`Array`

## Depend
```js
import unzip from './unzip.js'
```
> [unzip 源码分析](./unzip.md)

## Code
```js
function zip(...arrays) {
  return unzip(arrays)
}
```

## Analyze
通过 剩余参数将传入的数组组成一个二维数组，传递给了 `unzip`

## Example
```js
console.log(zip([1,2,3], [4,5,6], [7,8,9])) // [ [ 1, 4, 7 ], [ 2, 5, 8 ], [ 3, 6, 9 ] ]
```
