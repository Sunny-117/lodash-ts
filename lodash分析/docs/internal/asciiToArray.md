# asciiToArray 

## Description 
将ASCII `string` 转换为数组
## Params
`{String} string`
## Return
`Array`

## Code
```js
function asciiToArray(string) {
  return string.split('')
}
```
## Analyze
也就是将字符串分割为数组，对于 `lodash` 来说，不是 `Unicode` 的 `string` 那就是 `ascii`
## Remark
1. [ASCII on Wikipedia](https://zh.wikipedia.org/wiki/ASCII)
2. [split MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split)
## Example
```js
asciiToArray('1234') // [ '1', '2', '3', '4' ]
asciiToArray('qwer') // [ 'q', 'w', 'e', 'r' ]
```
