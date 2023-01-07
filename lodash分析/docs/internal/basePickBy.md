# basePickBy 

## Description 
pickBy的基本实现。

### pickBy
> 创建一个对象，这个对象组成为从 object 中经 predicate 判断为真值的属性。 predicate 调用 2 个参数：(value, key)。
>

## Params
`(object, paths, predicate)`
> {Object} object - 源对象。
>
> {string[]} paths - 属性路径选择。
>
> {Function} predicate - 每个属性调用的函数。
>

## Return
`Object`
## Depend
```js
import baseGet from './baseGet.js'
import baseSet from './baseSet.js'
import castPath from './castPath.js'
```
> [baseGet 源码分析](./baseGet.md)
> <br/>
> <br/>
> [baseSet 源码分析](./baseSet.md)
> <br/>
> <br/>
> [castPath 源码分析](./castPath.md)
>

## Code
```js
function basePickBy(object, paths, predicate) {
  let index = -1
  const length = paths.length
  const result = {}

  while (++index < length) {
    const path = paths[index]
    const value = baseGet(object, path)
    if (predicate(value, path)) {
      baseSet(result, castPath(path, object), value)
    }
  }
  return result
}
```
## Analyze
1. 初始化一个空对象
2. while 循环 遍历 `paths` ，拿到对应的 `path` ，调用 `baseGet` 拿到 `object` 上 对应 `path` 的 `value` 值
3. 如果 `value` 和 `path` 经过了 `predicate` 函数的检验，返回值为真值，则使用 `baseSet` 将  `path` 和 `value` 设置到 `result` 对象中
4. 这里会对 `path` 调用 `castPath` 方法 做处理
## Remark
本质也就是 拿到值之后根据 `predicate` 函数判断，决定要不要将 `value` 设置到 `result` 中
## Example
```js
const func = (value, path) => value != null && path != null

const a = {
  a: 1,
  b: 2,
  c: 3,
  d: {
    e: 4
  }
}

console.log(basePickBy(a, ['a', 'd'], func)) // { a: 1, d: { e: 4 } }
```
