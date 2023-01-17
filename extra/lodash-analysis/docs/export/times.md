# times

## Description
调用 iteratee n 次，每次调用返回的结果存入到数组中。 iteratee 调用入 1 个参数： (index)。

## Params
`(n, iteratee)`

## Return
`Array`

## Code
```js
/** Used as references for various `Number` constants. */
const MAX_SAFE_INTEGER = 9007199254740991

/** Used as references for the maximum length and index of an array. */
const MAX_ARRAY_LENGTH = 4294967295
function times(n, iteratee) {
  if (n < 1 || n > MAX_SAFE_INTEGER) {
    return []
  }
  let index = -1
  const length = Math.min(n, MAX_ARRAY_LENGTH)
  const result = new Array(length)
  while (++index < length) {
    result[index] = iteratee(index)
  }
  index = MAX_ARRAY_LENGTH
  n -= MAX_ARRAY_LENGTH
  while (++index < n) {
    iteratee(index)
  }
  return result
}
```
## Analyze
1. 首先对 n 做了边界处理，如果 n 小于 1 或者 n 大于 最大安全数，则返回空数组
   
2. n 和 最大数组长度对比，取较小值作为最终结果数组的 length
3. while 循环遍历，result 索引对应的值则为 iteratee 处理之后的结果
4. 对于 `n` 大于数组最大长度的部分也做了处理，这个时候结果虽然不存入 `result` 数组，但是 `iteratee` 还是要调用，所以有了以下代码
    ```js
      index = MAX_ARRAY_LENGTH
      n -= MAX_ARRAY_LENGTH
      while (++index < n) {
        iteratee(index)
      }
    ```
   
    但是这里有一个问题，如果去掉 `index` 和 `n` 赋值那里没有问题，整个函数继续调用即可

    如果加上赋值的话，那么到最后调用肯定不足 `n` 次

## Example
```js
console.log(times(4, (i) => i)) // [ 0, 1, 2, 3 ]
```
