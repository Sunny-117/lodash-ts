# copyObject 

## Description 
将 `source` 的 `props` 属性 复制到 `object` 上，可根据 `customizer` 函数来处理数据，得到新的值
## Params
`(source, props, object, customizer)`
## Return
`{Object} object`
## Depend
```js
import assignValue from './assignValue.js'
import baseAssignValue from './baseAssignValue.js'
```
> [assignValue 源码分析](./assignValue.md)
> <br/>
> <br/>
> [baseAssignValue 源码分析](./baseAssignValue.md)

## Code
```js
function copyObject(source, props, object, customizer) {
  const isNew = !object
  object || (object = {})

  for (const key of props) {
    let newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined

    if (newValue === undefined) {
      newValue = source[key]
    }
    if (isNew) {
      baseAssignValue(object, key, newValue)
    } else {
      assignValue(object, key, newValue)
    }
  }
  return object
}
```
## Analyze
1. 首先判断 是否传入 `object` 定位一个标志 `isNew`
2. 如果 `object` 没有传入，将`object`设置为一个空对象
3. 通过 `for of` 拿到 `props` 中要赋值的`key`
4. 判断了是否传入了 `customizer` 方法，如果传入了 则获取 `customizer` 方法返回的值，否则设置为 `undefined` 
    - 这里直接赋值为`undefined`，略显不合理，因为 `customizer` 有可能直接返回 `undefined`
5. 判断 如果 `newValue` 为 `undefined` ，则将 `source` 中对应的值赋值给 `newValue`
6. 根据 is`New 判断是否为一个全新的对象，如果是 则使用 `baseAssignValue` 进行赋值，否则使用 `assignValue`
    - 在这里用 `isNew` 来区别是否全新对象，是因为性能问题，`baseAssignValue` 并不会进行是否存在当前 `key` 的判断
7. 返回 `object`
## Remark
1. [for...of MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of)
## Example
```js
const a = {a:1,b:2,c:3}
const b = null
const c = {a:4,b:5,c:6,d:7}

copyObject(a, ['a','b'], b) // { a: 1, b: 2 }
copyObject(a, ['a','b'], b, (a,b)=>{return ++b}) // { a: 2, b: 3 }
copyObject(a, ['a','b'], c) // { a: 1, b: 2, c: 6, d: 7 }

```
