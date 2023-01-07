# forOwn

## Description
使用 iteratee 遍历自身的可枚举属性。 iteratee 会传入 3 个参数：(value, key, object)。 
## Params
`(object, iteratee)`

## Code
```js
function forOwn(object, iteratee) {
  object = Object(object)
  Object.keys(object).forEach((key) => iteratee(object[key], key, object))
}
```
## Analyze
通过 `Object.keys` 拿到可遍历属性数组，调用 数组的 `forEach` 方法，传入 `iteratee` 函数进行处理
## Remark
在 `lodash` 的解释中，说 如果 `iteratee` 返回 `false` ，会提前结束迭代，这一点是错误的  

> Iteratee functions may exit iteration early by explicitly returning false.

[Object.keys](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) 拿到的是一个数组，然后调用数组的 [forEach](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) 方法来进行迭代，在数组的 `forEach`  方法中，有一点很明确 **除了抛出异常以外，没有办法中止或跳出 forEach() 循环。** ， 所以这里 返回 `false` ，也是不能结束循环的
## Example
```js
const a = {a:1,b:2,c:3}
console.log(forOwn(a, (v, i, obj) => {
  if (v < 2) {
    obj[i] = ['小于2']
    return false
  }
  obj[i] = [i]
}))
console.log(a) // { a: [ '小于2' ], b: [ 'b' ], c: [ 'c' ] }
```
