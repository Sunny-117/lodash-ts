# deburr 

## Description 
转换字符串 `string` 中[拉丁语 - 1 补充字母](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table) 和[拉丁语扩展字母 - A](https://en.wikipedia.org/wiki/Latin_Extended-A) 为基本的拉丁字母，并且去除组合变音标记。
## Params
`string`
## Return
`string`
## Depend
```js
import deburrLetter from './.internal/deburrLetter.js'
```
> [deburrLetter 源码分析](../internal/deburrLetter.md)
>

## Code
```js
/** Used to match Latin Unicode letters (excluding mathematical operators). */
const reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g

/** Used to compose unicode character classes. */
const rsComboMarksRange = '\\u0300-\\u036f'
const reComboHalfMarksRange = '\\ufe20-\\ufe2f'
const rsComboSymbolsRange = '\\u20d0-\\u20ff'
const rsComboMarksExtendedRange = '\\u1ab0-\\u1aff'
const rsComboMarksSupplementRange = '\\u1dc0-\\u1dff'
const rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange + rsComboMarksExtendedRange + rsComboMarksSupplementRange

/** Used to compose unicode capture groups. */
const rsCombo = `[${rsComboRange}]`

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
const reComboMark = RegExp(rsCombo, 'g')


function deburr(string) {
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '')
}
```
## Analyze
使用 string.replace 首先替换 Latin-1补编和Latin Extended-A，然后根据正则将不能转换的，替换为空字符串
## Remark
1. [组合附加符号 Wikipedia](https://zh.wikipedia.org/wiki/%E7%B5%84%E5%90%88%E9%99%84%E5%8A%A0%E7%AC%A6%E8%99%9F)
<img  :src="$withBase('/assets/combining_diacritical_marks.png')" />
2. [Combining Diacritical Marks for Symbols Wikipedia](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols)
<img  :src="$withBase('/assets/U20D0.png')" />
3. [String.prototype.replace() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace) 方法返回一个由替换值（replacement）替换部分或所有的模式（pattern）匹配项后的新字符串。模式可以是一个字符串或者一个正则表达式，替换值可以是一个字符串或者一个每次匹配都要调用的回调函数。如果 pattern 是字符串，则仅替换第一个匹配项
## Example
```js
deburr('déjà vu') // => 'deja vu'
```
