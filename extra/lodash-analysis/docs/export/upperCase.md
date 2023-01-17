# upperCase

## Description
转换字符串 string 为 空格 分隔的大写单词。

## Params
`string`

## Return
`string`

## Depend
```js
import words from './words.js'
import toString from './toString.js'
```
> [words 源码分析](./words.md)
> <br/>
> <br/>
> [toString 源码分析](./toString.md)

## Code
```js
const upperCase = (string) => (
  words(toString(string).replace(/['\u2019]/g, '')).reduce((result, word, index) => (
    result + (index ? ' ' : '') + word.toUpperCase()
  ), '')
)
```

## Analyze
和 [kebabCase](./kebabCase.md) 类似，只不过拼接换成了空格，转小写换成了转大写

## Example
```js
console.log(upperCase('upperCase')) // UPPER CASE
```
