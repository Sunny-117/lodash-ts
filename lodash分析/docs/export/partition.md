# partition

## Description
创建一个分成两组的元素数组，第一组包含 predicate（断言函数）返回为 truthy（真值）的元素，第二组包含 predicate（断言函数）返回为 falsey（假值）的元素。predicate 调用 1 个参数：(value)。

## Params
`(collection, predicate)`

## Return
`Array`

## Depend
```js
import reduce from './reduce.js'
```
> [reduce 源码分析](./reduce.md)

## Code
```js
function partition(collection, predicate) {
  return reduce(collection, (result, value, key) => (
    result[predicate(value) ? 0 : 1].push(value), result
  ), [[], []])
}
```

## Analyze
其实也就是通过 `reduce` 遍历，默认值为一个二维数组，索引为 0 的 存 真值， 索引为 1 的存 假值，在通过 逗号运算符，返回 `result`，真假值是通过 `predicate` 函数处理的结果

## Example
```js
const arr = [1,2,3,4,5,6,7,8,9,0]
console.log(partition(arr, (v) => v&1)) // [ [ 1, 3, 5, 7, 9 ], [ 2, 4, 6, 8, 0 ] ]
```
