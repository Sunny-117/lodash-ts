# capitalize 

## Description 
转换字符串 `string` 首字母为大写，剩下为小写。
## Params
`{string} [string='']`
## Return
`String`
## Depend
```js
import upperFirst from './upperFirst.js'
import toString from './toString.js'
```
> [upperFirst 源码分析](./upperFirst.md)
> <br/>
> <br/>
> [toString 源码分析](./toString.md)
>

## Code
```js
const capitalize = (string) => upperFirst(toString(string).toLowerCase())
```
## Analyze
`capitalize` 本质就是首先使用 toString 转为字符串，然后 `toLowerCase` 全小写，之后 `upperFirst` 将首字母大写并返回
## Remark
1. [箭头函数 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
## Example
```js
capitalize('fee') // Fee
// 这里传入数组也可以解析，如果要去除 `,` 可以 使用 `replace(/,/g, '')`
capitalize(['F', 'E', 'E', 0]) // F,e,e,0

```
