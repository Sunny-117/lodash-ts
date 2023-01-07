# lowerFirst

## Description
转换字符串 string 的首字母为小写

## Params
`string`

## Return
`string`

## Depend
```js
import createCaseFirst from './.internal/createCaseFirst.js'
```
> [createCaseFirst 源码分析](../internal/createCaseFirst.md)

## Code
```js
const lowerFirst = createCaseFirst('toLowerCase')
```

## Analyze
通过 `createCaseFirst` 创建了一个 针对首字母处理成小写的方法

## Example
```js
console.log(lowerFirst('LowerFirst')) // lowerFirst
```
