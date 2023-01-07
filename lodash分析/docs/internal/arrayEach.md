# arrayEach 

## Description 
创建了一个内部使用的 数组 `forEach`，有点类似于 `every` ，在  `iteratee` 返回 `false` 时结束
## Params
`(array, iteratee)`
> {Array} array 要遍历的数组
>
> {Function} iteratee 每次迭代要调用的函数
## Return
`Array`

## Code
```js
function arrayEach(array, iteratee) {
  let index = -1
  const length = array.length

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break
    }
  }
  return array
}
```
## Analyze
1. 方法整体相对简单，和原生 `JavaScript`  `forEach` 不同的是， `arrayEach` 使用了 `while` ，可以遍历稀疏数组
2. 在 `while` 循环内部调用了 `iteratee` ，传入了 当前元素，下标，及完整数组，如果返回值为 `false` 则跳出循环，也就是结束遍历
3. 最终返回数组
## Remark
1. 对于 稀疏数组 和 稠密数组
```js
var a = new Array(3);
// a 在遍历时，并不会打印任何值，此时为稀疏数组
a.forEach(function (x, i) { console.log(i+". "+x) }) 

var b = new Array(3).fill(undefined)
b.forEach(function (x, i) { console.log(i+". "+x) }) // 0. undefined ; 1. undefined; 2. undefined;
```
区别在于遍历时，稀疏数组会跳过不存在的元素，但是稠密数组可以打印出来，虽然都为 `undefined`

2. [Array.prototype.every MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
3. [Array.prototype.forEach MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
## Example
```js
const arr = [1,2,3,4,5]

function itemToString(item, index, arr) {
  if (item < 4) {arr[index]+=''}
  else return false
}

arrayEach(arr, itemToString) // [ '1', '2', '3', 4, 5 ]
```
