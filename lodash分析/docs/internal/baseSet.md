# baseSet 

## Description 
将 value 值 设置到 object path 路径的 key 上
## Params
`(object, path, value, customizer)`
> {Object} object - 要修改的对象。
>
> {Array|string} path - 要设置的属性的路径。
>
> {Function} [customizer] - 自定义创建路径。
>

## Return
`Object`
## Depend
```js
import assignValue from './assignValue.js'
import castPath from './castPath.js'
import isIndex from './isIndex.js'
import isObject from '../isObject.js'
import toKey from './toKey.js'
```
> [assignValue 源码分析](./assignValue.md)
> <br/>
> <br/>
> [castPath 源码分析](./castPath.md)
> <br/>
> <br/>
> [isIndex 源码分析](./isIndex.md)
> <br/>
> <br/>
> [isObject 源码分析](../export/isObject.md)
> <br/>
> <br/>
> [toKey 源码分析](./toKey.md)

## Code
```js
function baseSet(object, path, value, customizer) {
  if (!isObject(object)) {
    return object
  }
  path = castPath(path, object)

  const length = path.length
  const lastIndex = length - 1

  let index = -1
  let nested = object

  while (nested != null && ++index < length) {
    const key = toKey(path[index])
    let newValue = value

    if (index != lastIndex) {
      const objValue = nested[key]
      newValue = customizer ? customizer(objValue, key, nested) : undefined
      if (newValue === undefined) {
        newValue = isObject(objValue)
          ? objValue
          : (isIndex(path[index + 1]) ? [] : {})
      }
    }
    assignValue(nested, key, newValue)
    nested = nested[key]
  }
  return object
}
```
## Analyze
1. 首先判断如果不是 `object` 类型，则直接返回
   
2. 使用 `castPath` 将 `path` 转换为 路径数组，拿到 `length`，拿到最后一个元素的索引 `lastIndex`， 将 `object` 赋值给 `nested`
3. `while` 循环进行路径的设置，结束条件为 `nested != null && ++index < length`
4. 首先将当前 路径转换为对象可设置的 `key`，在不是最后一个元素时，`newValue` 会等于 `objValue` 或者空数组或空对象，具体判断条件如下
    - 判断当前 `index` 不是最后一个元素的索引
    - `nested` 一开始设置的值是传入的 `object`，所以这里 `nested[key]` 可能有值，也可能为 `undefined`
    - 如果传入了 `customizer` 函数，则使用 `customizer` 进行值的处理，否则 `newValue` 设置为 `undefined`
    - 即使经过 `customizer` 的处理，`newValue` 也有可能为 `undefined`
    - 所以判断如果 `newValue` 为 `undefined` ，则判断 `nested[key]` 也就是 `objValue` 是否为 `object` 类型，如果是 `object` 类型则表示可以设置属性，将 `objValue` 赋值给 `newValue`
    - 否则 `objValue` 不能为其设置属性，则需要将其设置为 `object` 类型
    - 这里判断了 `isIndex(path[index + 1]` ，是为了判断 其 **下一层是对象的子级还是数组的子级** ，对应设置当前层为空数组或空对象
5. 在处理完成上述条件后，会使用 `assignValue` 进行赋值操作，如果之前对象对应的子级就是引用类型，则不会进行更改（`newValue = isObject(objValue) ？ objValue : ...`），否则会为其设置相应的子级为 数组 或 对象
6. 拿到要设置的下一层，赋值给 `nested` ，继续进行 `while` 循环的判断
7. 如果到了最后一个元素，则不会进行第四步的判断及处理，直接将传入的 `value` 的值，设置到对应的位置即可
8. 因为一直是引用类型，所以最终会改变 传入的 `object` ，所以最后返回 `object` 即可
## Remark
1. 主要就是拿到  `path` 的数组，然后遍历数组进行赋值操作 ，如果传入的对象本身就有 `path` 数组中的 `key` ，而且也是引用类型，那其实没有改变，到最后只是设置值罢了；

    如果不是的话，那就会将其改变了
    
    e.g
    ```js
        const a = { b: { c: 3}}
        baseSet(a, 'a.b.c', 4)
    ```
    如果是这样，那在 `while` 循环的 `if` 判断里，其实获取 `nested[key]` 这里，拿到的就是一个 `object` 类型
    
    如果传入的对象本身没有对应的 key ，或者对应的 key 不是最后一层，还不是引用类型，那就会改变了
    
    e.g
    ```js
       const a = {}
       baseSet(a, 'a.b.c', 4)
    ```
    那这个时候就会改变 原对象了，会将其对应 key ，如不是最后一层，会设置为 空对象 或 空数组
## Example
```js
const a = {b:3}

console.log(baseSet(a, 'b.c', 4)) // { b: { c: 4 } }
```
