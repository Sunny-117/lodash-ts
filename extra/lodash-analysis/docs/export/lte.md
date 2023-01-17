# lte

## Description
检查 value 是否小于等于 other

## Params
`(value, other)`

## Return
`Boolean`

## Code
```js
function lte(value, other) {
  if (!(typeof value === 'string' && typeof other === 'string')) {
    value = +value
    other = +other
  }
  return value <= other
}
```

## Analyze
和 [gte](./gte.md) 类似，不再赘述

## Example
```js
lte(1, 3)
// => true

lte(3, 3)
// => true

lte(3, 1)
// => false

```
