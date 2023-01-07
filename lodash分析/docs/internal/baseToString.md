# baseToString

## Description 
转换为字符串(`toString` 的实现)，不会转换为 `null`，并且如果 `value` 为 `-0`, 会返回 `'-0'`，这一点和 `js` 本身不同。（[关于 js 转换 +0 和 -0](https://262.ecma-international.org/6.0/#sec-tostring-applied-to-the-number-type) , 参考第二条 _If m is +0 or −0, return the String "0"._）

## Params
`value`
## Return
`String`

## Depend
```js
    import isSymbol from '../isSymbol.js'
```

> [isSymbol 源码解析](../export/isSymbol.md)
> 


## Code
```js
    /** Used as references for various `Number` constants. */
    const INFINITY = 1 / 0
    
    /** Used to convert symbols to primitives and strings. */
    const symbolToString = Symbol.prototype.toString
    
    function baseToString(value) {
      // Exit early for strings to avoid a performance hit in some environments.
      if (typeof value === 'string') {
        return value
      }
      if (Array.isArray(value)) {
        // Recursively convert values (susceptible to call stack limits).
        return `${value.map(baseToString)}`
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : ''
      }
      const result = `${value}`
      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result
    }
```

## Analyze
1. `value` 为 `string` 时，直接返回 `value`
2. `value` 为 `array`， 递归调用当前方法，返回 `string`
3. `value` 为 `symbol`，调用 `Symbol.prototype.toString.call(value)`，转换为字符串
4. 调用模板字符串将`value`转换为`string`，赋值给`result`；
5. 进行三目运算符判断，如果`result`为 `'0'`, 如果 `value` 本身为 `-0`, 则返回 `'-0'`, 否则返回 `result`
## Remark
1. 主要是根据参数类型进行了不同的处理，并且最终转换字符串返回
2. [toString MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/toString)
3. 其他类型的 `toString MDN` 参考 [toString 源码分析](../export/toString.md) **Remark**
4. [模板字面量(模板字符串) MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/template_strings)
5. [Number.NEGATIVE_INFINITY MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/NEGATIVE_INFINITY)
6. [Number.POSITIVE_INFINITY MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/POSITIVE_INFINITY)

## Example
```js
    baseToString('3') // '3'
    baseToString(Symbol(1)) // 'Symbol(1)'
    baseToString([1,2,3]) // '[1,2,3]'
```
