# basePropertyOf 

## Description 
返回一个方法，从对象中取出 key 对应的值，如果对象为 null 返回 undefined
## Params
`{Object} object`
## Return
`Function`

## Code
```js
function basePropertyOf(object) {
  return (key) => object == null ? undefined : object[key]
}
```
## Analyze
返回一个箭头函数，去判断 `object` 是否存在，不存在返回 `undefined` ，否则取`key`对应的`value`
## Remark
1. [属性访问器 MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Property_Accessors#%E6%8B%AC%E5%8F%B7%E8%A1%A8%E7%A4%BA%E6%B3%95)
## Example
```js
const get = basePropertyOf({a:1,b:2})
get('a') // 1
```
