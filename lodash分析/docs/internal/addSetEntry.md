# addSetEntry 

## Description 
给 Set 添加 value
## Params
`(set, value)`
## Return
`Set`

## Code
```js
function addSetEntry(set, value) {
  // Don't return `set.add` because it's not chainable in IE 11.
  set.add(value)
  return set
}
```
## Analyze
根本也是 调用 `set.add` 给 `set` 中添加 值，最后返回 `set`
## Remark
1. [Set.prototype.add() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/add) 方法用来向一个 Set 对象的末尾添加一个指定的值
2. **此方法在 lodash中 并未得到使用**
## Example
```js
const a = new Set

console.log(addSetEntry(a, 'value')) // Set { 'value' }
```
