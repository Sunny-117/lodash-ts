# baseEachRight 

## Description 
和 [baseEach](./baseEach.md) 类似，区别在于从右到左
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
import baseForOwnRight from './baseForOwnRight.js'
import isArrayLike from '../isArrayLike.js'
```
> [baseForOwnRight 源码分析](./baseForRight.md)
> <br/>
> <br/>
> [isArrayLike 源码分析](../export/isArrayLike.md)
>

## Code
```js
function baseEachRight(collection, iteratee) {
  if (collection == null) {
    return collection
  }
  if (!isArrayLike(collection)) {
    return baseForOwnRight(collection, iteratee)
  }
  const iterable = Object(collection)
  let length = collection.length

  while (length--) {
    if (iteratee(iterable[length], length, iterable) === false) {
      break
    }
  }
  return collection
}
```
## Analyze
和 [baseEach](./baseEach.md) 类似，区别在于 调用方法不同 （`baseForOwnRight`），以及 `while` 循环条件为 `length--`，实现从右到左，使用 while 循环，依旧可以处理 稀疏数组
## Remark
1. [break MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/break)
## Example
```js
const a = {a: 1, b: 2, c: 3}
const b = [1,2,3]
let c = 0;
let d = c;

baseEachRight(a, (val) => {c+=val})
baseEachRight(b, (val) => {d+=val})

console.log(c) // 6
console.log(d) // 6

```
