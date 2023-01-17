# basePullAll 

## Description 
它的作用是将数组 array 中存在于数组 values 中的元素移除。同时也支持迭代器 iteratee 来用返回新的比较值，也支持 comparator 自定义比较函数
## Params
`(array, values, iteratee, comparator)`
## Return
`Array`
## Depend
```js
import map from '../map.js'
import baseIndexOf from './baseIndexOf.js'
import baseIndexOfWith from './baseIndexOfWith.js'
import copyArray from './copyArray.js'
```
> [map 源码分析](../export/map.md)
> <br/>
> <br/>
> [baseIndexOf 源码分析](./baseIndexOf.md)
> <br/>
> <br/>
> [baseIndexOfWith 源码分析](./baseIndexOfWith.md)
> <br/>
> <br/>
> [copyArray 源码分析](./copyArray.md)

## Code
```js
function basePullAll(array, values, iteratee, comparator) {
  const indexOf = comparator ? baseIndexOfWith : baseIndexOf
  const length = values.length

  let index = -1
  let seen = array

  if (array === values) {
    values = copyArray(values)
  }
  if (iteratee) {
    seen = map(array, (value) => iteratee(value))
  }
  while (++index < length) {
    let fromIndex = 0
    const value = values[index]
    const computed = iteratee ? iteratee(value) : value

    while ((fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1) {
      if (seen !== array) {
        seen.splice(fromIndex, 1)
      }
      array.splice(fromIndex, 1)
    }
  }
  return array
}
```
## Analyze
1. 首先根据是否传入了自定义函数，确定 `indexOf` 方法，`baseIndexOfWith` 支持自定义比较函数
2. 如果 `array === values`， 则表示 **二者引用地址相同** ，此时需要重新 copy一份，后续会对 `array` 做修改，如果不copy 会影响到 `values` ，会出错
3. 如果 传入了 `iteratee` ，则表示使用 `iteratee` 处理过的值来进行判断，这里使用 `map` 对 `array` 进行了遍历，拿到了新的数组 `seen`
4. `computed` 作为比较的值，这里处理是因为可能存在 `iteratee` 函数，使用 `iteratee` 处理之后的值进行判断
5. 在第三步时，判断了 `iteratee` 函数，如果存在，会处理 `array` 成新的 `seen` ，所以这里判断 如果 `seen !== array`，也需要将 `seen` 对应的值删除
6. `while` 循环，如果存在对应的值，拿到下标，进行删除操作
## Remark
1. [Array.prototype.splice() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) 方法通过删除或替换现有元素或者原地添加新的元素来修改数组，并以数组形式返回被修改的内容。此方法会改变原数组。
## Example
```js
const a = [1,2,3,4,5]
console.log(basePullAll(a, [1,2,3])) // [4, 5]
```
