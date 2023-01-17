# pad

## Description
如果 string 字符串长度小于 length 则从左侧和右侧填充字符。 

## Params
`(string, length, chars)`

## Return
`string`

## Depend
```js
import createPadding from './.internal/createPadding.js'
import stringSize from './.internal/stringSize.js'
```
> [createPadding 源码分析](../internal/createPadding.md)
> <br/>
> <br/>
> [stringSize 源码分析](../internal/stringSize.md)

## Code
```js
function pad(string, length, chars) {
  const strLength = length ? stringSize(string) : 0
  if (!length || strLength >= length) {
    return (string || '')
  }
  const mid = (length - strLength) / 2
  return (
    createPadding(Math.floor(mid), chars) +
    string +
    createPadding(Math.ceil(mid), chars)
  )
}
```

## Analyze
如果 `length` 为 真值，则取 `string` 的长度，否则 `strLength` 置为 0

如果 `length` 为假值 或者 `strLength >= length` 的情况下，返回 `string` 或 空字符串

拿到 中位值，使用 `length` 减去 `strLength` 然后 除以 2 得到中位值，因为要前后拼接

最后 通过 `createPadding` 来创建拼接字符，`mid` 有可能为小数，所以这里在前拼接时 使用 `Math.floor` 向下取整，在后拼接时 使用 `Math.ceil` 向上取整，最后和 `string` 拼接起来得到结果

## Example
```js
console.log(pad('abc', 10, '-_-')) // -_-abc-_--
console.log(pad('abc', 3, '-_-')) // abc

```
