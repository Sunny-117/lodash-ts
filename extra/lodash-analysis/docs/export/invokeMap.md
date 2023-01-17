# invokeMap

## Description
调用 path（路径）上的方法处理 collection(集合) 中的每个元素，返回一个数组，包含每次调用方法得到的结果。任何附加的参数提供给每个被调用的方法。如果 methodName（方法名）是一个函数，每次调用函数时，内部的 this 指向集合中的每个元素。

## Params
`(collection, path, args)`

## Return
`Array`

## Depend
```js
import baseEach from './.internal/baseEach.js'
import invoke from './invoke.js'
import isArrayLike from './isArrayLike.js'
```
> [baseEach 源码分析](../internal/baseEach.md)
> <br/>
> <br/>
> [invoke 源码分析](./invoke.md)
> <br/>
> <br/>
> [isArrayLike 源码分析](./isArrayLike.md)

## Code
```js
function invokeMap(collection, path, args) {
  let index = -1
  const isFunc = typeof path === 'function'
  const result = isArrayLike(collection) ? new Array(collection.length) : []

  baseEach(collection, (value) => {
    result[++index] = isFunc ? path.apply(value, args) : invoke(value, path, args)
  })
  return result
}
```

## Analyze
1. 判断了传入的 `path` 是否本身就是一个 `function` 
   
2. 同时判断了 传入的 `collection` 是否为一个类数组，如果是类数组，则 `new` 一个 等长的数组，否则 设置 `result` 为 空数组
3. 使用 `baseEach` 进行遍历，进行了判断，如果传入的 `path` 是一个函数，则直接使用 `path.apply` ，这里绑定的 `this` 是 `value`。否则使用 `invoke` 拿到 `path` 路径对应的函数，在执行
4. 在遍历完成后，返回 `result`
5. 有一点需要注意，如果 `path` 是路径的话，那么 `forEach` 遍历时，每次 `invoke` 调用的其实是相对于 `collection` 一级的属性路径
    ```js
    const obj = {
      a: {
        b: {
          c: 1
        }
      },
      b: {
        c: {
          d: Object.prototype.toString
        }
      },
      c: 1
    }
    ```
    假设传入的是 `c.d`, 其实每次调用就相当于调用了  `obj.a.c.d`  `obj.b.c.d` ...

## Example
```js
const obj = {
  a: {
    b: {
      c: 1
    }
  },
  b: {
    c: {
      d: Object.prototype.toString
    }
  },
  c: 1
}

console.log(invokeMap(obj, Object.prototype.toString)) // [ '[object Object]', '[object Object]', '[object Number]' ]
console.log(invokeMap(obj, 'c.d')) // [ undefined, '[object Object]', undefined ]
```
