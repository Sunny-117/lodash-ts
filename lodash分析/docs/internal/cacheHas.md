# cacheHas 

## Description 
在指定的 cache 中查找有没有指定的 key
## Params
`(cache, key)`
## Return
`Boolean`

## Code
```js
function cacheHas(cache, key) {
  return cache.has(key)
}
```
## Analyze
本质就是调用传入的 `cache` 实例的 `has` 方法进行判断

e.g [MapCache](./mapCache.md) 、 [Hash](./hash.md) 等
## Remark
1. [Map.prototype.has() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/has)
2. [Set.prototype.has() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/has)
## Example
```js
const a = new Map
a.set('key', undefined)

cacheHas(a, 'key') // true
```
