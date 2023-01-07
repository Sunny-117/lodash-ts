# baseToNumber

## Description 
转换为数字，`toNumber` 的基本实现

## Params
`value`
## Return
`Number`

## Depend
```js
    import isSymbol from '../isSymbol.js'
```

> [isSymbol 源码分析](../export/isSymbol.md)
> 


## Code
```js
    /** Used as references for various `Number` constants. */
    const NAN = 0 / 0
    
    function baseToNumber(value) {
      if (typeof value === 'number') {
        return value
      }
      if (isSymbol(value)) {
        return NAN
      }
      return +value
    }
```

## Analyze
1. `value` 为 `number`， 直接返回 `value`
2. `value` 为 `symbol`， 返回 `NaN`
3. 否者直接返回 `+value`（一元正号运算符）

## Remark
1. [Number MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)
2. [一元正号 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#%E4%B8%80%E5%85%83%E6%AD%A3%E5%8F%B7)

## Example
```js
    baseToNumber(1) // 1
    baseToNumber('3') // 3
```
