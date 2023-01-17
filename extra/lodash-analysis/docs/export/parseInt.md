# parseInt

## Description
转换 string 字符串为指定基数的整数。 如果基数是 undefined 或者 0，则 radix 基数默认是 10，如果 string 字符串是 16 进制，则 radix 基数为 16。

## Params
`(string, radix)`

## Return
`number`

## Depend
```js
import root from './.internal/root.js'
```
> [root 源码分析](../internal/root.md)

## Code
```js
const reTrimStart = /^\s+/

/* Built-in method references for those with the same name as other `lodash` methods. */
const nativeParseInt = root.parseInt
function parseInt(string, radix) {
  if (radix == null) {
    radix = 0
  } else if (radix) {
    radix = +radix
  }
  return nativeParseInt(`${string}`.replace(reTrimStart, ''), radix || 0)
}

```
## Analyze
针对传入的 `radix` 做了处理，如果没有传入或者传入为 `null` 则取 0，否则通过一元正号进行转换，转为 `number` 类型

最后调用 `parseInt` 方法进行转换，这里通过 `replace` 方法替换掉了空白字符，后续对于 `radix` 这里，因为一元正号转为数字有可能出现 `NaN` ，所以这里通过 `radix || 0`来解决

## Remark
1. [parseInt MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt) 解析一个字符串并返回指定基数的十进制整数， radix 是 2-36 之间的整数，表示被解析字符串的基数。

如果 radix 是 undefined、0 或未指定的，JavaScript 会假定以下情况：

- 如果输入的 string 以 "0x"或"0x"（一个 0，后面是小写或大写的 X）开头，那么 radix 被假定为 16，字符串的其余部分被当做十六进制数去解析。
- 如果输入的 string 以 "0"（0）开头， radix 被假定为 8（八进制）或 10（十进制）。具体选择哪一个 radix 取决于实现。ECMAScript 5 澄清了应该使用 10 (十进制)，但不是所有的浏览器都支持。因此，在使用 parseInt 时，一定要指定一个 radix。
- 如果输入的 string 以任何其他值开头， radix 是 10 (十进制)。

## Example
```js
console.log(parseInt(2.99)) // 2
console.log(parseInt(`02`)) // 2
console.log(parseInt(`1f`, 16)) // 31
console.log(parseInt(0xf)) // 15
console.log(parseInt(0xf, 16)) // 21
```
