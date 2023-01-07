# lowerCase

## Description
转换字符串 string 以空格分开单词，并转换为小写。

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
const reQuotes = /['\u2019]/g
const lowerCase = (string) => (
  words(toString(string).replace(reQuotes, '')).reduce((result, word, index) => (
    result + (index ? ' ' : '') + word.toLowerCase()
  ), '')
)
```

## Analyze
和 [kebabCase](./kebabCase.md) 类似，只不过在最后拼接这里，使用的是空格，而不是 `-`

## Example
```js
console.log(lowerCase('lowerCase')) // lower case
```
