# pullAll

## Description
它的作用是将数组 array 中存在于数组 values 中的元素移除。
## Params
`(array, values)`
## Return
`Array`
## Depend
```js
import basePullAll from './.internal/basePullAll.js'
```
> [basePullAll 源码分析](../internal/basePullAll.md)
> 

## Code
```js
function pullAll(array, values) {
  return (array != null && array.length && values != null && values.length)
    ? basePullAll(array, values)
    : array
}
```
## Analyze
最终就是调用了 `basePullAll` 来进行处理，只不过在调用之前进行了合法性的判断

`array != null && array.length` array 存在， 并且具有 length 属性且有值

`values != null && values.length` values 存在， 并且具有 length 属性且有值

都满足的情况下，就会调用 `basePullAll` 来进行处理

否则返回 `array`
## Remark
按照道理来说，逻辑与的运算符等级高于三目，这里对于前面的条件判断是可以不用括号的，这里使用了括号，应当是为了代码可读性
## Example
```js
const array = ['a', 'b', 'c', 'a', 'b', 'c']
pullAll(array, ['a', 'c'])
console.log(array) // [ 'b', 'b' ]
```
