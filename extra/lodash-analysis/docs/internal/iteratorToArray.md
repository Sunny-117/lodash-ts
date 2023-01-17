# iteratorToArray

## Description
将一个迭代器转换成数组
## Params
`(iterator)`
## Return
`Array`

## Code
```js
function iteratorToArray(iterator) {
  let data
  const result = []

  while (!(data = iterator.next()).done) {
    result.push(data.value)
  }
  return result
}
```
## Analyze
就是调用 `iterator` 的 `next` 方法，判断 `done` 是否为 `true`，不为 `true` 时，将 `value` 的值存储到 `result` 数组中。最后返回 `result`
## Remark
1. [Generator MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator)
2. [function* MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/function*) 这种声明方式 (function 关键字后跟一个星号）会定义一个生成器函数 (generator function)，它返回一个  Generator  对象。
## Example
```js
function* Gen(){
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5
}

const iterator = Gen()

console.log(iteratorToArray(iterator)) // [ 1, 2, 3, 4, 5 ]
```
