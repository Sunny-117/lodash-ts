# last 

## Description 
获取 array 中的最后一个元素。
## Params
`array`
## Return
`{*}`

## Code
```js
function last(array) {
  const length = array == null ? 0 : array.length
  return length ? array[length - 1] : undefined
}
```
## Analyze
1. 首先根据是否传入了 `array` 来判断 `length` 的值，传入了 则取 `array.length` 否则 取 0
2. 如果 `length` 存在，则返回 `array` 最后一个元素，否则返回 `undefined`
## Remark
1. [Array.length MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/length)
## Example
```js
last([1, 2, 3])  // => 3
```
