# arrayReduceRight 

## Description 
和 reduceRight 类似，从右到左遍历
## Params
`(array, iteratee, accumulator, initAccum)`
> iteratee - 每一次遍历调用的函数
>
> accumulator - 默认值
>
> initAccum - 是否数组最后一项作为默认值
>

## Return
`{*}` - 累计的结果

## Code
```js
function arrayReduceRight(array, iteratee, accumulator, initAccum) {
  let length = array == null ? 0 : array.length
  if (initAccum && length) {
    accumulator = array[--length]
  }
  while (length--) {
    accumulator = iteratee(accumulator, array[length], length, array)
  }
  return accumulator
}
```
## Analyze
1. 判断 `array` 是否传入了 ，如果 `array` 不为 `null` 或者 不为 `undefined` ，则取 `array.length` ，否则取0
2. 如果 `initAccum` 为 `true`，则设置 数组最后一项为 默认值
3. 和 [arrayReduce](./arrayReduce.md) 类似，如果 `initAccum` 为 `true`， `while` 遍历时，不会遍历到最后一项
4. `while` 循环，结束条件 `length--`， 调用 `iteratee` 将结果赋值给 `accumulator` ，`iteratee` 接收四个参数，分别为 当前累计的值，当前元素，当前元素下标，原数组
5. 最后返回累计的结果
## Remark
1. [Array.prototype.reduce() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)  方法对数组中的每个元素执行一个由您提供的 reducer 函数 (升序执行)，将其结果汇总为单个返回值。
2. [Array.prototype.reduceRight() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight) 方法接受一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值。
## Example
```js
const a = [2,3,4,5]

arrayReduceRight(a, (total, val) => total + Math.pow(val, 2), 0) // 54
arrayReduceRight(a, (total, val) => total + Math.pow(val, 2), 0, true) // 34
```
