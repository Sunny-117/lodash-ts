# replace

## Description
替换 string 字符串中匹配的 pattern 为给定的 replacement 。

## Params
`(string, pattern, replacement)`

## Return
`string`

## Code
```js
function replace(...args) {
  const string = `${args[0]}`
  return args.length < 3 ? string : string.replace(args[1], args[2])
}
```

## Analyze
将参数转为 `args` 数组，将数组第一项作为 `string` 字符串，第二项作为要替换的值，第三项作为替代值

和 原生 `replace` 不同的是，如果 参数小于3，原生会将其替换为 `undefined`，而 `lodash` 不做处理

```js
replace('abc', 'b') // abc

'abc'.replace('b') // aundefinedc
```
## Remark
1. [String.prototype.replace() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/replace) 方法返回一个由替换值（replacement）替换部分或所有的模式（pattern）匹配项后的新字符串。模式可以是一个字符串或者一个正则表达式，替换值可以是一个字符串或者一个每次匹配都要调用的回调函数。如果 pattern 是字符串，则仅替换第一个匹配项。

## Example
```js
console.log(replace('abc', 'b')) // abc
console.log(replace('abc', /b+/g, '')) // ac
console.log(replace('abbbbbbc', /b+/g, '')) // ac
```
