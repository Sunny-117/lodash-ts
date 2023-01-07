# gt

## Description
检查 value 是否大于 other。
## Params
`(value, other)`
## Return
`Boolean`

## Code
```js
function gt(value, other) {
  if (!(typeof value === 'string' && typeof other === 'string')) {
    value = +value
    other = +other
  }
  return value > other
}
```
## Analyze
如果 `value` 和 `other` 其中有一个不是 `string` 类型时，会将其转为 `Number` 类型然后进行比较

最终会返回 `value > other` ,对于 `string` 类型，会逐个字符对比 `ascii`
## Remark
[大于运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Greater_than)
操作数使用抽象关系比较算法进行比较，大致总结如下。

1. 首先，使用 Symbol.ToPrimitive 将对象转换为原始值
2. 如果两个值都是字符串，则根据它们所包含的 Unicode码点 的值，将它们作为字符串进行比较。
3. 否则 JavaScript 会尝试将非数字类型转换为数值。
    - 布尔值 tru e和 false 分别转换为 1 和 0。
    - null 被转换为 0
    - undefined 被转换为 NaN。
    - 字符串根据其包含的值进行转换，如果不包含数值，则转换为 NaN。
4. 如果任何一个值是 NaN，运算符返回 false。
5. 否则，数值将作为数值进行比较。
## Example
```js
console.log(gt('a', 1)) // false
console.log(gt(1, 'a')) // false
console.log(gt(1, 0)) // true
console.log(gt(null, 0)) // false
```
