# sampleSize

## Description
从 array（集合）中获得 n 个随机元素。

## Params
`(array, n)`

## Return
`Array`

## Depend
```js
import copyArray from './.internal/copyArray.js'
import slice from './slice.js'
```
> [copyArray 源码分析](../internal/copyArray.md)
> <br/>
> <br/>
> [slice 源码分析](./slice.md)

## Code
```js
function sampleSize(array, n) {
  n = n == null ? 1 : n
  const length = array == null ? 0 : array.length
  if (!length || n < 1) {
    return []
  }
  n = n > length ? length : n
  let index = -1
  const lastIndex = length - 1
  const result = copyArray(array)
  while (++index < n) {
    const rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
    const value = result[rand]
    result[rand] = result[index]
    result[index] = value
  }
  return slice(result, 0, n)
}
```

## Analyze
1. 首先是参数合法化的处理
    ```js
      n = n == null ? 1 : n
      const length = array == null ? 0 : array.length
      if (!length || n < 1) {
        return []
      }
      n = n > length ? length : n
    ```
    
    如果 n 没有传入或者 n 为 `null` ，则 n 取 1
    
    然后判断了 数组的合法性，如果 `length` 为假值，或者 `n < 1`,则返回空数组

    然后对 n 进行了处理，这里其实就相当于 `Math.max(n, length)` ，在这其中取最大值

2. 接着是随机数组的处理
    ```js
      let index = -1
      const lastIndex = length - 1
      const result = copyArray(array)
      while (++index < n) {
        const rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
        const value = result[rand]
        result[rand] = result[index]
        result[index] = value
      }
    ```
   
    这里的思路是这样的 我们要取一个随机的值，有可能要改变原数组，所以首先 copy 一份

    将随机的值 放到数组的 index 位置，将 index 的值 放到 随机索引的位置，这样一来就完成了随机值的获取

    但是这个过程对于 索引的随机就有要求了

    这里随机的索引是这么处理的
   
    ```js
    const rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
    ```
    
    通过 `index` 加上 `Math.random() * (lastIndex - index + 1)` 的值，这样的话已经遍历过的 `index` 是不会在出现的，只会对剩余的数组元素进行随机获取，和上述的 思路是一致的

3. 最后通过 `slice` 进行截取，拿到结果

## Example
```js
console.log(sampleSize([1,2,3,4,5,6,7], 3)) // [ 6, 7, 3 ]
```

如果 传入的 n 大于或者等于数组的长度，则最终的结果是 打乱数组的顺序
