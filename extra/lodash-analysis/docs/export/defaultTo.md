# defaultTo 

## Description 
检查 value，以确定一个默认值是否应被返回。如果 value 为 NaN, null, 或者 undefined，那么返回 defaultValue 默认值。
## Params
`(value, defaultValue)`
## Return
`{*}`

## Code
```js
function defaultTo(value, defaultValue) {
  return (value == null || value !== value) ? defaultValue : value
}
```
## Analyze
1. 三目运算判断，如果 value 为 null， undefined ，或者 value 为 NaN , 则返回 默认值，否则返回 value 本身
## Remark
1. 等式 (x !== x) 成立的唯一情况是 x 的值为 NaN
2. `undefined == null` 结果为 `true`
## Example
```js
defaultTo(1, 10) // => 1
 
defaultTo(undefined, 10) // => 10
```
