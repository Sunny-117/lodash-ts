# tail

## Description
获取除了 array 数组第一个元素以外的全部元素。

## Params
`array`

## Return
`Array`

## Code
```js
function tail(array) {
  const length = array == null ? 0 : array.length
  if (!length) {
    return []
  }
  const [, ...result] = array
  return result
}
```

## Analyze
对于 array 的合法性做了判断，通过 解构赋值，去除数组第一个值，拿到剩余的

## Example
```js
console.log(tail([1,2,3,4,5])) // [ 2, 3, 4, 5 ]
```
