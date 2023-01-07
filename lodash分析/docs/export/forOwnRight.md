# forOwnRight

## Description
这个方法类似 [forOwn](./forOwn.md)。 除了它是反方向开始遍历 object 的。
## Params
`(object, iteratee)`

## Code
```js
function forOwnRight(object, iteratee) {
  if (object == null) {
    return
  }
  const props = Object.keys(object)
  let length = props.length
  while (length--) {
    iteratee(object[props[length]], iteratee, object)
  }
}
```
## Analyze
如果没有传入 `object` 或者 `object` 为 `undefined` ，则结束函数

通过 `Object.keys` 拿到 可遍历的属性数组， 通过 `while` 循环，递减 `length` 进行遍历

而且按照道理而言，代码这里有错误， `iteratee` 函数的第二个参数应该是 `props[length]`，传递的应当是当前的 `key`
```js
function forOwnRight(object, iteratee) {
  if (object == null) {
    return
  }
  const props = Object.keys(object)
  let length = props.length
  while (length--) {
    iteratee(object[props[length]], props[length], object)
  }
}
```

## Example
按照修改之后的代码进行测试
```js
const a = {a:1,b:2,c:3}
console.log(forOwnRight(a, (v, i, obj) => {
  if (v < 2) {
    obj[i] = ['小于2']
    return false
  }
  obj[i] = [i]
}))
console.log(a) // { a: [ '小于2' ], b: [ 'b' ], c: [ 'c' ] }
```
