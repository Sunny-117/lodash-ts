# camelCase 

## Description 
转换字符串 `string` 为[驼峰写法](https://zh.wikipedia.org/wiki/%E9%A7%9D%E5%B3%B0%E5%BC%8F%E5%A4%A7%E5%B0%8F%E5%AF%AB)
## Params
`{string} [string='']`
## Return
`String`
## Depend
```js
import upperFirst from './upperFirst.js'
import words from './words.js'
import toString from './toString.js'
```
> [upperFirst 源码分析](./upperFirst.md)
> <br/>
> <br/>
> [words 源码分析](./words.md)
> <br/>
> <br/>
> [toString 源码分析](./toString.md)
>

## Code
```js
const camelCase = (string) => (
  words(toString(string).replace(/['\u2019]/g, '')).reduce((result, word, index) => {
    word = word.toLowerCase()
    return result + (index ? upperFirst(word) : word)
  }, '')
)
```
## Analyze
1. `/['\u2019]/g`

<img  :src="$withBase('/assets/reg_camelCase_1.svg')" />

2. 调用 `toString` 将传入的值转换为 字符串，并且替换掉 `'` 和 `U+2019`
3. 使用 `words` 进行词分割，得到分割好的数组
4. 使用 `reduce` 进行拼接，最终返回一个字符串
5. 对于 迭代中的每个 `word` 都进行了转小写处理
6. 如果传入的 `word` 不是第一个，就进行首字母大写的处理（驼峰首单词首字母小写），并且进行拼接返回

## Remark
1. [reduce MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)
2. [toLowerCase](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase)

## Example
```js
camelCase('go to bad') // goToBad
camelCase('handle error') // handleError
camelCase('view files') // viewFiles
camelCase('camel case') // camelCase
camelCase(['very', 'sad']) // verySad
```
