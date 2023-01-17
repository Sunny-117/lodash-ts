# kebabCase

## Description
转换字符串 string 为 kebab case. （中划线连接单词）

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
const kebabCase = (string) => (
  words(toString(string).replace(/['\u2019]/g, '')).reduce((result, word, index) => (
    result + (index ? '-' : '') + word.toLowerCase()
  ), '')
)
```
## Analyze
1. 使用 toString 将 string 转为字符串，并且通过 replace 替换 `'` 和 `\u2019`（`'`）替换为空
   
2. 使用 words 进行分词，然后调用 reduce 方法进行拼接
3. 在拼接时，如果 `index`为 `0` 则给 单词之前不添加 `-`，也就是第一个词之前不会添加 `-`，单词 都会调用 `toLowerCase` 方法，转为小写
4. 最终返回结果，也就是拼接好的结果

## Remark
1. [String.prototype.toLowerCase() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase) 会将调用该方法的字符串值转为小写形式，并返回。
   
2. [Array.prototype.reduce() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) 方法对数组中的每个元素执行一个由您提供的 reducer 函数 (升序执行)，将其结果汇总为单个返回值。

## Example
```js
console.log(kebabCase('kebabCase')) // kebab-case
```
