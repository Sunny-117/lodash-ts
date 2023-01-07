# head

## Description
获取数组 array 的第一个元素。
## Params
`array`
## Return
`{*}`

## Code
```js
function head(array) {
  return (array != null && array.length)
    ? array[0]
    : undefined
}
```
## Analyze
判断了数组是否为 `null` 或者 `undefined` ，并且数组具有 `length`，如果满足 取第一个元素，否则返回 `undefined`

## Example
```js
console.log(head([1,2,3,4])) // 1
```
