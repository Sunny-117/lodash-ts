# hasUnicode 

## Description 
检查 `string` 是否包含 `Unicode` 符号
## Params
`{String} string` -- 要检查的字符串
## Return
`Boolean`

## Code
```js
/** Used to compose unicode character classes. */
const rsAstralRange = '\\ud800-\\udfff'

const rsComboMarksRange = '\\u0300-\\u036f'
const reComboHalfMarksRange = '\\ufe20-\\ufe2f'
const rsComboSymbolsRange = '\\u20d0-\\u20ff'
const rsComboMarksExtendedRange = '\\u1ab0-\\u1aff'
const rsComboMarksSupplementRange = '\\u1dc0-\\u1dff'
const rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange + rsComboMarksExtendedRange + rsComboMarksSupplementRange
const rsVarRange = '\\ufe0e\\ufe0f'

/** Used to compose unicode capture groups. */
const rsZWJ = '\\u200d'

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
const reHasUnicode = RegExp(`[${rsZWJ + rsAstralRange + rsComboRange + rsVarRange}]`)

function hasUnicode(string) {
  return reHasUnicode.test(string)
}

```
## Analyze
1. 其实整个代码一点都不复杂，就是正则测试，返回结果
2. 难点在于所有的 Unicode , 匹配符合以下
`/[\u200d\ud800-\udfff\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff\u1ab0-\u1aff\u1dc0-\u1dff\ufe0e\ufe0f]/`

<img  :src="$withBase('/assets/reg_hasUnicode_1.svg')" />

## Remark
1. [Unicode on Wikipedia](https://zh.wikipedia.org/wiki/Unicode)
<br/>
<br/>
2. **`U+200D`**: [零宽连字 on Wikipedia](https://zh.wikipedia.org/wiki/%E9%9B%B6%E5%AE%BD%E8%BF%9E%E5%AD%97) (zero-width
 joiner，ZWJ）是一个控制字符，放在某些需要复杂排版语言（如阿拉伯语、印地语）的两个字符之间，使得这两个本不会发生连字的字符产生了连字效果
 <br/>
 <br/>
3. **`U+D800-U+DFFF`**: [UTF-16 on Wikipedia](https://zh.wikipedia.org/wiki/UTF-16#%E4%BB%8EU+D800%E5%88%B0U+DFFF%E7%9A%84%E7%A0%81%E4%BD%8D) ,Unicode 标准规定 U+D800...U+DFFF 的值不对应于任何字符。但是在使用 UCS-2 的时代，U+D800...U+DFFF 内的值被占用，用于某些字符的映射。但只要不构成代理对，许多 UTF-16 编码解码还是能把这些不符合 Unicode 标准的字符映射正确的辨识、转换成合规的码元。按照 Unicode 标准，这种码元序列本来应算作编码错误。
<br/>
<br/>
4. **`U+0300–U+036F`**: [组合附加符号 on Wikipedia](https://zh.wikipedia.org/wiki/%E7%B5%84%E5%90%88%E9%99%84%E5%8A%A0%E7%AC%A6%E8%99%9F) ,（Combining Diacritical Marks、组合用附加符号、组合变音符、结合变音标记、组合音标附加符号）是一个包含最常见组合字符的 Unicode 区段。 它还包含字符的组合字位结合符，可以防止组合字符的规范重新排序；尽管在实际的表示法上、字符与附加符号是分开独立的，但该组合附加符号之字符在给定的上下文中将被视为单一的字位。
<br/>
<br/>
5. **`U+FE20–U+FE2F`**: [组合用半符号 on Wikipedia](https://zh.wikipedia.org/wiki/%E7%B5%84%E5%90%88%E7%94%A8%E5%8D%8A%E7%AC%A6E8%99%9F_(Unicode%E5%8D%80%E6%AE%B5)) 是一个 Unicode 区段，其中收录了可用于多种书写系统的变音符号
<br/>
<br/>
6. **`U+20D0-U+20FF`**: [组合符号的变音符号 on Wikipedia](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols) , 组合符号的变音符号是一个Unicode块，其中包含箭头，点，附件和用于修改符号字符的覆盖图
<br/>
<br/>
7. **`U+1AB0–U+1AFF`**: [组合变音标记扩展 on Wikipedia](https://zh.wikipedia.org/wiki/%E7%B5%84%E5%90%88%E8%AE%8A%E9%9F%B3%E6%A8%99%E8%A8%98%E6%93%B4%E5%B1%95_(Unicode%E5%8D%80%E6%AE%B5)) ,是一个 Unicode 区段，收录了德语方言学中使用的变音符号 “Teuthonista”
<br/>
<br/>
8. **`U+1DC0-U+1DFF`**: [结合变音符号补充 on Wikipedia](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_Supplement) , 组合变音标记补编是一个Unicode块，其中包含用于乌拉尔语拼音字母，Medievalist表示法和德语方言（Teuthonista）的组合字符。 它是在组合变音标记块中找到的变音符号的扩展
<br/>
<br/>
9. **`U+FE0E` / `U+FE0F`**: Emoji variation sequences contain VS16 (U+FE0F) for emoji-style (with color) or VS15 (U+FE0E) for text style (monochrome) (表情符号变体序列包含VS16（U + FE0F）（用于表情符号样式（带有颜色））或VS15（U + FE0E）（用于文本样式（单色））)
<br/>
<br/>
10. [Unicode 查询](https://unicode-table.com/cn/blocks/)
10. [Unicode 查询](https://util.unicode.org/UnicodeJsps/character.jsp)
11. [Unicode](https://home.unicode.org/)

## Example
```js
hasUnicode('a') // false
hasUnicode('b') // false
hasUnicode('😊') // true
hasUnicode('🇨🇳') // true
```
