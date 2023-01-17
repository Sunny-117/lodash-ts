# result

## Description
这个方法类似 [get](./get.md)， 除了如果解析到的值是一个函数的话，就绑定 this 到这个函数并返回执行后的结果。

## Params
`(object, path, defaultValue)`

## Return
`{*}`

## Depend
```js
import castPath from './.internal/castPath.js'
import toKey from './.internal/toKey.js'
```
> [castPath 源码分析](../internal/castPath.md)
> <br/>
> <br/>
> [toKey 源码分析](../internal/toKey.md)

## Code
```js
function result(object, path, defaultValue) {
  path = castPath(path, object)

  let index = -1
  let length = path.length

  // Ensure the loop is entered when path is empty.
  if (!length) {
    length = 1
    object = undefined
  }
  while (++index < length) {
    let value = object == null ? undefined : object[toKey(path[index])]
    if (value === undefined) {
      index = length
      value = defaultValue
    }
    object = typeof value === 'function' ? value.call(object) : value
  }
  return object
}
```

## Analyze
1. 通过 castPath 将 path 转为路径数组
   
2. 处理路径数组为空的情况
    ```js
      if (!length) {
        length = 1
        object = undefined
      }
    ```
    将 `length` 置为 1， 将 object 置为 `undefined`，这里这么处理是为了在 `while` 循环中处理 `defaultValue` 的情况
3. while 循环遍历
    ```js
      while (++index < length) {
        let value = object == null ? undefined : object[toKey(path[index])]
        if (value === undefined) {
          index = length
          value = defaultValue
        }
        object = typeof value === 'function' ? value.call(object) : value
      }
    ```
    
    在 `object` 为 `null` 或者 `undefined` 的情况下， `value` 就为 `undefined` ，否则的话 取出当前 `path` 对应的值

    判断 如果 `value` 为 `undefined`，则将 `length` 赋值给 `index` ，也就是结束循环，将 `defaultValue` 的值赋值给 `value`

    最后会判断，如果 `value` 是一个 方法，则调用这个方法，将返回的值 赋值给 `object` ，否则将当前的 `value` 赋值给 `object`
4. 最后 返回 `object` 

## Example
```js
const obj = {
  a: {
    b: {
      c: () => 'Empty'
    }
  }
}

console.log(result(obj, 'a.b.c')) // Empty
console.log(result(obj, 'a.c', 'default')) // default
```
