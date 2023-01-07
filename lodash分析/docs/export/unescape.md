# unescape

## Description
 [escape](./escape.md) 的反向版。 这个方法转换 string 字符串中的 HTML 实体 `&amp;`, `&lt;`, `&gt;`, `&quot;`, `&#39;`, 和 `&#96;` 为对应的字符。

## Params
`string`

## Return
`string`

## Code
```js
const htmlUnescapes = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'"
}
const reEscapedHtml = /&(?:amp|lt|gt|quot|#(0+)?39);/g
const reHasEscapedHtml = RegExp(reEscapedHtml.source)
function unescape(string) {
  return (string && reHasEscapedHtml.test(string))
    ? string.replace(reEscapedHtml, (entity) => (htmlUnescapes[entity] || "'"))
    : (string || '')
}
```
## Analyze
和 [escape](./escape.md) 的处理逻辑基本类似，只不过正则和映射表上有区别,是反过来的

## Example
```js
console.log(unescape('&lt;p&gt;标签&lt;/p&gt;')) // <p>标签</p>
```
