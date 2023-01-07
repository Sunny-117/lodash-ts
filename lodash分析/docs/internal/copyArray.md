# copyArray 

## Description 
将 `source`  的值复制到  `array`，这里直接进行了赋值操作，并没有处理引用类型的情况，所以如果为引用类型则为浅拷贝
## Params
`(source, array)`
## Return
`{Array} array`

## Code
```js
function copyArray(source, array) {
  let index = -1
  const length = source.length

  array || (array = new Array(length))
  while (++index < length) {
    array[index] = source[index]
  }
  return array
}
```
## Analyze
1. `copyArray` 是 `lodash` 内部使用的方法，并没有进行 是否数组的判断 ，在内部使用时可能会尽量避免这个问题
2. 首先拿到了 `source` 的 `length`，定义了 `index` 为 -1
3. 进行了 `array` 的判断，如果 `array` 不存在则 `new` 一个和 `source` 等长的数组
4. 使用 `while` 循环，将 `source` 的值 赋值到 `array` 对应的位置
5. 这里并没有判断是否对象等等，所以如果是引用类型会指向同一内存空间
6. 使用了 `while` ，所以对于 稀疏数组 也会进行赋值，值为 `undefined`

## Remark
1. [短路计算 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Logical_Operators#%E7%9F%AD%E8%B7%AF%E8%AE%A1%E7%AE%97)
## Example
```js
const a = [1,2,3,4,5]
const c = [{
  a: 1
}]

const b = copyArray(a)
const d = copyArray(c)

c[0].a++

console.log(b) // [ 1, 2, 3, 4, 5 ]
console.log(d) // [ { a: 2 } ]
```
