# isNil

## Description
检查 value 是否是 null 或者 undefined。

## Params
`value`

## Return
`Boolean`

## Code
```js
function isNil(value) {
  return value == null
}
```

## Analyze
也就是使用双等判断  

`undefined == null`  返回 `true`

## Example
```js
isNil(null)
// => true

isNil(void 0)
// => true

isNil(NaN)
// => false
```
