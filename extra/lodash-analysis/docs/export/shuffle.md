# shuffle

## Description
创建一个被打乱值的集合。

## Params
`array`

## Return
`Array`

## Depend
```js
import copyArray from './.internal/copyArray.js'
```
> [copyArray 源码分析](../internal/copyArray.md)

## Code
```js
function shuffle(array) {
  const length = array == null ? 0 : array.length
  if (!length) {
    return []
  }
  let index = -1
  const lastIndex = length - 1
  const result = copyArray(array)
  while (++index < length) {
    const rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
    const value = result[rand]
    result[rand] = result[index]
    result[index] = value
  }
  return result
}
```

## Analyze
和 [sampleSize](./sampleSize.md) 的处理逻辑基本一致，通过 `rand` 和 `index` 进行值和位置的替换

## Example
```js
console.log(shuffle([1,2,3,4,5,6,7,8])) // [ 3, 8, 2, 7, 5, 6, 1, 4]
```
