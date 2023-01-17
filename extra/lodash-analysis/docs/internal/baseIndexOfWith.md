# baseIndexOfWith 

## Description 
这个函数类似于 [baseIndexOf](./baseIndexOf.md) ，只是它接受一个比较器。
## Params
`(array, value, fromIndex, comparator)`
> comparator - 传入的比较器
>

## Return
`Number`

## Code
```js
function baseIndexOfWith(array, value, fromIndex, comparator) {
  let index = fromIndex - 1
  const { length } = array

  while (++index < length) {
    if (comparator(array[index], value)) {
      return index
    }
  }
  return -1
}
```
## Analyze
1. 获取下标开始的偏移量 （`fromIndex - 1`），后面要用`++index`，所以这里要 -1
2. `while` 循环遍历，调用传入的 `comparator` 进行比较，当比较结果为真时，返回当前下标，结束循环
3. 如果循环完成都没有找到结果，返回 -1
## Remark
1. [Array.prototype.indexOf() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) 方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回 - 1。
2. [Array.prototype.findIndex() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)
## Example
```js
const a = [1,2,3,4,5]
baseIndexOfWith(a, 1, 0, (a, b) => a === b) // 0
baseIndexOfWith(a, 0, 0, (a, b) => a === b) // -1
```
