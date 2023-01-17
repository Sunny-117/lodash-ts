# remove

## Description
移除数组中 predicate（断言）返回为真值的所有元素，并返回移除元素组成的数组。predicate（断言） 会传入 3 个参数： (value, index, array)。

## Params
`(array, predicate)`

## Return
`Array`

## Depend
```js
import basePullAt from './.internal/basePullAt.js'
```
> [basePullAt 源码分析](../internal/basePullAt.md)

## Code
```js
function remove(array, predicate) {
  const result = []
  if (!(array != null && array.length)) {
    return result
  }
  let index = -1
  const indexes = []
  const { length } = array

  while (++index < length) {
    const value = array[index]
    if (predicate(value, index, array)) {
      result.push(value)
      indexes.push(index)
    }
  }
  basePullAt(array, indexes)
  return result
}
```

## Analyze
判断如果 没有传入数组，或者 `array` 为 `null` ，或者 `length` 为假值，都返回空数组

如果 `array` 有值，则遍历，通过 `predicate` 函数的校验的值，将 值 放到 `result` 数组，将索引放到 `indexes` 数组

遍历完成后 通过 `basePullAt` 根据 `indexes` 从原数组中删除 对应的值，也就是会改边原数组

最后返回 `result` 结果

## Example
```js
const arr = [1,2,3,4,5,6,7,8,9]

console.log(remove(arr, (v) => v&1)) // [ 1, 3, 5, 7, 9 ]
console.log(arr) // [ 2, 4, 6, 8 ]
```
