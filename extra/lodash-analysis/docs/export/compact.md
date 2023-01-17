# compact 

## Description 
创建一个新数组，包含原数组中所有的非假值元素。例如 false, null,0, "", undefined, 和 NaN 都是被认为是 “假值”。
## Params
`{Array} array`
## Return
`Array`

## Code
```js
function compact(array) {
  let resIndex = 0
  const result = []

  if (array == null) {
    return result
  }

  for (const value of array) {
    if (value) {
      result[resIndex++] = value
    }
  }
  return result
}
```
## Analyze
1. 定义一个新数组用作返回，定义新数组下标从0开始
2. 判断如果传入的 array == null （兼容了undefined），就返回结果，也就是空数组
3. 使用 for...of 对于 array 进行遍历，拿到真值之后，赋值给 result 对应的下标，同时递增下标，最终返回 result
## Remark
1. [for...of](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of) 语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句
2. 这里如果是纯数组，可以使用 [Array.prototype.filter() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) 等方法来处理，compact 不同的点在于，使用了 for...of ，对于 for...of 支持的可迭代对象 它都可以处理
## Example
```js
const a = new Map
for (let i=0;i<10;i++) {
  a.set(i, i*2)
}

compact('abcdefg') // [ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ]
compact(a) // [  [ 0, 0 ],  [ 1, 2 ],  [ 2, 4 ],  [ 3, 6 ], [ 4, 8 ],  [ 5, 10 ],[ 6, 12 ], [ 7, 14 ], [ 8, 16 ], [ 9, 18 ]]
compact([0, 1, false, 2, '', 3]) // [1, 2, 3]
```
