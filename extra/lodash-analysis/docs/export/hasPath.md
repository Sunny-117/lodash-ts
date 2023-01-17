# hasPath

## Description
hasPath 用于检测 object 上是否存在路径 path 。
## Params
`(object, path)`
## Return
`Boolean`
## Depend
```js
import castPath from './.internal/castPath.js'
import isArguments from './isArguments.js'
import isIndex from './.internal/isIndex.js'
import isLength from './isLength.js'
import toKey from './.internal/toKey.js'
```
> [castPath 源码分析](../internal/castPath.md)
> <br/>
> <br/>
> [isArguments 源码分析](./isArguments.md)
> <br/>
> <br/>
> [isIndex 源码分析](../internal/isIndex.md)
> <br/>
> <br/>
> [isLength 源码分析](./isLength.md)
> <br/>
> <br/>
> [toKey 源码分析](../internal/toKey.md)

## Code
```js
const hasOwnProperty = Object.prototype.hasOwnProperty
function hasPath(object, path) {
  path = castPath(path, object)

  let index = -1
  let { length } = path
  let result = false
  let key

  while (++index < length) {
    key = toKey(path[index])
    if (!(result = object != null && hasOwnProperty.call(object, key))) {
      break
    }
    object = object[key]
  }
  if (result || ++index != length) {
    return result
  }
  length = object == null ? 0 : object.length
  return !!length && isLength(length) && isIndex(key, length) &&
    (Array.isArray(object) || isArguments(object))
}

```
## Analyze
1. 首先通过 `castPath` 将 `path` 转为 路径数组
   
2. `while` 循环遍历，使用 `toKey` 将 `path[index]` 转为合法的属性 `key`，每次都会判断 `object` 不为 `null` 或者 `undefined`，并且在其原型上存在 `key`，将判断的结果赋值给 `result`
3. 如果 `result` 为 `false`， 则跳出循环，否则将 `object[key]` 赋值给 `object`，更新到下一层
4. 如果 `result` 为 `true` 或者 `++index != length`，也就是说 如果 `result` 为 `true` 则表示遍历完了，直接返回结果即可 
5. 也有可能遍历完了 `result` 不为 `true` 的，那就判断 当前遍历完成的下标+1 是不是等于 `length`，如果不等于，就说明 `while` 循环没有走完，在中途就退出了，那就说明 `path` 不在 `object` 中， 当然也是直接返回 `result`
6. 最终也有可能出现 `result` 为 `false`，并且 `++index == length` 的情况
    ```js
    hasPath(new Array(5), 4)
    ```
   此时 `result` 的结果就是 `false` ，但是 `++index == length`，对于稀疏数组的判断 `Object.prototype.hasOwnProperty.call` 返回的是 `false`
7. 所以最后这里 对于稀疏数组和 `arguments` 做了处理。也就是如果 `while` 循环到最后的 `object` 存在 `length`， `length` 有值 ，并且 `length` 是合法的， 最后的 `key` 是 合法的索引，然后 最后的 `object` 是 数组或者 `arguments` 对象 的话，那么也认为是 `path` 路径是合法的
    ```js
    const temp = {
      a: {
        b: {
          c: new Array(5)
        }
      }
    }
    
    console.log('temp', hasPath(temp, 'a.b.c.4')) // true
    ```
## Remark
1. [Object.prototype.hasOwnProperty() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty) 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）。

## Example
```js
const a = {
  a: {
    b: 1
  }
}

const temp = {
  a: {
    b: {
      c: new Array(5)
    }
  }
}

const arr = new Array(5)
console.log(hasPath(arr, 4)) // true
console.log(hasPath(a, ['a', 'b'])) // true
console.log(hasPath(temp, 'a.b.c.4')) // true
```
