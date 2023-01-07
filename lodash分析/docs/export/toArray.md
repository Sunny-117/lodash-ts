# toArray

## Description
转换 value 为一个数组

## Params
`value`

## Return
`Array`

## Depend
```js
import copyArray from './.internal/copyArray.js'
import getTag from './.internal/getTag.js'
import isArrayLike from './isArrayLike.js'
import isString from './isString.js'
import iteratorToArray from './.internal/iteratorToArray.js'
import mapToArray from './.internal/mapToArray.js'
import setToArray from './.internal/setToArray.js'
import stringToArray from './.internal/stringToArray.js'
import values from './values.js'
```
> [copyArray 源码分析](../internal/copyArray.md)
> <br/>
> <br/>
> [getTag 源码分析](../internal/getTag.md)
> <br/>
> <br/>
> [isArrayLike 源码分析](./isArrayLike.md)
> <br/>
> <br/>
> [isString 源码分析](./isString.md)
> <br/>
> <br/>
> [iteratorToArray 源码分析](../internal/iterato rToArray.md)
> <br/>
> <br/>
> [mapToArray 源码分析](../internal/mapToArray.md)
> <br/>
> <br/>
> [setToArray 源码分析](../internal/setToArray.md)
> <br/>
> <br/>
> [stringToArray 源码分析](../internal/stringToArray.md)
> <br/>
> <br/>
> [values 源码分析](./values.md)

## Code
```js
const mapTag = '[object Map]'
const setTag = '[object Set]'

/** Built-in value references. */
const symIterator = Symbol.iterator
function toArray(value) {
  if (!value) {
    return []
  }
  if (isArrayLike(value)) {
    return isString(value) ? stringToArray(value) : copyArray(value)
  }
  if (symIterator && value[symIterator]) {
    return iteratorToArray(value[symIterator]())
  }
  const tag = getTag(value)
  const func = tag == mapTag ? mapToArray : (tag == setTag ? setToArray : values)

  return func(value)
}
```
## Analyze
1. `value` 为假值，则返回空数组
   
2. 如果是类数组，则判断如果是 `string` 类型，则调用 `stringToArray` 否则调用 `copyArray`
3. 如果是当前环境支持迭代器，并且 `value` 中存在迭代器，则使用 `iteratorToArray` 进行转换
4. 对于 `value` 获取其类型，`Map` 类型使用 `mapToArray` ， `Set` 类型使用 `setToArray` ， 对于其他类型都当做对象处理，使用 `values` 返回即可

## Example
```js
toArray({ 'a': 1, 'b': 2 })
// => [1, 2]

toArray('abc')
// => ['a', 'b', 'c']

toArray(1)
// => []

toArray(null)
// => []
```
