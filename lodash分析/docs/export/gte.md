# gte

## Description
检查 value 是否大于或者等于 other。
## Params
`(value, other)`
## Return
`Boolean`

## Code
```js
function gte(value, other) {
  if (!(typeof value === 'string' && typeof other === 'string')) {
    value = +value
    other = +other
  }
  return value >= other
}
```
## Analyze
和 [gt](./gt.md) 基本一致，比较运算符换为了 `>=`

## Example
```js
console.log(gte(null, 0)) // true
console.log(gte('0', 0)) // true
console.log(gte('0', '0')) // true
```
