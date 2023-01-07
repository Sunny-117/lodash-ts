# subtract 

## Description 
两数相减
## Params
`(minuend, subtrahend)`
## Return
`number`
## Depend
```js
import createMathOperation from './.internal/createMathOperation.js'
```
> [createMathOperation 源码分析](../internal/createMathOperation.md)
>

## Code
```js
const subtract = createMathOperation((minuend, subtrahend) => minuend - subtrahend, 0)
```
## Analyze
和 [add](./add.md) 基本一致，方法改为了减法
## Remark
1. [Subtraction (-)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Subtraction)
## Example
```js
subtract(6, 4) // => 2
```
