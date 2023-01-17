# isUndefined

## Description
检查 value 是否是 undefined。

## Params
`value`

## Return
`Boolean`

## Code
```js
function isUndefined(value) {
  return value === undefined
}
```

## Analyze
使用 三等判断 即可

`undefined === null` 返回 `false`

## Example
```js
 isUndefined(void 0)
 // => true

 isUndefined(null)
 // => false
```
