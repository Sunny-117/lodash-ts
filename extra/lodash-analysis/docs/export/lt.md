# lt

## Description
检查 value 是否小于 other

## Params
`(value, other)`

## Return
`Boolean`

## Code
```js
function lt(value, other) {
  if (!(typeof value === 'string' && typeof other === 'string')) {
    value = +value
    other = +other
  }
  return value < other
}
```
## Analyze
和 [gt](./gt.md) 类似，不再赘述

## Example
```js
lt(1, 3)
// => true

lt(3, 3)
// => false

lt(3, 1)
// => false
```
