# trimStart

## Description
从 string 字符串中移除前面的 空格 或 指定的字符

## Params
`(string, chars)`

## Return
`string`

## Depend
```js
import castSlice from './.internal/castSlice.js'
import charsStartIndex from './.internal/charsStartIndex.js'
import stringToArray from './.internal/stringToArray.js'
```
> [castSlice 源码分析](../internal/castSlice.md)
> <br/>
> <br/>
> [charsStartIndex 源码分析](../internal/charsStartIndex.md)
> <br/>
> <br/>
> [stringToArray 源码分析](../internal/stringToArray.md)

## Code
```js
const methodName =  ''.trimLeft ? 'trimLeft' : 'trimStart'
function trimStart(string, chars) {
  if (string && chars === undefined) {
    return string[methodName]()
  }
  if (!string || !chars) {
    return (string || '')
  }
  const strSymbols = stringToArray(string)
  const start = charsStartIndex(strSymbols, stringToArray(chars))
  return castSlice(strSymbols, start).join('')
}
```
## Analyze
和 [trim](./trim.md) 基本类似， 这里 `trimLeft` 是 `trimStart` 的别名，最后截取是从开始的位置 截取到结尾

## Remark
1. [String.prototype.trimStart() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/trimStart) 方法从字符串的开头删除空格。trimLeft() 是此方法的别名。

## Example
```js
console.log(trimStart('trimStart', 'trim')) // Start
```
