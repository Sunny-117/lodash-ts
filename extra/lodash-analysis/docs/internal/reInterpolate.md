# reEvaluate

## Description
和 [reEscape](./reEscape.md) 一样。匹配符合规定的字符串

## Return
`regExp`

## Code
```js
const reInterpolate = /<%=([\s\S]+?)%>/g
```
## Analyze
和 [reEscape](./reEscape.md) 基本一致

<img  :src="$withBase('/assets/reInterpolate.svg')" />
## Remark
[\s](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions#special-white-space) 匹配一个空白字符，包括空格、制表符、换页符和换行符。
[\S](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions#special-non-white-space) 匹配一个非空白字符。

## Example
```js
console.log(reInterpolate.test('<%=reg%>')) // true
```
