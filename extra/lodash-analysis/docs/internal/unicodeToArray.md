# unicodeToArray 

## Description 
将 Unicode 字符串转换为数组
## Params
`{String} string`
## Return
`Array`

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
const rsAstral = `[${rsAstralRange}]`
const rsCombo = `[${rsComboRange}]`
const rsFitz = '\\ud83c[\\udffb-\\udfff]'
const rsModifier = `(?:${rsCombo}|${rsFitz})`
const rsNonAstral = `[^${rsAstralRange}]`
const rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}'
const rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]'
const rsZWJ = '\\u200d'

/** Used to compose unicode regexes. */
const reOptMod = `${rsModifier}?`
const rsOptVar = `[${rsVarRange}]?`
const rsOptJoin = `(?:${rsZWJ}(?:${[rsNonAstral, rsRegional, rsSurrPair].join('|')})${rsOptVar + reOptMod})*`
const rsSeq = rsOptVar + reOptMod + rsOptJoin
const rsNonAstralCombo = `${rsNonAstral}${rsCombo}?`
const rsSymbol = `(?:${[rsNonAstralCombo, rsCombo, rsRegional, rsSurrPair, rsAstral].join('|')})`

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
const reUnicode = RegExp(`${rsFitz}(?=${rsFitz})|${rsSymbol + rsSeq}`, 'g')

function unicodeToArray(string) {
  return string.match(reUnicode) || []
}

export default unicodeToArray

```
## Analyze
#### `/\ud83c[\udffb-\udfff](?=\ud83c[\udffb-\udfff])|(?:[^\ud800-\udfff][\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff\u1ab0-\u1aff\u1dc0-\u1dff]?|[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff\u1ab0-\u1aff\u1dc0-\u1dff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff\u1ab0-\u1aff\u1dc0-\u1dff]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff\u1ab0-\u1aff\u1dc0-\u1dff]|\ud83c[\udffb-\udfff])?)*/`

<img  :src="$withBase('/assets/reg_unicodeToArray_1.svg')" />

依旧是使用正则匹配返回

## Remark
1. [match MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/match)
2. 关于 `Unicode` 相关可以参考 [hasUnicode 源码分析](./hasUnicode.md)

## Example
```js
unicodeToArray('表情😊国旗🇨🇳流泪😭猫🐈猴🐵') // [ '表',  '情',  '😊',  '国',  '旗',  '🇨🇳', '流',  '泪',  '😭', '猫',  '🐈', '猴', '🐵']
```
