# isArguments

## Description 
判断是否为`arguments`
## Params
`value`

## Return
`Boolean`

## Depend
```js
    import getTag from './.internal/getTag.js'
    import isObjectLike from './isObjectLike.js'
```
> [getTag 源码分析](../internal/getTag.md)
> <br/>
> <br/>
> [isObjectLike 源码分析](./isObjectLike.md)
> 

## Code
```js
    function isArguments(value) {
      return isObjectLike(value) && getTag(value) == '[object Arguments]'
    }
```
## Analyze
如果 `value` 为 类对象(`isObjectLike(value)`)并且 `Object.prototype.toString.call(value)'` 返回的类型为 `'[object Arguments]'`，那么就是一个类 `arguments` 对象

## Remark
```js
    (function () {
      getTag(arguments)
    })() // ‘[object Arguments]’
```

> [Arguments MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments)
> 

## Example
```js
    isArguments(1) // false
    isArguments({a:1}) // false
    (function(){
       isArguments(arguments)
    })() // true
```
