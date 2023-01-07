# strictIndexOf 

## Description 
和 Array.prototype.indexOf 相似，都是采用 [严格相等](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Equality_comparisons_and_sameness#%E4%B8%A5%E6%A0%BC%E7%9B%B8%E7%AD%89) 判断方式 
## Params
`(array, value, fromIndex)`
> fromIndex - 从什么位置开始查找

## Return
`Number`

## Code
```js
function strictIndexOf(array, value, fromIndex) {
  let index = fromIndex - 1
  const { length } = array

  while (++index < length) {
    if (array[index] === value) {
      return index
    }
  }
  return -1
}
```
## Analyze
1. 首先定义 `index` 为 `fromIndex - 1`，这里没有判断 `fromIndex` 是否为 `undefined` ，而且 `fromIndex` 也没有默认值，所以 `fromIndex` 必须要传入，否则会得到 `NaN`
   
2. 通过结构赋值拿到 `array.length`
3. `while` 循环遍历，结束条件为 `++index < length`
4. 判断 当前值是否和传入的 `value` 严格相等，如果符合 返回 `index`， 结束循环
5. 如果循环完成后还是找不到对应的值，则返回 `-1`
## Remark
1. [Array.prototype.indexOf() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) 方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回 - 1。

## Example
```js
const a = [1,2,3,4,5]
strictIndexOf(a, 3, 0) // 2
```
