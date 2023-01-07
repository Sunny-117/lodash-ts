# castSlice 

## Description 
如果需要，将 `array` 转换为切片。基本上就是调用 `lodash slice` ，不同的是，不会返回空数组，而是会返回原数组

## Params
`(array, start, end)`
> {Array} array: 要裁剪数组
>
> {Number} start: 起始位置
>
> {Number} end： 结束位置
>
## Return
`Array` -- 裁剪部分的新数组

## Depend
```js
import slice from '../slice.js'
```
> [slice 源码分析](../export/slice.md)


## Code
```js
function castSlice(array, start, end) {
  const { length } = array
  end = end === undefined ? length : end
  return (!start && end >= length) ? array : slice(array, start, end)
}
```

## Analyze
1. 首先获取传入 `array` 的 `length`
2. 对 `end` 参数进行判断，没有传入的情况下，默认取 `length`
3. 判断如果没有传入 `start` 或者传入 `0`, 并且 `end >= length` 时， 直接返回原数组， 否则调用 `slice` 进行切片
## Remark
1. [运算符优先级 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#table)
2. [逻辑与(&&) MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_Operators#%E9%80%BB%E8%BE%91%E4%B8%8E%EF%BC%88%EF%BC%89)
## Example
```js
var arr = [1,2,3,4]

castSlice(arr) // [ 1, 2, 3, 4 ]
castSlice(arr, 0, 4) // [ 1, 2, 3, 4 ]
castSlice(arr, 0, 3) // [ 1, 2, 3 ]
castSlice(arr, 0, -3) // [ 1 ]

```
