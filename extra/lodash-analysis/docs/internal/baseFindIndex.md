# baseFindIndex 

## Description 
`baseFindIndex` 是lodash内部方法，其作用类似于 `ES6` 的 `findIndex`，查找符合条件的第一个元素的索引。

`baseFindIndex` 除了从左到右查找外，还可以从右到左查找。
## Params
`(array, predicate, fromIndex, fromRight)`
> {Function} predicate - 每次迭代调用的函数
>
> {number} fromIndex - 从指定下标开始查找
>
> {boolean} [fromRight] - 是否从右到左
>

## Return
`Number`

## Code
```js
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  const { length } = array
  let index = fromIndex + (fromRight ? 1 : -1)

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index
    }
  }
  return -1
}
```
## Analyze
1. 首先拿到 `array.length` ， 定义 `index` 为传入的指定位置加上 `1` 或者 `-1`，根据 是否从右到左来判断 +`1` 或者 + `-1`
2. `while` 循环遍历 ，如果是从右到左，结束条件为 `index--` (递减), 否则结束条件为 `++index < length`  (递增)
3. 如果传入 `predicate` 处理数据结果为 `true`，则返回当前 `index` ，`predicate` 接受三个参数，当前值， 当前下标，完整数组
4. 如果整个循环完成后，都没有找到符合的值，则返回 `-1`
## Remark
1. [Array.prototype.findIndex() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex) 方法返回数组中满足提供的测试函数的第一个元素的索引。若没有找到对应元素则返回 - 1。
2. while 三目判断那里 ，因为 < 的运算符优先级高于 三目 ，所以 无需加括号增加运算符等级
3. [运算符优先级 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Operator_Precedence#table)
## Example
```js
const a = [1,2,3,4,5,6]
baseFindIndex(a, (val) => val > 3, 0) // 3
baseFindIndex(a, (val) => val > 3, a.length, true) // 5
```
