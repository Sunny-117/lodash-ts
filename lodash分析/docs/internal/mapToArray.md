# mapToArray 

## Description 
将 Map 结构转换成 [[key, value]] 的数组
## Params
`{Object} map`
## Return
`Array`

## Code
```js
function mapToArray(map) {
  let index = -1
  const result = new Array(map.size)

  map.forEach((value, key) => {
    result[++index] = [key, value]
  })
  return result
}
```
## Analyze
1. 根据 `map.size` 初始化数组的长度
2. `map.forEach` 遍历，往数组对应的下标中添加对应的 key value 数组
## Remark
1. [Map.prototype.forEach() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/forEach) 方法按照插入顺序依次对 Map 中每个键 / 值对执行一次给定的函数
2. 另一种实现思路
```js
function mapToArray(map) {
  const result = []
  const entries = map.entries()
  while (1) {
    const {value, done} = entries.next()
    if (done) break
    result.push(value)
  }
  return result
}
```
3. [Map.prototype.entries() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/entries) 方法返回一个新的包含 [key, value] 对的 Iterator 对象，返回的迭代器的迭代顺序与 Map 对象的插入顺序相同。
## Example
```js
const map = new Map

for (let i = 0; i < 5; i++) {
  map.set('key'+i, 'value'+i)
}

/**
 *
 * [
 *  [ 'key0', 'value0' ],
 *  [ 'key1', 'value1' ],
 *  [ 'key2', 'value2' ],
 *  [ 'key3', 'value3' ],
 *  [ 'key4', 'value4' ]
 * ]
 *
 * */
console.log(mapToArray(map))

function mapToArraySelf(map) {
  const result = []
  const entries = map.entries()
  while (1) {
    const {value, done} = entries.next()
    if (done) break
    result.push(value)
  }
  return result
}

/**
 *
 * [
 *  [ 'key0', 'value0' ],
 *  [ 'key1', 'value1' ],
 *  [ 'key2', 'value2' ],
 *  [ 'key3', 'value3' ],
 *  [ 'key4', 'value4' ]
 * ]
 *
 * */

console.log(mapToArraySelf(map))

```
