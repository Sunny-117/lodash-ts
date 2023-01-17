# dropRight

## Description
创建一个切片数组，去除 array 尾部的 n 个元素。（n 默认值为 1。）
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
function dropRight(array, n=1) {
  const length = array == null ? 0 : array.length
  n = length - toInteger(n)
  return length ? slice(array, 0, n < 0 ? 0 : n) : []
}
```
## Analyze
基本和 [drop](./drop.md) 一致，只不过这里做了参数的处理，使用 `length - n` 作为 `slice` 的结束值

同样这里也会判断，如果 n 小于0，取 0，也就达到了从右到左

## Example
```js
console.log(dropRight([1,2,3,4])) // [ 1, 2, 3 ]
console.log(dropRight([1,2,3,4], 5)) // []
console.log(dropRight([1,2,3,4], 2)) // [ 1, 2 ]
```
