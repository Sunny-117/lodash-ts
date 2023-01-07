# snakeCase

## Description
转换字符串 string 为 `_` 连接

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
const snakeCase = (string) => (
  words(toString(string).replace(/['\u2019]/g, '')).reduce((result, word, index) => (
    result + (index ? '_' : '') + word.toLowerCase()
  ), '')
)
```

## Analyze
和 [kebabCase](./kebabCase.md) 类似，拼接符换成了 `_`

## Example
```js
console.log(snakeCase('snakeCase')) // snake_case
```
