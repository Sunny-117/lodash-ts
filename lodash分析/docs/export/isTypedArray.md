# isTypedArray 

## Description 
检查 `value` 是否是 TypedArray。
## Params
`value`
## Return
`Boolean`
## Depend
```js
import getTag from './.internal/getTag.js'
import nodeTypes from './.internal/nodeTypes.js'
import isObjectLike from './isObjectLike.js'
```
> [getTag 源码分析](../internal/getTag.md)
> <br/>
> <br/>
> [nodeTypes](../internal/nodeTypes.md)
> <br/> 
> <br/>
> [isObjectLike](./isObjectLike.md)
>

## Code
```js
/** Used to match `toStringTag` values of typed arrays. */
const reTypedTag = /^\[object (?:Float(?:32|64)|(?:Int|Uint)(?:8|16|32)|Uint8Clamped)Array\]$/

/* Node.js helper references. */
const nodeIsTypedArray = nodeTypes && nodeTypes.isTypedArray

const isTypedArray = nodeIsTypedArray
  ? (value) => nodeIsTypedArray(value)
  : (value) => isObjectLike(value) && reTypedTag.test(getTag(value))

```
## Analyze
`reTypedTag`

<img  :src="$withBase('/assets/reg_isTypedArray.svg')" />

1. 判断 `nodeTypes` 是否存在，也就是 `node` 下 `util.types` 是否可用
2. 如果 `util.types` 可用，则使用 `util.types.isTypedArray` 方法来进行判断
3. 否则 判断 `value` 是不是一个不为 `null` 的 `object`，同时正则匹配 `value` 的 `toString` 的值

## Remark
1. [TypedArray MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)
2. [isTypedArray Node.js](http://nodejs.cn/api/util.html#util_util_types_istypedarray_value)
## Example
```js
isTypedArray(new Uint8Array)// => true

isTypedArray([])// => false
```
