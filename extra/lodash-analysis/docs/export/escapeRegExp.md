# escapeRegExp

## Description
转义 RegExp 字符串中特殊的字符 `^`, `$`,`.`,`*`,`+`,`?`,`(`,`)`,`[`,`]`,和`|` .

## Params
`string`
## Return
`string`

## Code
```js
/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
const reRegExpChar = /[\\^$.*+?()[\]{}|]/g
const reHasRegExpChar = RegExp(reRegExpChar.source)

function escapeRegExp(string) {
  return (string && reHasRegExpChar.test(string))
    ? string.replace(reRegExpChar, '\\$&')
    : (string || '')
}
```
## Analyze
<img  :src="$withBase('/assets/escapeRegExp.svg')" />

就是使用正则匹配上述字符，并进行转义，在其之前加 `\`

`$&` 为最后一个匹配到的字符，正则的写法
## Remark
1. [RegExp.lastMatch ($&)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp/lastMatch)

2. [String.prototype.replace() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace) 方法返回一个由替换值（replacement）替换部分或所有的模式（pattern）匹配项后的新字符串。模式可以是一个字符串或者一个正则表达式，替换值可以是一个字符串或者一个每次匹配都要调用的回调函数。如果 pattern 是字符串，则仅替换第一个匹配项。

## Example
```js
console.log(escapeRegExp('[google](https://www.google.com)')) // \[google\]\(https://www\.google\.com\)
```
