# baseSortBy 

## Description 
sortBy的基本实现，该实现使用比较器定义数组的排序顺序，并将条件对象替换为其对应的值。

所以对于传入的数组有要求，每个元素必须是对象，然后会 取其 value 属性的值
## Params
`(array, comparer)`
> {Function} comparer - 定义排序顺序的方法。
>

## Return
`Array`

## Code
```js
function baseSortBy(array, comparer) {
  let { length } = array

  array.sort(comparer)
  while (length--) {
    array[length] = array[length].value
  }
  return array
}
```
## Analyze
1. 首先拿到 array 的 length，然后使用 sort 函数根据 comparer 进行排序
2. while 循环，将数组元素每一项改为其 每一项元素 value 属性的值
3. 所以这里对于 array 的每一项元素要求就是其为对象
## Remark
1. [Array.prototype.sort() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) 方法用原地算法对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串，然后比较它们的 UTF-16 代码单元值序列时构建的
2. [原地算法 Wikipedia](https://zh.wikipedia.org/wiki/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95)
## Example
```js
const a = [
  {value: 2},
  {value: 1},
  {value: 3}
]

const func = (a,b) => a.value - b.value

console.log(baseSortBy(a, func)) // [ 1, 2, 3 ]
```
