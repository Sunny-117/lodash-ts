# stringToArray 

## Description 
将 `string` 转换为 数组
## Params
`{String} string`
## Return
`Array`
## Depend
```js
import asciiToArray from './asciiToArray.js'
import hasUnicode from './hasUnicode.js'
import unicodeToArray from './unicodeToArray.js'
```
> [asciiToArray 源码分析](./asciiToArray.md)
> <br/>
> <br/>
> [hasUnicode 源码分析](./hasUnicode.md)
> <br/>
> <br/>
> [unicodeToArray 源码分析](./unicodeToArray.md)
>

## Code
```js
function stringToArray(string) {
  return hasUnicode(string)
    ? unicodeToArray(string)
    : asciiToArray(string)
}
```

## Analyze
判断 `string` 是否含有 `unicode` 码，如果有调用 `unicodeToArray` 否则调用 `asciiToArray` （`string.split`）
## Remark
1. [三元运算符 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Conditional_Operator)
## Example
```js
stringToArray('1,2,3,4') // asciiToArray ['1', '2', '3', '4']
stringToArray('笑脸😊') // unicodeToArray [ '笑',  '脸',  '😊']
```
