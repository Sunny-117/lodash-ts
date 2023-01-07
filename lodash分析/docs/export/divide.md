# divide 

## Description 
两个数相除
## Params
`(dividend, divisor)`
> dividend 被除数
>
> divisor 除数
>

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
const divide = createMathOperation((dividend, divisor) => dividend / divisor, 1)
```
## Analyze
和 [add](./add.md) 逻辑一致，都是调用 createMathOperation 传入operator函数，然后经过参数的处理，返回operator调用的结果，这里如果 除数与被除数 都没有传入，会返回默认值 1
## Remark
1. [除法 (/) MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Division)
## Example
```js
divide(6, 4) // => 1.5
```
