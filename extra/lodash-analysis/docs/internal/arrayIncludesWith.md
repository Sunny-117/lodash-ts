# arrayIncludesWith 

## Description 
和 includes 类似，只不过需要传入 比较函数
## Params
`(array, target, comparator)`
> comparator - 每个元素调用的比较器。
>

## Return
`Boolean`

## Code
```js
function arrayIncludesWith(array, target, comparator) {
  if (array == null) {
    return false
  }

  for (const value of array) {
    if (comparator(target, value)) {
      return true
    }
  }
  return false
}
```
## Analyze
1. 如果没有传入 `array` 或者 `array` 为 `null` ，则返回 `false`
2. 使用 `for...of` 循环遍历数组，如果 `comparator` 处理结果为真值，则返回 `true`，`comparator` 接受两个参数，分别为 需要比较的值和当前循环到的值
3. 如果循环完成后都没有返回结果，则返回 `false`
## Remark
1. [Array.prototype.includes() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)
2. [for...of MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of) 语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句
## Example
```js
const a = [1,2,3,4,5]

arrayIncludesWith(a, 3, (target, value) => value === target) // true

```
