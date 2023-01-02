# add

## Description 
加法操作，两个数相加
## Params
`(augend, addend)`
> {Number} augend 第一个数
> 
> {Number} addend 第二个数
> 


## Return
`Number`

## Depend
```js
import createMathOperation from './.internal/createMathOperation.js'
```
> [createMathOperation 源码分析](../internal/createMathOperation.md)

## Code
```js
const add = createMathOperation((augend, addend) => augend + addend, 0)
```

## Analyze
1. 调用 `createMathOperation` 方法创建了一个函数
2. 传递给 `createMathOperation` 方法两个参数，分别为加法操作的箭头函数和默认值0

## Remark
> 求两个数 a 与 b 的和时，第一个数 a 叫被加数(augend)，第二个数 b 叫加数(addend)。

## Example
```js
    add(4,6) => 10
```
