# addMapEntry 

## Description 
将 键-值对 添加到 Map 中
## Params
`(map, pair)`
> {Array} pair - 键值对
>

## Return
`Map`

## Code
```js
function addMapEntry(map, pair) {
  // Don't return `map.set` because it's not chainable in IE 11.
  map.set(pair[0], pair[1])
  return map
}
```
## Analyze
addMapEntry 就十分的简单，调用 map.set ，key 为数组第一项， value 为数组第二项，最后返回 map
## Remark
1. [Map.prototype.set() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/set) 方法为 Map 对象添加或更新一个指定了键（key）和值（value）的（新）键值对。
2. **此方法在 lodash中 并未得到使用**
## Example
```js
const a = new Map

console.log(addMapEntry(a, ['key', 'value'])) // Map { 'key' => 'value' }
```
