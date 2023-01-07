# baseSum

## Description
baseSum 用来计算一组数据的和，这是用来实现 sum 和 sumBy 的内部方法，需要传入迭代器 iteratee 来返回值用来计算。
## Params
`(array, iteratee)`
## Return
`number`

## Code
```js
function baseSum(array, iteratee) {
  let result

  for (const value of array) {
    const current = iteratee(value)
    if (current !== undefined) {
      result = result === undefined ? current : (result + current)
    }
  }
  return result
}
```
## Analyze
1. `for...of` 遍历 `array`
2. 通过 `iteratee` 处理数组每一项，拿到返回值
3. 如果返回值不是 `undefined`，则对 `result` 进行赋值
4. `result` 为 `undefined` 时，表示之前没有成功赋值，是第一次赋值，将 `current` 的值赋值给 `result`
5. `result` 不是 `undefined` ，则累加 `current` 即可
## Remark
1. [for...of MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of) 语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句
2. 在 result 判断 undefined 赋值这里，单从赋值而言，可以使用
    ```js
    result ??= current
    ```
    在 result 为null 或者 undefined 时，对其进行赋值

    [逻辑空赋值 (??=) MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_nullish_assignment)
## Example
```js
console.log(baseSum([1,2,3,4,5,6,7], v => v)) // 28
```
