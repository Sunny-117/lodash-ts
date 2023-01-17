# isNull

## Description
检查 value 是否是 null。

## Params
`value`

## Return
`Boolean`

## Code
```js
function isNull(value) {
  return value === null
}
```

## Analyze
使用 三等判断 即可

`undefined === null` 返回 `false`

## Example
```js
isNull(null)
// => true

isNull(void 0)
// => false
```
