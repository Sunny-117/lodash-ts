# chunk 

## Description 
将数组（array）拆分成多个 `size` 长度的区块，并将这些区块组成一个新数组。 如果 `array` 无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。
## Params
`(array, size = 1)`
> {Array} array
>
> {Number} size 默认值为1
## Return
`{Array} array`
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
function chunk(array, size = 1) {
  size = Math.max(toInteger(size), 0)
  const length = array == null ? 0 : array.length
  if (!length || size < 1) {
    return []
  }
  let index = 0
  let resIndex = 0
  const result = new Array(Math.ceil(length / size))

  while (index < length) {
    result[resIndex++] = slice(array, index, (index += size))
  }
  return result
}
```
## Analyze
1. 首先对于传入的 size 进行了取整，然后判断是否小于0， 如果小于 0 size 取 0
2. 获取 length ， 如果没有传入 array 或者 array 为 null ，则取0，否则获取 array 的 length 属性
3. 如果不存在 length， 并且 size 小于 1 直接返回 空数组
4. 创建 result 作为返回的数组， result 的长度 是由 Math.ceil(length / size) 获取到的 （Math.ceil() 函数返回大于或等于一个给定数字的最小整数。）
5. 通过 `while` 循环给 `result` 中对应下标赋值，每次循环都会递增 `resIndex` , 通过 `slice` 进行数组的分割，分割的长度 为 `size` （`index += size`，在 `while` 循环中 `index` 的递增值为 `size` 的大小） 
6. 对于 `chunk` 和 `slice` 一样，都没有刻意限制 （`Array.isArray`）必须为数组，所以 `Array-like` 是可以传入的，在 `slice` 中会做处理

## Remark
1. [Math.ceil() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil)
2. [加法赋值 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Addition_assignment)
3. `chunk` 方法，刻意适用在处理很多数据渲染 `DOM` 的情况下，完全可以使用 `chunk` 分批渲染，或者只渲染其中一部分，在用户切换时渲染其余的部分
## Example
```js
chunk(['a', 'b', 'c', 'd'], 2) // => [['a', 'b'], ['c', 'd']]

chunk(['a', 'b', 'c', 'd'], 3) // => [['a', 'b', 'c'], ['d']]
```
