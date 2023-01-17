# isSymbol

## Description 
判断是否为 `Symbol` 类型

## Params
`value`

## Return
`Boolean`

## Depend
```js
    import getTag from './.internal/getTag.js'
```

> [getTag 源码分析](../internal/getTag)

## Code
```js
    function isSymbol(value) {
      const type = typeof value
      return type == 'symbol' || (type === 'object' && value != null && getTag(value) == '[object Symbol]')
    }
```

## Analyze
1. 拿到 `typeof value` 的值
2. `type` 为 `symbol` ， 返回 `true`
3. 当满足`type == 'object'`，并且 `value != null`，同时 `getTag(value) == '[object Symbol]'`时，返回 `true`， 否则返回`false`

## Remark
```js
    var sym = Symbol('foo')
    typeof sym // ‘symbol’
    var symbol_obj = Object(sym)
    typeof symbol_obj // ‘object’
    
    // 因此需要通过 getTag 方法来判断是否为 symbol
```
> [Symbol MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
> 


## Example
```js
    isSymbol(Symbol.iterator) // true
    isSymbol(3) // false
```
