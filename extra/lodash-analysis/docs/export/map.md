# map 

## Description 
创建一个数组， value（值） 是 iteratee（迭代函数）遍历 collection（集合）中的每个元素后返回的结果。 iteratee（迭代函数）调用 3 个参数：
(value, index|key, collection).
## Params
`(array, iteratee)`
> iteratee 每次迭代调用的函数
>

## Return
`Array`

## Code
```js
function map(array, iteratee) {
  let index = -1
  const length = array == null ? 0 : array.length
  const result = new Array(length)

  while (++index < length) {
    result[index] = iteratee(array[index], index, array)
  }
  return result
}

```
## Analyze
1. 首先拿到 `array` 的长度 `length`，如果不存在则 `length` 取 0
   
2. 新建一个和 `array` 等长的数组 `result`，作为返回值
3. `while` 循环遍历, 每一次遍历都拿到 `iteratee` 处理之后的结果，赋值给 `result` 对应的下标
4. `iteratee` 参数第一项为 当前遍历的值，第二项为下标，第三项为 原数组
5. 最终返回 `result`
## Remark
1. [Array.prototype.map() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
   
2. [Array.prototype.flatMap() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)

## Example
```js
function square(n) {
  return n * n
}

map([4, 8], square) // => [16, 64]
```
