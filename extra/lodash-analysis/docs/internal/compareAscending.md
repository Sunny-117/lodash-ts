# compareAscending 

## Description 
比较值以按升序对它们进行排序。
## Params
`(value, other)`
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
function compareAscending(value, other) {
  if (value !== other) {
    const valIsDefined = value !== undefined
    const valIsNull = value === null
    const valIsReflexive = value === value
    const valIsSymbol = isSymbol(value)

    const othIsDefined = other !== undefined
    const othIsNull = other === null
    const othIsReflexive = other === other
    const othIsSymbol = isSymbol(other)

    const val = typeof value === 'string'
      ? value.localeCompare(other)
      : -other

    if ((!othIsNull && !othIsSymbol && !valIsSymbol && val > 0) ||
        (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
        (valIsNull && othIsDefined && othIsReflexive) ||
        (!valIsDefined && othIsReflexive) ||
        !valIsReflexive) {
      return 1
    }
    if ((!valIsNull && !valIsSymbol && !othIsSymbol && val < 0) ||
        (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
        (othIsNull && valIsDefined && valIsReflexive) ||
        (!othIsDefined && valIsReflexive) ||
        !othIsReflexive) {
      return -1
    }
  }
  return 0
}
```
## Analyze
1. 首先定义 value 和 other 的各种状态
    - IsDefined 是否传值了
    - IsNull 是否为 null
    - Reflexive 是为了判断是否为 NaN
    - IsSymbol 是否 symbol 类型
2. 这里判断了 value 是否为 string 类型，然后如果 value 为 string ，则使用 localeCompare 方法来确定排序，如果 value 不是 string 类型，则使用 一元负号 转换 other ，赋值给 val
3. 进行判断，如果满足以下任一一条，都返回 1
    - `(!othIsNull && !othIsSymbol && !valIsSymbol && val > 0)`
        - other 不是null 
        - other 也不是 symbol
        - value 也不是 symbol 
        - val 大于 0
    - `(valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol)`
        - value 是 symbol
        - other 有值
        - other 不是 NaN
        - other 不是 null
        - other 不是 symbol
    - `(valIsNull && othIsDefined && othIsReflexive)`
        - value 是 null
        - other 有值
        - other 不是 NaN
    - `(!valIsDefined && othIsReflexive)`
        - value 没有定义
        - other 不是 NaN
    - `!valIsReflexive` - value 为 NaN
4. 如果第三条不满足，则判断以下条件，满足任一一条，则返回 -1
    - `(!valIsNull && !valIsSymbol && !othIsSymbol && val < 0)`
        - value 不是 null
        - value 不是 symbol
        - other 不是 symbol
        - val 小于 0
    - `(othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol)`
        - other 是 symbol
        - value 有值
        - value 不是 NaN
        - value 不是 null
        - value 不是 symbol
    - `(othIsNull && valIsDefined && valIsReflexive)`
        - other 是 null
        - value 有值
        - value 不是 NaN
    - `(!othIsDefined && valIsReflexive)`
        - other 未定义
        - value 不是 NaN
    - `!othIsReflexive` - other 为 NaN
5. 可以看到 ，第四条和 第一条的判断条件是反过来的
6. 如果这些判断条件都不满足，或者 `value === other` ，则会返回 0
## Remark
1. [一元负号](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#%E4%B8%80%E5%85%83%E8%B4%9F%E5%8F%B7_-) 和一元正号一样，都会将变量转为Number 类型，一元负号还会改变变量的符号
2. [String.prototype.localeCompare() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare) 方法返回一个数字来指示一个参考字符串是否在排序顺序前面或之后或与给定字符串相同。引用字符串调用localeCompare方法与比较字符串进行对比
    - 返回一个数字表示是否 引用字符串 在排序中位于 比较字符串 的前面，后面，或者二者相同。
        - 当 引用字符串 在 比较字符串 前面时返回 -1
        - 当 引用字符串 在 比较字符串 后面时返回 1
        - 相同位置时返回 0
    - 切勿依赖于 -1 或 1 这样特定的返回值。不同浏览器之间（以及不同浏览器版本之间） 返回的正负数的值各有不同，因为 W3C 规范中只要求返回值是正值和负值，而没有规定具体的值。一些浏览器可能返回 - 2 或 2 或其他一些负的、正的值。
   
3. 这里的排序处理有点问题
```js
    const val = typeof value === 'string'
      ? value.localeCompare(other)
      : -other
```
对于这里如果默认升序的话，应当是
```js
    const val = typeof value === 'string'
      ? value.localeCompare(other)
      : value - other
```

是在 [这次](https://github.com/lodash/lodash/commit/47a6d538f5759fc5788f1bbb147caa7fde6b0a92) 提交的修改中出现的问题

目前(2021-02-25) 还没有修复

## Example
```js
console.log(compareAscending(3, 'aaa')) // 0
console.log(compareAscending('bb', 'aaa')) // 1
console.log(compareAscending('a', 'aaa')) // -1
console.log(compareAscending('a', {})) // 1
console.log(compareAscending({}, {})) // 0
```
