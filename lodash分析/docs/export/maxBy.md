# maxBy

## Description
maxBy 的作用是找出一组数据中的最大值。和 Math.max 不同的是，maxBy 支持传入一个迭代器 iteratee ，在比较的过程中不直接比较原始值，而是使用迭代器返回的值进行比较。

## Params
`(array, iteratee)`

## Return
`{*}`

## Depend
```js
import isSymbol from './isSymbol.js'
```
> [isSymbol](./isSymbol.md)

## Code
```js
function maxBy(array, iteratee) {
  let result
  if (array == null) {
    return result
  }
  let computed
  for (const value of array) {
    const current = iteratee(value)

    if (current != null && (computed === undefined
      ? (current === current && !isSymbol(current))
      : (current > computed)
    )) {
      computed = current
      result = value
    }
  }
  return result
}
```
## Analyze
1. 首先定义了结果 `result`，没有赋值
   
2. 针对 `array` 是 `null` 或者 `undefined` 进行了处理，直接返回了 `result` ，也就是 `undefined`
3. 定义 `computed` 作为上一轮较大的值
4. `for...of` 循环进行比较，这里 `if` 判断条件略复杂， 拆开来看
    ```js
    current != null
    ```
   
    首先第一点，`current` 也就是当前值不能为 `null` 或者 `undefined`，如果为这两个值，则完全没有比较的意义
   
    ```js
    computed === undefined
      ? (current === current && !isSymbol(current))
      : (current > computed)
    ```
   
    其次，如果上一次比较的结果 `computed` 为 `undefined` ，则表示是第一次进行比较，或者之前没有对 `computed` 进行过 赋值

    ```js
    current === current && !isSymbol(current)
    ```
   
    此时则判断 `current === current` ，表示 `current` 不能为 `NaN` ,然后 `current` 也不能为 `symbol` 类型，在满足这两点时，会进行第一次对 `computed` 的赋值操作

    如果 `computed` 已经有值的情况下
   
    ```js
    current > computed
    ```
   
    这里判断的是  `current` 大于 `computed` ，也就是说，只有在大于时，才需要进行值的更新

    ```js
      computed = current
      result = value
    ```
   
    在满足条件时，进行赋值，更新 `computed` 和 `result` 的值

    最终在遍历完成后，返回 `result` 结果即可

## Remark
1. [for...of MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of) 语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句

## Example
```js
console.log(maxBy([3,6,2,8,1,9,2,67,4,9], (v) => v)) // 67
```
