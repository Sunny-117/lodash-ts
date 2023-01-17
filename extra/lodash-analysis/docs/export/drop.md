# drop

## Description
创建一个切片数组，去除 array 前面的 n 个元素。（n 默认值为 1。）
## Params
`(array, n=1)`
## Return
`Array`
## Depend
```js
import slice from './slice.js'
import toInteger from './toInteger.js'
```
> [slice 源码分析](./slice.md)
> <br/>
> <br/>
> [toInteger 源码分析](./toInteger.md)
> 

## Code
```js
function drop(array, n=1) {
  const length = array == null ? 0 : array.length
  return length
    ? slice(array, n < 0 ? 0 : toInteger(n), length)
    : []
}
```
## Analyze
其实本质就是调用 `slice` 进行了数组裁剪，这不过这里会做一些参数合法性的判断

首先如果传入的数组没有 `length` 或者传入的 `array` 为 `null` 或者 `undefined` ，直接返回 空数组

然后在裁剪时也做了参数 `n` 的判断， `n` 如果小于0，取0，否则将 `n` 转换为一个整数，然后裁剪

## Example
```js
console.log(drop([1,2,3,4,5], 6)) // []
console.log(drop([1,2,3,4,5], 2)) // []
```
