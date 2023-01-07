# set

## Description
设置 object 对象中对应 path 属性路径上的值，如果 path 不存在，则创建。 缺少的索引属性会创建为数组，而缺少的属性会创建为对象。 

## Params
`(object, path, value)`

## Return
`Object`

## Depend
```js
import baseSet from './.internal/baseSet.js'
```
> [baseSet 源码分析](../internal/baseSet.md)

## Code
```js
function set(object, path, value) {
  return object == null ? object : baseSet(object, path, value)
}
```

## Analyze
最终是通过 `baseGet` 进行值的获取，如果 `object` 为 `null` 或者 `undefined` ，则返回 `object` 本身

## Example
```js
console.log(set({}, 'a', '3')) // { a: '3' }
```
