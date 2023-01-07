# some 

## Description 
跟 Array.prototype.some 基本一致

通过 predicate（断言函数） 检查 collection（集合）中的元素是否存在 任意 truthy（真值）的元素，一旦 predicate（断言函数） 返回 truthy（真值），遍历就停止。 predicate 调用 3 个参数：(value, index|key, collection)。
## Params
`(array, predicate)`
> predicate - 每次迭代调用的函数
>

## Return
`Boolean`

## Code
```js
function some(array, predicate) {
  let index = -1
  const length = array == null ? 0 : array.length

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true
    }
  }
  return false
}
```
## Analyze
1. 根据是否传入了 `array` 给 `length` 赋值为 0 或者 `array.length`
2. `while` 循环遍历，结束条件 `index < length`
3. 调用 `predicate` 函数进行判断，参数为 当前值，当前索引，完成 `array` 数组
4. 如果 `predicate` 返回为 `truthy` ，则返回 `true` ，结束 `while` 循环
5. 如果 整个 `while` 循环完成后都没有 `truthy`， 返回 `false`
## Remark
1. [Array.prototype.some() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some) 方法测试数组中是不是至少有 1 个元素通过了被提供的函数测试。它返回的是一个 Boolean 类型的值。
## Example
```js
some([null, 0, 'yes', false], Boolean) // => true
```
