# startCase

## Description
转换 string 字符串为 首字母大写，空格分割

## Params
`string`

## Return
`String`

## Depend
```js
import upperFirst from './upperFirst.js'
import words from './words.js'
```
> [upperFirst 源码分析](./upperFirst.md)
> <br/>
> <br/>
> [words 源码分析](./words.md)

## Code
```js
const startCase = (string) => (
  words(`${string}`.replace(/['\u2019]/g, '')).reduce((result, word, index) => (
    result + (index ? ' ' : '') + upperFirst(word)
  ), '')
)
```

## Analyze
和 [kebabCase](./kebabCase.md) 类似，这里对于 `word` 进行了首字母大写的处理，并且拼接使用 空格

## Example
```js
console.log(startCase('startCase')) // Start Case
```
