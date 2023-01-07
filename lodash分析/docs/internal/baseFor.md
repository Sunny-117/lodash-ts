# baseFor 

## Description 
[baseForOwn](./baseForOwn.md) 的基本实现，它迭代由 keysFunc 返回的 object 属性，并为每个属性调用 iteratee 。

Iteratee 如果返回 false 则会结束迭代
## Params
`(object, iteratee, keysFunc)`
> Object
>
> iteratee - 每次迭代调用的函数
>
> keysFunc - 获取“object”键的函数
>

## Return
`Object`

## Code
```js
function baseFor(object, iteratee, keysFunc) {
  const iterable = Object(object)
  const props = keysFunc(object)
  let { length } = props
  let index = -1

  while (length--) {
    const key = props[++index]
    if (iteratee(iterable[key], key, iterable) === false) {
      break
    }
  }
  return object
}
```
## Analyze
1. 首先通过 `Object 构造函数`包装 `object` 为一个新对象，避免基础类型报错
2. 通过传入的 `keysFunc` 拿到 `object` 所有的 `key` 值数组，并且拿到 数组的长度
3. `while` 循环遍历，结束条件 `length--`
4. 从 `props` 拿到对应的下标，和 `while` 的条件相反，`while` 是递减，这里取 `key` 是递增
5. 判断 `iteratee` 函数的执行结果是否为 `false`，如果为 `false` ，则结束迭代
6. `iteratee` 函数参数分别为 当前key所对应的 `value` ，当前 `key` ， 包装之后的对象
## Remark
baseFor 是用来实现对象属性和值遍历的基础方法。在遍历时，会调用 iteratee 函数，如果 iteratee 函数返回 false ，则会退出遍历。

baseFor 中 iterable 和 原对象object指向同一内存空间，所以会同步的修改对应的值
## Example
```js
const a = []
baseFor({a:1, b:2,c:3}, (value, key) => a.push([value, key]), Object.keys)
console.log(a) // [ [ 1, 'a' ], [ 2, 'b' ], [ 3, 'c' ] ]
```
