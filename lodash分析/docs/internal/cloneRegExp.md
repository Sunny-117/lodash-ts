# cloneRegExp 

## Description 
正则表达式是用于匹配字符串中字符组合的模式。在 JavaScript 中，正则表达式也是对象。这些模式被用于 RegExp 的 exec 和 test 方法，以及 String 的 match、matchAll、replace、search 和 split 方法。
## Params
`{Object} regexp`
## Return
`{Object} regexp`

## Code
```js
const reFlags = /\w*$/

function cloneRegExp(regexp) {
  const result = new regexp.constructor(regexp.source, reFlags.exec(regexp))
  result.lastIndex = regexp.lastIndex
  return result
}
```
## Analyze
1. `RegExp.prototype.source` 属性返回一个值为当前正则表达式对象的模式文本的字符串，该字符串不会包含正则字面量两边的斜杠以及任何的标志字符。
2. `RegExp.prototype.exec()` 方法在一个指定字符串中执行一个搜索匹配。返回一个结果数组或 null。
3. `RegExp.lastIndex` 是正则表达式的一个可读可写的整型属性，用来指定下一次匹配的起始索引。
4. `RegExp.prototype.flags` 属性返回一个字符串，由当前正则表达式对象的标志组成。
5. 首先通过 `regexp.constructor` 也就是 `RegExp` 来 `new` 一个新的正则
6. 拿到之前正则的模式文本，通过 `reFlags` 来匹配 拿到 标志字符，这里不使用 `flags` 是因为浏览器兼容性问题

<img  :src="$withBase('/assets/cloneRegexp.png')" />

所以使用了正则来匹配

<img  :src="$withBase('/assets/reg_cloneRegexp.svg')" />


7. 最后保证了 lastIndex 属性和之前的一致，至此 正则克隆完成

## Remark
1. [RegExp MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
## Example
```js
const a = /^\d{1-2}\w+$/gmi

const b = cloneRegExp(a) // /^\d{1-2}\w+$/gim
```
