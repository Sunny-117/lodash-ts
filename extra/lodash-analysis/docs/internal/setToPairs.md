# setToPairs

## Description
将 set 对象转为 值-值对 数组
## Params
`(set)`
## Return
`Array`

## Code
```js
function setToPairs(set) {
  let index = -1
  const result = new Array(set.size)

  set.forEach((value) => {
    result[++index] = [value, value]
  })
  return result
}
```
## Analyze
1. 根据 `set.size` 初始化数组
2. `set` `forEach` 进行遍历，将 对应的 `[value, value]` 添加到数组对应位置
## Remark
1. [Set](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set) 对象是值的集合，你可以按照插入的顺序迭代它的元素。 Set 中的元素只会出现一次，即 Set 中的元素是唯一的。
## Example
```js
console.log(setToPairs(new Set([1,2,3,4,5,6]))) 
// [ [ 1, 1 ], [ 2, 2 ], [ 3, 3 ], [ 4, 4 ], [ 5, 5 ], [ 6, 6 ] ]
```
