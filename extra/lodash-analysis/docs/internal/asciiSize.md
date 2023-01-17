# asciiSize 

## Description 
获取 ASCII 字符串 的长度。
## Params
`string`
## Return
`Number`

## Code
```js
function asciiSize({ length }) {
  return length
}
```
## Analyze
asscii 的每个字符占 8位也就是 1字节，所以长度也为1， 通过结构赋值拿到传入字符串的 `length` 并 返回即可得到 asscii的长度
## Remark
1. [解构赋值 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#%E4%BB%8E%E4%BD%9C%E4%B8%BA%E5%87%BD%E6%95%B0%E5%AE%9E%E5%8F%82%E7%9A%84%E5%AF%B9%E8%B1%A1%E4%B8%AD%E6%8F%90%E5%8F%96%E6%95%B0%E6%8D%AE)
2. [ASCII，Unicode 和 UTF-8 阮一峰](http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html)
## Example
```js
asciiSize('ASCII') // 5
```
