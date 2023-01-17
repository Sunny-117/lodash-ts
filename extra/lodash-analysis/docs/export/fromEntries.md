# fromEntries

## Description
fromEntries 方法的逆方法返回一个由键-值对组成的对象。
## Params
`pairs`
## Return
`Object`

## Code
```js
function fromEntries(pairs) {
  const result = {}
  if (pairs == null) {
    return result
  }
  for (const pair of pairs) {
    result[pair[0]] = pair[1]
  }
  return result
}
```
## Analyze
也就是将 键值对数组 ，组成了对象并返回了

## Remark
1. [Object.entries() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) 方法返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 for...in 循环遍历该对象时返回的顺序一致（区别在于 for-in 循环还会枚举原型链中的属性）。
   
2. [for...of MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of) 语句在可迭代对象（包括 Array，Map，Set，String，TypedArray，arguments 对象等等）上创建一个迭代循环，调用自定义迭代钩子，并为每个不同属性的值执行语句
3. [Object.fromEntries() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)方法把键值对列表转换为一个对象。
## Example
```js
const a = {a:1, b:2, c:3}

console.log(fromEntries(Object.entries(a))) // { a: 1, b: 2, c: 3 }
```
