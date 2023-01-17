# baseReduce 

## Description 
 reduce 和 reduceRight 的基本实现，使用 eachFunc 遍历 collection 。
## Params
`(collection, iteratee, accumulator, initAccum, eachFunc)`
> {Array|Object} collection - 要迭代的集合或数组
>
> {Function} iteratee - 每次迭代调用的函数
>
> accumulator - 默认值
>
> {Boolean} initAccum - 是否设置数组第一项为默认值
>
> {Function} eachFunc - 遍历 collection 的函数
>

## Return
`{*}` - 返回累积值

## Code
```js
function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
  eachFunc(collection, (value, index, collection) => {
    accumulator = initAccum
      ? (initAccum = false, value)
      : iteratee(accumulator, value, index, collection)
  })
  return accumulator
}
```
## Analyze
1. 调用 `eachFunc` 进行迭代遍历， 方法写法和 `baseEach` 差不多
2. 判断 `initAccum` 是否取第一项作为默认值，如果取第一项作为默认值，在第一次迭代时，将 `value` 值赋值给 `accumulator` ， 并且将 `initAccum` 置为 `false`，这里使用了 逗号操作符
3. 否则调用 `iteratee` 方法对每一项进行迭代
## Remark
1. [逗号操作符 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Comma_Operator)  对它的每个操作数求值（从左到右），并返回最后一个操作数的值
2. 在 baseReduce 中，三目运算符 使用了一个 逗号操作符来将 initAccum 置为 false，主要是因为 逗号操作符 运算符等级太低了 为 0，所以需要用 括号括起来
## Example
```js
const a= [1,2,3,4]
const test = (arr, fun) => {
  arr.forEach(fun)
}
const c = baseReduce(a, (total, val) =>total+val, 0, false, test)
console.log(c) // 10
```
