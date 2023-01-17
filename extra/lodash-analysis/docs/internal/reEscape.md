# reEscape

## Description
匹配符合规范的字符串

e.g
`<%-reg%>`

## Return
`regExp`

## Code
```js
const reEscape = /<%-([\s\S]+?)%>/g
```
## Analyze
就是返回了一个符合规范的正则表达式，主要是匹配 \s 和 \S

<img  :src="$withBase('/assets/reEscape.svg')" />
## Remark
[\s](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions#special-white-space) 匹配一个空白字符，包括空格、制表符、换页符和换行符。
[\S](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions#special-non-white-space) 匹配一个非空白字符。
## Example
```js
console.log(reEscape.test('<%-reg%>')) // true
```
