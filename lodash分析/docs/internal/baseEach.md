# baseEach 

## Description 
baseEach 和 forEach 基本一致，不同在于 baseEach 可以遍历对象
## Params
`(collection, iteratee)`
> {Array|Object} collection
>
> iteratee - 每次迭代调用的函数
>

## Return
`{Array|Object}`
## Depend
```js
import baseForOwn from './baseForOwn.js'
import isArrayLike from '../isArrayLike.js'
```
> [baseFormOwn 源码分析](./baseForOwn.md)
> <br/>
> <br/>
> [isArrayLike 源码分析](../export/isArrayLike.md)
>

## Code
```js
function baseEach(collection, iteratee) {
  if (collection == null) {
    return collection
  }
  if (!isArrayLike(collection)) {
    return baseForOwn(collection, iteratee)
  }
  const length = collection.length
  const iterable = Object(collection)
  let index = -1

  while (++index < length) {
    if (iteratee(iterable[index], index, iterable) === false) {
      break
    }
  }
  return collection
}
```
## Analyze
1. 判断如果传入的 `collection` 为 `null` 或 `undefined` ，直接返回 `collection`
2. 如果传入的 `collection` 不是一个类数组（不是一个函数，并且 `length` 是个 大于等于 0 小于或等于 9007199254740991 的整数）则调用 `baseForOwn` 进行迭代处理
3. 如果传入 `collection` 为类数组，首先获取到 length 然后进行遍历即可
4. 和 `Array.prototype.forEach` 不同的是，如果 `iteratee` 返回 `false` 会退出迭代，并且同时也会处理 稀疏数组
## Remark
1. [Object () 构造函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/Object) 将给定的值包装为一个新对象
    - 如果给定的值是 null 或 undefined, 它会创建并返回一个空对象。
    - 否则，它将返回一个和给定的值相对应的类型的对象。
    - 如果给定值是一个已经存在的对象，则会返回这个已经存在的值（相同地址）。
## Example
```js
const a = {a: 1, b: 2, c: 3}
const b = [1,2,3]
let c = 0;
let d = c;

baseEach(a, (val) => {c+=val})
baseEach(b, (val) => {d+=val})

console.log(c) // 6
console.log(d) // 6
```
