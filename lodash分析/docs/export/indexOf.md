# indexOf

## Description
使用 SameValueZero 等值比较，返回首次 value 在数组 array 中被找到的 索引值， 如果 fromIndex 为负值，将从数组 array 尾端索引进行匹配。

## Params
`(array, value, fromIndex)`

## Return
`Number`

## Depend
```js
import baseIndexOf from './.internal/baseIndexOf.js'
import toInteger from './toInteger.js'
```
> [baseIndexOf 源码分析](../internal/baseIndexOf.md)
> <br/>
> <br/>
> [toInteger 源码分析](./toInteger.md)

## Code
```js
function indexOf(array, value, fromIndex) {
  const length = array == null ? 0 : array.length
  if (!length) {
    return -1
  }
  let index = fromIndex == null ? 0 : toInteger(fromIndex)
  if (index < 0) {
    index = Math.max(length + index, 0)
  }
  return baseIndexOf(array, value, index)
}
```

## Analyze
1. 拿到 array 的 length 属性，然后进行了判断
   
2. 如果 `length` 为假值，则返回 -1
3. 对于 `index` 进行了处理，如果 没有 传入 `fromIndex` ，则 `index` 为 0，否则使用 `toInteger` 将其转为整数后赋值给 index
4. 如果 `index < 0` ,则表示从后往前数，从数到的位置开始，这里就是使用 `length + index` 的方法，来确定 `index` 的值，但是 `length + index` 的值不能小于 0， 所以使用 `Math.max` 取 0 和 `length + index` 中较大值
5. 最后会调用 `baseIndexOf` 方法进行查找

## Remark
1. [Array.prototype.indexOf() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) 方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回 - 1。

## Example
```js
console.log(indexOf([1,2,3,4,5], 3)) //2
```
