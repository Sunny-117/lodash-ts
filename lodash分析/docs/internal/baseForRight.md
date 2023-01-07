# baseForRight 

## Description 
和 [baseFor](./baseFor.md) 基本类型，区别就是从右到左
## Params
`(object, iteratee, keysFunc)`
>
> iteratee - 每次迭代调用的函数
>
> keysFunc - 获取“object”键的函数
>
>

## Return
`Object`

## Code
```js
function baseForRight(object, iteratee, keysFunc) {
  const iterable = Object(object)
  const props = keysFunc(object)
  let { length } = props

  while (length--) {
    const key = props[length]
    if (iteratee(iterable[key], key, iterable) === false) {
      break
    }
  }
  return object
}

```

## Analyze
过程基本和 [baseFor](./baseFor.md) 一致，唯一区别就是在于

```js
const key = props[length]
```

这里取length，是属于从右至左，递减
## Remark
1. [解构赋值 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
## Example
```js
const a = []
baseForRight({a:1, b:2,c:3}, (value, key) => a.push([value, key]), Object.keys)
console.log(a) // [ [ 3, 'c' ], [ 2, 'b' ], [ 1, 'a' ] ]
```
