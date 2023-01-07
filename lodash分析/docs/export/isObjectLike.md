# isObjectLike

## Description 
判断 `typeof value` 是否为除 `null` 以外的 `object`

## Params
`value`

## Return
`Boolean`

## Code
```js
    function isObjectLike(value) {
      return typeof value === 'object' && value !== null
    }
```

## Analyze
`isObjectLike` 的源码相对简单很多，其实就是使用 `typeof` 操作符，如果返回值为 `object` ，并且 `value` 又不是 `null` 时，就认为是类对象。

## Remark

| 类型                                      | 结果          |
|-----------------------------------------|-------------|
| Undefined                               | 'undefined' |
| Null                                    | 'object'    |
| Boolean                                 | 'boolean'     |
| Number                                  | 'number'      |
| BigInt(ECMAScript 2020新增)               | 'bigint'      |
| String                                  | 'string'      |
| Symbol(ECMAScript 2015新增)               | 'symbol'      |
| 宿主对象（由 JS 环境提供）                         | 取决于具体实现     |
| Function 对象 (按照 ECMA-262 规范实现 [[Call]]) | 'function'    |
| 其他任何对象                                  | 'object'      |

> 在 JavaScript 最初的实现中，JavaScript 中的值是由一个表示类型的标签和实际数据值表示的。对象的类型标签是 0。由于 null 代表的是空指针（大多数平台下值为 0x00），因此，null 的类型标签是 0，typeof null 也因此返回 "object"。[来源](https://2ality.com/2013/10/typeof-null.html)
> <br/>
> <br/>
> 判断类型时是根据机器码低位标识来判断的，object 最低位为 000， 而 null 全为 0， 所以 typeof null 为 object


| 类型 | 机器码 |
|-------|-----|
| Object | 000 |
| int | 1 |
| float | 010 |
| string | 100 |
| Boolean | 110 |
| undefined | -2^31(全为1) |
| null | 全为0 |

> 曾有一个 ECMAScript 的修复提案（通过选择性加入的方式），但[被拒绝了](http://wiki.ecmascript.org/doku.php?id=harmony:typeof_null)。该提案会导致 typeof null === 'null'。
> <br/>  
> 具体可以查看[typeof MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)
> <br/>  
> PS: `null instanceof Object` 结果为 `false`
        

## Example
```js
    isObjectLike(null) // false
    isObjectLike(3) // false
    isObjectLike([]) // true
```
