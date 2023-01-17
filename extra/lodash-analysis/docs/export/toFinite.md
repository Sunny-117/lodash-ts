# toFinite 

## Description 
转换 `value` 为一个有限数字。
## Params
`Value`
## Return
`Number`
## Depend
```js
import toNumber from './toNumber.js'
```
> [toNumber 源码分析](./toNumber.md)
>

## Code
```js
/** Used as references for various `Number` constants. */
const INFINITY = 1 / 0
const MAX_INTEGER = 1.7976931348623157e+308

function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0
  }
  value = toNumber(value)
  if (value === INFINITY || value === -INFINITY) {
    const sign = (value < 0 ? -1 : 1)
    return sign * MAX_INTEGER
  }
  return value === value ? value : 0
}
```
## Analyze
1. 判断 `value` 如果是 `falsely`，则全部返回为 `0`，这里使用了
```js
return value === 0 ? value : 0
```

是为了判断 `-0` 的情况， 如果 `value` 是 `-0` 或者 `0` ，都会返回 `value` 本身

2. 调用 `toNumber` 将 `value` 转换为数字
3. 判断了 `value` 是否已经超出了最大限制（js中的正负无穷大），如果是，获取 当前 `value` 的 符号（+-），然后返回 `JavaScript` 里所能表示的最大值或最小值
4. 这里处理了`NaN` , 会返回 `0`，在 `JavaScript` 中 `NaN` 和 `NaN` 是不相等的

## Remark
1. [Number.MAX_VALUE MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_VALUE)
2. [Number.MIN_VALUE MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_VALUE)
3. [NaN MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)
4. [Math.sign MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/sign)
5. [JavaScript相等性判断 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness)
> 全等操作符比较两个值是否相等，两个被比较的值在比较前都不进行隐式转换。如果两个被比较的值具有不同的类型，这两个值是不全等的。否则，如果两个被比较的值类型相同，值也相同，并且都不是 number 类型时，两个值全等。最后，如果两个值都是 number 类型，当两个都不是 NaN，并且数值相同，或是两个值分别为 +0 和 -0 时，两个值被认为是全等的。

## Example
```js
toFinite(3.2) // => 3.2

toFinite(Number.MIN_VALUE) // => 5e-324

toFinite(Infinity) // => 1.7976931348623157e+308

toFinite('3.2') // => 3.2
```
