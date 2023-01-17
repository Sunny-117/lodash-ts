# toKey

## Description 
将 `value` 转换成符合符合对象的属性( key )
> 和 js 的自动转换有一点不同，js 自动转换时，会将数字 -0 转换成字符串 "0"，但是 `toKey` 会将数字 `-0` 转换成字符串 "-0"。 （[关于 js 转换 +0 和 -0](https://262.ecma-international.org/6.0/#sec-tostring-applied-to-the-number-type) , 参考第二条 _If m is +0 or −0, return the String "0"._）
>

## Params
`value`
## Return
`String | Symbol`
> `Symbol` 可以直接做对象的 key 值使用 （[Symbol术语 MDN ](https://developer.mozilla.org/zh-CN/docs/Glossary/Symbol)）
## Depend
```js
import isSymbol from '../isSymbol.js'
```
> [isSymbol 源码分析](../export/isSymbol.md)
>

## Code
```js
const INFINITY = 1 / 0

function toKey(value) {
  if (typeof value === 'string' || isSymbol(value)) {
    return value
  }
  const result = `${value}`
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result
}
```

## Analyze
1. 判断传入的 `value` 如果为 `string` 或者 `symbol` ，则直接返回 `value`
2. 如果不为上述，则转换为字符串，判断如果 为 `-0` , 则返回 `'-0'`, 否则返回 转换的结果

## Remark
1. [Number.prototype.toString() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/toString)
2. [Number.prototype.toString ECMAScript 2015](https://262.ecma-international.org/6.0/#sec-number.prototype.tostring)
3. 其他类型的 `toString MDN` 参考 [toString 源码分析](../export/toString.md) **Remark**
4. [模板字面量(模板字符串) MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/template_strings)
5. [Number.NEGATIVE_INFINITY MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/NEGATIVE_INFINITY)
6. [Number.POSITIVE_INFINITY MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY)


## Example
```js
toKey(3) // '3'
toKey('a') // 'a'
toKey([1,2,3]) // '1,2,3'
toKey(-0) // '-0'
```
