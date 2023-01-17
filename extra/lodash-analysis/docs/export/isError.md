# isError

## Description 
判断是否为 `Error`
> `EvalError` / `RangeError` / `ReferenceError` / `SyntaxError` / `TypeError` / `URIError` 等
> 

## Params
`value`

## Return
`Boolean`

## Depend
```js
    import getTag from './.internal/getTag.js'
    import isObjectLike from './isObjectLike.js'
    import isPlainObject from './isPlainObject.js'
```
> [getTag 源码分析](../internal/getTag.md)
> <br/>
> <br/>
> [isObjectLike 源码分析](./isObjectLike.md)
> <br/>
> <br/>
> [isPlainObject 源码分析](./isPlainObject.md)
> 

## Code
```js
    function isError(value) {
      if (!isObjectLike(value)) {
        return false
      }
      const tag = getTag(value)
      return tag == '[object Error]' || tag == '[object DOMException]' ||
        (typeof value.message === 'string' && typeof value.name === 'string' && !isPlainObject(value))
    }
```

## Analyze
1. 调用 `isObjectLike` 区分 `null` 和其他 `typeof` 为 `object` 的值， 如果为 `null` 则返回 `false`
   
2. 调用 `getTag` 获取`value`的类型
3. 判断 `tag == ‘[object Error]’ || tag == ‘[object DOMException]’`
4. 并且 `typeof value.message == ‘string’`,`typeof value.name == ‘string’`, 并且不是一个普通对象`!isPlainObject(value)`
5. 3,4都满足则为`true`，否则为`false`

## Remark
1. [URI & URL](https://danielmiessler.com/study/difference-between-uri-url/)
   
2. `DOMException` 接口代表调用方法或访问 Web API 属性时发生的异常事件
3. 在 `Error` 和 `DOMException` 中 ，`message` 和 `name` 都存在默认值（`Error.message` 默认为 `''`, `Error.name` 默认为 `'Error'`；`DOMException.name` 为当前错误名称的驼峰命名字符串，如：`IndexSizeError`，`NotFoundError`等）
4. [DOMException MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/DOMException)
5. [Error MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error)

## Example
```js
    isError(new Error('3')) // true
    isError(3) // false
```
