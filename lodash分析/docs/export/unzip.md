# unzip

## Description
unzip 的作用是接收一个二维数组 array，返回一个新的二维数组 result，result 中的第一个元素，是由 array 中所有的数组的第一个元素组成，result 的第二个元素，由 array 中所有数组的第二个元素组成，依此类推。

这个方法类似于 [zip](./zip.md)，除了它接收分组元素的数组，并且创建一个数组，分组元素到打包前的结构。（：返回数组的第一个元素包含所有的输入数组的第一元素，第一个元素包含了所有的输入数组的第二元素，依此类推。）

## Params
`array`

## Return
`Array`

## Depend
```js
import filter from './filter.js'
import map from './map.js'
import baseProperty from './.internal/baseProperty.js'
import isArrayLikeObject from './isArrayLikeObject.js'
```
> [filter 源码分析](./filter.md)
> <br/>
> <br/>
> [map 源码分析](./map.md)
> <br/>
> <br/>
> [baseProperty 源码分析](../internal/baseProperty.md)
> <br/>
> <br/>
> [isArrayLikeObject 源码分析](./isArrayLikeObject.md)

## Code
```js
function unzip(array) {
  if (!(array != null && array.length)) {
    return []
  }
  let length = 0
  array = filter(array, (group) => {
    if (isArrayLikeObject(group)) {
      length = Math.max(group.length, length)
      return true
    }
  })
  let index = -1
  const result = new Array(length)
  while (++index < length) {
    result[index] = map(array, baseProperty(index))
  }
  return result
}
```
## Analyze
1. 首先对于空参数的处理，如果 array 不是一个有值的数组的话，返回一个空数组
2. 拿到结果数组的长度
    ```js
    let length = 0
      array = filter(array, (group) => {
        if (isArrayLikeObject(group)) {
          length = Math.max(group.length, length)
          return true
        }
      })
    ```

    unzip 传入的参数是一个二维数组，结果是 二维数组每一个索引对应的值

    ```js
    [[1,2,3,], [4,5,6], [7,8,9]] // => [1,4,7], [2,5,8], [3,6,9]
    ```
   
    所以这里首先判断每一项是否为一个类数组对象，在通过 Math.max 来更新 length 值

    遍历完成后，首先过滤掉了不是数组的值，其实得到了最终结果的 长度
3. 根据的到的 `length` 初始化 `Array`，`while` 循环遍历， 通过 `map` 拿到当前 索引对应的值数组

## Example
```js
console.log(unzip([[1,2,3], [4,5,6],[7,8,9]])) // [ [ 1, 4, 7 ], [ 2, 5, 8 ], [ 3, 6, 9 ] ]
```
