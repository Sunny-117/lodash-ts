# arrayReduce 

## Description 
类似于 数组 reduce 方法
## Params
`(array, iteratee, accumulator, initAccum)`
> array - Array
>
> iteratee 每次迭代调用的函数
>
> accumulator - 初始值
>
> initAccum - 是否指定使用' array '的第一个元素作为初始值。
>

## Return
`{*}` - 结果

## Code
```js
function arrayReduce(array, iteratee, accumulator, initAccum) {
  let index = -1
  const length = array == null ? 0 : array.length

  if (initAccum && length) {
    accumulator = array[++index]
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array)
  }
  return accumulator
}
```
## Analyze
1. 首先定义下标从 -1 开始，并获取传入的 `array` 的 `length`，如果存在则取 `length`，否则取0
2. 如果定义了以数组第一位作为默认值，则将 `accumulator` 赋值为 数组第一位
3. `while` 循环，调用 `iteratee` 方法处理数据，`iteratee` 参数分别为 默认值 `accumulator`，当前值 `array[index]`,下标 `index`， 以及原数组 `array`
4. 这里如果取数组第一位作为默认值，则在 while 遍历时，不会对 第一项做处理，index 会从 1 开始（本身为 -1， 设置第一项为默认值时，有一次++index，while循环开始又有一次++index）
## Remark
1. [Array.prototype.reduce() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)  方法对数组中的每个元素执行一个由您提供的 reducer 函数 (升序执行)，将其结果汇总为单个返回值。
2. [Array.prototype.reduceRight() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight) 方法接受一个函数作为累加器（accumulator）和数组的每个值（从右到左）将其减少为单个值。
## Example
```js
const a = [2,3,4,5]

arrayReduce(a, (total, val) => total + Math.pow(val, 2), 0) // 54
arrayReduce(a, (total, val) => total + Math.pow(val, 2), 0, true) // 52
```
