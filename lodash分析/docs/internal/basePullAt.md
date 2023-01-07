# basePullAt 

## Description 
将一个数组 `array` 指定的所有索引 `indexes` 的值从数组中删除，并且返回修改后的数组。
## Params
`(array, indexes)`
## Return
`Array`
## Depend
```js
import baseUnset from './baseUnset.js'
import isIndex from './isIndex.js'
```
> [baseUnset 源码分析](./baseUnset.md)
> <br/>
> <br/>
> [isIndex 源码分析](./isIndex.md)
>

## Code
```js
function basePullAt(array, indexes) {
  let length = array ? indexes.length : 0
  const lastIndex = length - 1

  while (length--) {
    let previous
    const index = indexes[length]
    if (length === lastIndex || index !== previous) {
      previous = index
      if (isIndex(index)) {
        array.splice(index, 1)
      } else {
        baseUnset(array, index)
      }
    }
  }
  return array
}
```
## Analyze
1. 首先，如果传入了 array， 则取 indexes.length ，否则取 0
2. 定义了最后一个元素，也是 while 循环第一个元素的下标
3. while 循环这里，其实就是取出对应的index，然后判断是否为索引，如果是索引，则使用 splice ， 否则使用 baseUnset 删除

### 这里有几点问题需要注意一下
1. lodash 这里的代码 定义了 previous ， 本意是为了判断 `index !== previous`，才会进行删除，但是 定义在 while 循环内部，这个条件就不成立了，每次 previous 都是一个新值 `undefined`，所以正确的应该是

    ```js
    let previous
    while (length--) {
        const index = indexes[length]
        if (length === lastIndex || index !== previous) {
          previous = index
          if (isIndex(index)) {
            array.splice(index, 1)
          } else {
            baseUnset(array, index)
          }
        }
    }
    ```
    
    假设，我们传入的 `indexes` 为 `[0,0,1]`,对于我们而言只是想删除索引为 0 和 1 的元素，假设我们的数组为 `[0,1,2,3]`
    
    如果 `previous` 定义在 `while` 循环内部，则最终返回的结果为 `[3]`
    
    因为每一次都会改变原数组 `array`，所以，删除了 3个 元素，与预期不符
    
    将 `previous` 定义在 `while` 循环外部，可以正确保留上一次 `index`，避免出错

2. `length === lastIndex` 的作用

    假设，我们传入的 `indexes` 为 `[0,1,undefined]`
    
    这里需要明确一点，数组也是一个对象，所以 也是可以有属性值的，比如 类数组也是可以的
    
    在这个时候如果只判断 `index !== previous`,是不严谨的，因为第一次 `previous`，为 `undefined` ，而此时，`index` 也有可能为 `undefined`，所以走不到 if 条件里
    
    此时 `length === lastIndex` 的作用就是说，第一次会执行，即使 `index` 和 `previous` 都是 `undefined`
## Remark
1. 从 `pullAt` 里面的处理可以看出来，对于 `indexes` 是做了排序处理的
2. 最终修改的代码如下
```js
function basePullAt(array, indexes) {
  let length = array ? indexes.length : 0
  const lastIndex = length - 1

  let previous
  while (length--) {
    const index = indexes[length]
    if (length === lastIndex || index !== previous) {
      previous = index
      if (isIndex(index)) {
        array.splice(index, 1)
      } else {
        baseUnset(array, index)
      }
    }
  }
  return array
}
```
## Example
我们按照最终修改之后的代码举例
```js
console.log(basePullAt([1,2,3,4], [0,0,1])) // [ 3, 4 ]
```
