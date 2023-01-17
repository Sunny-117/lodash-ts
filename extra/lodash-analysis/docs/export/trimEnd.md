# trimEnd

## Description
从 string 字符串中移除后面的 空格 或 指定的字符。

## Params
`(string, chars)`

## Return
`string`

## Depend
```js
import castSlice from './.internal/castSlice.js'
import charsEndIndex from './.internal/charsEndIndex.js'
import stringToArray from './.internal/stringToArray.js'
```
> [castSlice 源码分析](../internal/castSlice.md)
> <br/>
> <br/>
> [charsEndIndex 源码分析](../internal/charsEndIndex.md)
> <br/>
> <br/>
> [stringToArray 源码分析](../internal/stringToArray.md)

## Code
```js
const methodName = ''.trimRight ? 'trimRight': 'trimEnd'
function trimEnd(string, chars) {
  if (string && chars === undefined) {
    return string[methodName]()
  }
  if (!string || !chars) {
    return (string || '')
  }
  const strSymbols = stringToArray(string)
  const end = charsEndIndex(strSymbols, stringToArray(chars)) + 1
  return castSlice(strSymbols, 0, end).join('')
}
```
## Analyze
和 [trimStart](./trimStart.md) 类似，`trimRight` 是 `trimEnd` 的别名，在最后截取时，从 0 到获取到的索引位置

## Remark
1. [String.prototype.trimEnd() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/trimEnd) 方法从一个字符串的末端移除空白字符。trimRight () 是这个方法的别名。

## Example
```js
console.log(trimEnd('trimEnd', 'End')) // trim
```
