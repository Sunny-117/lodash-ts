# round

## Description
根据 precision（精度） 四舍五入 number。

## Params
`(number, precision)`

## Return
`number`

## Depend
```js
import createRound from './.internal/createRound.js'
```
> [createRound 源码分析](../internal/createRound.md)

## Code
```js
const round = createRound('round')
```

## Analyze
使用 `createRound` 创建了一个 `round` 方法

## Example
```js
console.log(round(4.99)) // 5
console.log(round(4.99, 2)) // 4.99
console.log(round(4.99, 1)) // 5
```
