# isIndex 

## Description 
检查 `value` 是否为有效的类数组索引
## Params
`(value, length)`
> length - 有效地索引上限，一般就是数组的length
>

## Return
`Boolean`

## Code
```js
const MAX_SAFE_INTEGER = 9007199254740991

const reIsUint = /^(?:0|[1-9]\d*)$/

function isIndex(value, length) {
  const type = typeof value
  length = length == null ? MAX_SAFE_INTEGER : length

  return !!length &&
    (type === 'number' ||
      (type !== 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length)
}
```
## Analyze

`/^(?:0|[1-9]\d*)$/` 正则匹配了 0 或者 1-9 开头的数字，但是 00 ， 01 ， 02 这种不会匹配，[1-9] 之后跟 \d 是为了 匹配 10， 20 这种数字

<img  :src="$withBase('/assets/reg_isIndex.svg')" />

1. 首先获取传入的 value 的type 类型， 处理length ，如果没有传入length，则取最大安全整数，否则取length
2. 使用 !! 将length 转为 Boolean 类型
    - 如果 length 存在，并且不为 0
    - 如果 value 类型 为 Number 或者 type !== symbol 并且 通过正则匹配，因为 symbol 不会隐式转换为字符串，所以需要剔除掉 symbol类型的值
    - value 如果 为 number 的情况下，value > -1 并且 value 不为小数 ，并且 value < length
3. 第2条条件全部满足的情况下，返回true，否则返回 false
## Remark
1. [Number.MAX_SAFE_INTEGER  MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER)
2. !! 双重非运算符，是显式地将任意值强制转换为其对应的布尔值
## Example
```js
isIndex(1,9) // true
isIndex(19,9) // false
isIndex(9007199254740992) // false
```
