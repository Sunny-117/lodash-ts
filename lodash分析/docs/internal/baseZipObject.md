# baseZipObject

## Description
baseZipObject 的作用是将两个数组 props 和 values 组成一个对象。props 中的值为对象的键，values 的中的值为对象的值，键和值一一对应，即 `props[0]` 和 `values[0]` 组成一对，`props[1]` 和 `values[1]` 组成一对，依此类推。

## Params
`(props, values, assignFunc)`
## Return
`Object`
## Code
```js
function baseZipObject(props, values, assignFunc) {
  let index = -1
  const length = props.length
  const valsLength = values.length
  const result = {}

  while (++index < length) {
    const value = index < valsLength ? values[index] : undefined
    assignFunc(result, props[index], value)
  }
  return result
}
```

## Analyze
1. 以 `props.length` 为基准来做 `while` 循环
2. 判断 当前 `index` 是否 小于 `values.length` ，如果符合，取值，否则设置为 `undefined`
3. 使用 `assignFunc` 方法来对 `result` 设置属性及值

## Remark
在这里会判断 `values.length` ，如果values的长度大于props，则会截取，否则会将值设置为 `undefined`
## Example
```js
const func = (result, k, v) => {
  result[k] = v
}

console.log(baseZipObject([1,2,3,4,5,'length'], ['a', 'b', 'c', 'd', 'e', 5], func))
// { '1': 'a', '2': 'b', '3': 'c', '4': 'd', '5': 'e', length: 5 }
```
