# parent 

## Description 
获取 `path` 路径的父级

e.g
```js
const a = {
  b: {
    c: 1
  }
}
```

取 `['b','c']` , 就会得到 `{c: 1}`
## Params
`(object, path)`
> {Array} path
>

## Return
`{*}`
## Depend
```js
import baseGet from './baseGet.js'
import slice from '../slice.js'
```
> [baseGet 源码分析](./baseGet.md)
> <br/>
> <br/>
> [slice 源码分析](../export/slice.md)

## Code
```js
function parent(object, path) {
  return path.length < 2 ? object : baseGet(object, slice(path, 0, -1))
}
```
## Analyze
1. 如果 `path` 的个数小于2，也就是 1或者0时，返回 `object` 本身
2. 大于2的情况下，通过 `slice` 将最后一位截掉，然后使用 `baseGet` 获取对应的值，也就是拿到最后一位的父级
## Remark
这里并没有判断 path 路径的合法性，所以 path 最后一个元素，不合法的情况下，也是会返回结果的
## Example
```js
const a = {
  a: {
    b: {
      c: 1
    }
  }
}

console.log(parent(a, ['a', 'b', 'd'])) // { c: 1 }
console.log(parent(a, ['a', 'b', 'c'])) // { c: 1 }
```
