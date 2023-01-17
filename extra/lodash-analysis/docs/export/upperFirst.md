# upperFirst 

## Description 
转换字符串 `string` 的首字母为大写。
## Params
`{string} [string='']`
## Return
`String`
## Depend
```js
import createCaseFirst from './.internal/createCaseFirst.js'
```
> [createCaseFirst 源码分析](../internal/createCaseFirst.md)
>

## Code
```js
const upperFirst = createCaseFirst('toUpperCase')
```
## Analyze
调用 `createCaseFirst` 创建了一个针对 `string` 首字母处理成大写的方法
## Remark
1. [toUpperCase MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase)
2. [toLowerCase MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase)
## Example
```js
upperFirst('yo~') // Yo~
upperFirst('hi') // Hi
```
