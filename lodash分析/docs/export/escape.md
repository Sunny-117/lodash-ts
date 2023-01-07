# escape

## Description
转义 string 中的 `&`, `<`, `>`, `"`,`'`, 和`` ` `` 字符为 HTML 实体字符。
## Params
`string`
## Return
`string`

## Code
```js
/** Used to map characters to HTML entities. */
const htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
}

/** Used to match HTML entities and HTML characters. */
const reUnescapedHtml = /[&<>"']/g
const reHasUnescapedHtml = RegExp(reUnescapedHtml.source)

function escape(string) {
  return (string && reHasUnescapedHtml.test(string))
    ? string.replace(reUnescapedHtml, (chr) => htmlEscapes[chr])
    : (string || '')
}
```
## Analyze
<img  :src="$withBase('/assets/escape.svg')" />

判断了 `string` 存在 并且也确实含有上述字符，然后就通过 `string.replace` 方法进行替换，将对应的字符替换为 `htmlEscapes` 定义的转义之后的字符

这里 定义两个正则，是因为 匹配完了之后会改变 `lastIndex` 属性
## Remark
1. [RegExp.lastIndex](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastIndex)
    只有正则表达式使用了表示全局检索的 "g" 标志时，该属性才会起作用。此时应用下面的规则：
    - 如果 lastIndex 大于字符串的长度，则 regexp.test 和 regexp.exec 将会匹配失败，然后 lastIndex 被设置为 0。
    - 如果 lastIndex 等于字符串的长度，且该正则表达式匹配空字符串，则该正则表达式匹配从 lastIndex 开始的字符串。（then the regular expression matches input starting at lastIndex.）
    - 如果 lastIndex 等于字符串的长度，且该正则表达式不匹配空字符串 ，则该正则表达式不匹配字符串，lastIndex 被设置为 0.。
    - 否则，lastIndex 被设置为紧随最近一次成功匹配的下一个位置。
2. [String.prototype.replace() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace) 方法返回一个由替换值（replacement）替换部分或所有的模式（pattern）匹配项后的新字符串。模式可以是一个字符串或者一个正则表达式，替换值可以是一个字符串或者一个每次匹配都要调用的回调函数。如果 pattern 是字符串，则仅替换第一个匹配项。
## Example
```js
console.log(escape('&nbsp; <p>1</p>')) // &amp;nbsp; &lt;p&gt;1&lt;/p&gt;
```
