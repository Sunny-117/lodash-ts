# multiply 

## Description 
两个数相乘。
## Params
`(multiplier, multiplicand)`
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
const multiply = createMathOperation((multiplier, multiplicand) => multiplier * multiplicand, 1)
```
## Analyze
和 [divide](./divide.md) 一致，只不过operator函数换成了乘法
## Remark
1. [乘法 (*)](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Multiplication)
## Example
```js
multiply(6, 4) // => 24
```
