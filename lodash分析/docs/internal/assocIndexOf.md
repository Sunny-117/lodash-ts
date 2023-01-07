# assocIndexOf 

## Description 
从键值对类型的数组中找到 `key` 值

> [['a', 1], ['b', 2], ['c', 3]]

## Params
`(array, key)`
> {Array} array
>
> key
>

## Return
`Number` -- 返回匹配值的索引，找不到返回 -1
## Depend
```js
import eq from '../eq.js'
```
> [eq 源码分析](../export/eq.md)
>

## Code
```js
function assocIndexOf(array, key) {
  let { length } = array
  while (length--) {
    if (eq(array[length][0], key)) {
      return length
    }
  }
  return -1
}
```

## Analyze
1. 首先获取到 `array` 的 `length`
2. 然后 `while 循环， `length` 递减
3. 通过 `eq` 进行判断，如果数组中对应的 `key` 值 和传入的 相等 ，则返回 `length`，也就是下标
4. 如果找不到的话， 返回 `-1`
## Remark
1. `assocIndexOf` 是针对特定的数组形式返回 `key` 值的函数，并不是通用的
2. 获取到 length 之后使用 length--，没有使用--length，这里区别在于，先使用后计算，和先计算后使用
3. 如果使用 --length ，在 while 循环判断时，会少遍历一次
```js
// e.g
const a = [1,2,3]
let {length} = a
/**
* 如果使用 --length ，第一次 while 条件为 2，正常执行，打印 3
* 第二次 while 条件为 1， 打印 2
* 第三次 while 条件为 0， 不执行
* 由此可见，少遍历了一项
*/
while (--length) {
  console(a["length"])
}
```

4. [while MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/while)
## Example
```js
const a = [['a', 1], ['b', 2], ['c', 3]]

assocIndexOf(a, 'a') // 0
assocIndexOf(a, 'b') // 1
assocIndexOf(a, 'd') // -1
```
