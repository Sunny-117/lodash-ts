# arrayEachRight 

## Description 
创建了一个内部使用的 数组 `forEach`，有点类似于 `every` ，在  `iteratee` 返回 `false` 时结束

不同点在于 是从右往左（从后往前）遍历
## Params
`(array, iteratee)`
> iteratee - 每一次迭代调用的函数
>

## Return
`Array`

## Code
```js
function arrayEachRight(array, iteratee) {
  let length = array == null ? 0 : array.length

  while (length--) {
    if (iteratee(array[length], length, array) === false) {
      break
    }
  }
  return array
}
```
## Analyze
1. 方法整体相对简单，和原生 `JavaScript`  `forEach` 不同的是， `arrayEach` 使用了 `while` ，可以遍历稀疏数组
2. 遍历是从右往左遍历，获取的值以及下标从 `length - 1` 开始
3. 在 `while` 循环内部调用了 `iteratee` ，传入了 当前元素，下标，及完整数组，如果返回值为 `false` 则跳出循环，也就是结束遍历
4. 最终返回数组
## Remark
1. [Array.prototype.every MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
2. [Array.prototype.forEach MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
## Example
```js
const arr = [1,2,3,4,5]

function itemToString(item, index, arr) {
  if (item > 4) {arr[index]+='str'}
  else return false
}

arrayEachRight(arr, itemToString)// [ 1, 2, 3, 4, '5str' ]
```
