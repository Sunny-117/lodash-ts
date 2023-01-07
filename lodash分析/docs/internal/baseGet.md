# baseGet

## Description 
`lodash get` 的基本实现，不支持默认值。
## Params
`(object, path)`
> {Object} object: 要获取的对象
>
> {Array|string} path: 要获取的属性的路径
>

## Return
`value`
> 返回获取到的 `value` 值
>

## Depend
```js
import castPath from './castPath.js'
import toKey from './toKey.js'
```
> [castPath 源码分析](./castPath.md)
> <br/>
> <br/>
> [toKey 源码分析](./toKey.md)
>


## Code
```js
function baseGet(object, path) {
  path = castPath(path, object)

  let index = 0
  const length = path.length

  while (object != null && index < length) {
    object = object[toKey(path[index++])]
  }
  return (index && index == length) ? object : undefined
}
```
## Analyze
1. 首先通过 `castPath` 获取到属性路径数组
2. 拿到路径数组的长度，通过 `while` 循环一层一层从 `object` 中取值，这里用 `toKey` 将数组的值转为对象的 `key`
3. 最后返回时，如果 `index` 不为 `0`，并且 `index === length` ，则返回 `object`，否则返回 `undefined`。（在对象的取值过程中，有可能取到的值为 `null`， 此时 `index` 有可能小于 `length`，然后 `while` 循环就结束了，此时返回 `undefined`）

## Remark
1. [Functions MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions)
2. 调用函数时，传递给函数的值被称为函数的实参（值传递），对应位置的函数参数名叫作形参。如果实参是一个包含原始值 (数字，字符串，布尔值) 的变量，则就算函数在内部改变了对应形参的值，返回后，该实参变量的值也不会改变。如果实参是一个对象引用，则对应形参会和该实参指向同一个对象。假如函数在内部改变了对应形参的值，返回后，实参指向的对象的值也会改变

## Example
```js
baseGet({ a: { b: 1 } }, 'a.b') // 1
baseGet({ a: { b: 1 } }, 'a[b]') // 1
baseGet({ a: { b: 1 } }, 'a["b"]') // 1
```

关于 **Remark** 第二点，如果我们在 `baseGet` 中添加一行，`object.a.b = 2`,那结果就会不同,可以看到，会改变实参的值

```js
function baseGet(object, path) {
  path = castPath(path, object)
  
  object.a.b = 2 // 改变形参引用值

  let index = 0
  const length = path.length

  while (object != null && index < length) {
    object = object[toKey(path[index++])]
  }
  return (index && index == length) ? object : undefined
}

var a = { a: { b: 1 } }
console.log(baseGet(a, 'a.b')) // 2
console.log(a) // { a: { b: 2 } }

```
