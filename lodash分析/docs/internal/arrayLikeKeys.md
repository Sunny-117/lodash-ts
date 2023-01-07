# arrayLikeKeys 

## Description 
创建一个数组，将 value 对应的 key 放到数组中，并返回，如果是 Array，arguments， buffer，typedArray ，会收集索引
## Params
`(value, inherited)`
> inherited 是否收集原型链上的属性
>

## Return
`Array`
## Depend
```js
import isArguments from '../isArguments.js'
import isBuffer from '../isBuffer.js'
import isIndex from './isIndex.js'
import isTypedArray from '../isTypedArray.js'
```
> [isArguments 源码分析](../export/isArguments.md)
> <br/>
> <br/>
> [isBuffer 源码分析](../export/isBuffer.md)
> <br/>
> <br/>
> [isIndex 源码分析](./isIndex.md)
> <br/>
> <br/>
> [isTypedArray 源码分析](../export/isTypedArray.md)
>

## Code
```js
const hasOwnProperty = Object.prototype.hasOwnProperty

function arrayLikeKeys(value, inherited) {
  const isArr = Array.isArray(value)
  const isArg = !isArr && isArguments(value)
  const isBuff = !isArr && !isArg && isBuffer(value)
  const isType = !isArr && !isArg && !isBuff && isTypedArray(value)
  const skipIndexes = isArr || isArg || isBuff || isType
  const length = value.length
  const result = new Array(skipIndexes ? length : 0)
  let index = skipIndexes ? -1 : length
  while (++index < length) {
    result[index] = `${index}`
  }
  for (const key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
        // Safari 9 has enumerable `arguments.length` in strict mode.
          (key === 'length' ||
           // Skip index properties.
           isIndex(key, length))
        ))) {
      result.push(key)
    }
  }
  return result
}
```
## Analyze
1. 首先 判断 `array` ，`arguments`， `buffer` ，`typedArray` 这几种类型，创立标识符 `skipIndexes`
2. 如果 `skipIndexes` 标识符为真，则 `result` 数组的长度就为 `value.length` ，否则长度为 `0`
3. 对于 `index` 的处理也是如此，如果 `skipIndexes` 标识符为真，则为 `-1`， 否则等同于 `length`
4. 使用 `while` 循环遍历，这里如果 `index == length` ，因为是 `++index`， 所以不会进入 `while` 循环，否则就给数组每一项设置为字符串类型 `index`，使用 `while` 是为了遍历 **稀疏数组**
5. 使用 for in 来遍历 value 自身和原型链上的属性
    - (inherited || hasOwnProperty.call(value, key)) 
        - 本来只遍历 `value` 存在的属性（`hasOwnProperty.call(value, key)`），但是因为有标识符 `inherited` 的关系，如果传入了 `true` 对于原型链上的可枚举属性也会遍历
    - !(skipIndexes && ((key === 'length' || isIndex(key, length))))
        - 类数组的下标，在之前已经进行过处理，所以这里对于 index 不做处理 `skipIndexes && isIndex(key, length)`
        - 因为 在 Safari 9 的严格模式下，`arguments` 的 `length` 属性变成了可枚举，所以这里排除了 `length` 属性的收集

## Remark
1. [for...in MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...in) 语句以任意顺序遍历一个对象的除 Symbol 以外的可枚举属性
2. [hasOwnProperty() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty) 方法会返回一个布尔值，指示对象自身属性中是否具有指定的属性（也就是，是否有指定的键）。
## Example
```js
const a = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  length: 4
}

const b = [1,2,3,3,4,5,6,7]
const c = new Uint8Array(10)

function Test(){}
Test.prototype.name = 'Test'
Test.prototype.type = 'Function'

const d = new Test
d['a'] = 1
d['b'] = 2
d['c'] = 3
d['d'] = 4

console.log(arrayLikeKeys(a)) // [ '0', '1', '2', '3', 'length' ]
console.log(arrayLikeKeys(b)) // ['0', '1', '2', '3', '4', '5', '6', '7' ]
console.log(arrayLikeKeys(c)) // ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ]
console.log(arrayLikeKeys(d)) // [ 'a', 'b', 'c', 'd' ]
console.log(arrayLikeKeys(d, true)) // [ 'a', 'b', 'c', 'd', 'name', 'type' ]
```
