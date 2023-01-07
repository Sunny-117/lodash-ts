# baseFindKey 

## Description 
findKey 和 findLastKey 等方法的基本实现，它们使用 eachFunc 遍历集合。


返回找到的 key 或者 索引，找不到返回 undefined。
## Params
`(collection, predicate, eachFunc)`
> {Array|Object} collection
>
> {Function} predicate - 每次迭代调用的函数
>
> {Function} eachFunc - 遍历 collection 的函数
>

## Return
`{*}` - 找到的 key 或者 undefined

## Code
```js
function baseFindKey(collection, predicate, eachFunc) {
  let result
  eachFunc(collection, (value, key, collection) => {
    if (predicate(value, key, collection)) {
      result = key
      return false
    }
  })
  return result
}
```
## Analyze
1. 调用传入的 `eachFunc` 来遍历对象或数组，这里其实 `eachFunc` 第二个参数就是一个 `function`，需要三个参数 当前值，当前key ，完整数组或对象
```js
// iterate(value, key, collection)
function forEachSelf(collection, iterate) {}
```
2. 在第一步定义的 `iterate` 函数中，会调用传入 `predicate` 来进行判断，如果符合条件就将 `key` 赋值给 `result`，`return false`
3. `return false` 告知外界已经找到了，可以结束遍历了
4. 如果遍历完成还是没有找到对应的值，会返回 `undefined`
## Remark
1. [Array.prototype.findIndex() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
## Example
```js
const a = {a:1,b:2,c:3}
const c = [1,2,3,4,5]


function forEach (collection, iterate) {
  Object.keys(collection).some(k => {
    return iterate(collection[k], k, collection) !== undefined
  })
}

baseFindKey(c, (value)=>value===3, forEach) // 2
baseFindKey(a, (value)=>value===3, forEach) // c

```
