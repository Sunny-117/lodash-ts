# isArrayLikeObject 

## Description 
这个方法类似 [isArrayLike](./isArrayLike.md)。除了它还检查 value 是否是个对象。
## Params
`value`
## Return
`Boolean`
## Depend
```js
import isArrayLike from './isArrayLike.js'
import isObjectLike from './isObjectLike.js'
```
> [isArrayLike 源码分析](./isArrayLike.md)
> <br/>
> <br/>
> [isObjectLike 源码分析](./isObjectLike.md)
>

## Code
```js
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value)
}
```
## Analyze
如果 value 既是除 null 以外的对象，并且属性值中还包含 length， length 是一个整数，大于0 ，小于 9007199254740991

满足以上条件就认为，value 是 arrayLikeObject
## Remark
类似数组的对象是满足以下条件的 JavaScript 对象：
1. 至少它的一些键被设置为非负整数
2. 它具有长度属性

键应该像数组的索引一样从零开始，按顺序递增，并且 length 属性应该等于编号键的数目
## Example
```js
isArrayLikeObject([1, 2, 3])
// => true

isArrayLikeObject(document.body.children)
// => true

isArrayLikeObject('abc')
// => false

isArrayLikeObject(Function)
// => false
```
