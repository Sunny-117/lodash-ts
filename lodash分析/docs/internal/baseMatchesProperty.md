# baseMatchesProperty 

## Description 
matchesProperty的基本实现，不会拷贝srcValue。

创建一个深比较的方法来比较给定对象的 path 的值是否是 srcValue 。 如果是返回 true ，否则返回 false 。
## Params
`(path, srcValue)`
## Return
`Function`
## Depend
```js
import baseIsEqual from './baseIsEqual.js'
import get from '../get.js'
import hasIn from '../hasIn.js'
import isKey from './isKey.js'
import isStrictComparable from './isStrictComparable.js'
import matchesStrictComparable from './matchesStrictComparable.js'
import toKey from './toKey.js'
```
> [baseIsEqual 源码分析](./baseIsEqual.md)
> <br/>
> <br/>
> [get 源码分析](../export/get.md)
> <br/>
> <br/>
> [hasIn 源码分析](../export/hasIn.md)
> <br/>
> <br/>
> [isKey 源码分析](./isKey.md)
> <br/>
> <br/>
> [isStrictComparable 源码分析](./isStrictComparable.md)
> <br/>
> <br/>
> [matchesStrictComparable 源码分析](./matchesStrictComparable.md)
> <br/>
> <br/>
> [toKey 源码分析](./toKey.md)

## Code
```js
/** Used to compose bitmasks for value comparisons. */
const COMPARE_PARTIAL_FLAG = 1
const COMPARE_UNORDERED_FLAG = 2

function baseMatchesProperty(path, srcValue) {
  if (isKey(path) && isStrictComparable(srcValue)) {
    return matchesStrictComparable(toKey(path), srcValue)
  }
  return (object) => {
    const objValue = get(object, path)
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG)
  }
}
```
## Analyze
1. 如果 `path` 本身不是嵌套型的，而是一个单独的 `key`，并且 `srcValue` 可以使用严格相等判断，则返回 `matchesStrictComparable` 创建的函数，这里 会将 `path` 转为 `string` 类型，`-0` 会返回字符串的 `'-0'`
2. 如果 `path` 为多层嵌套的形式，则进行判断
    - 如果 `objValue` 为 `undefined`，并且 `srcValue` 也为 `undefined`，则使用 `hasIn` 进行判断
        - 这里使用 `hasIn` 判断可能会有问题， `hasIn` 会使用 `in` 操作符进行判断，但是 `in` 操作符，对于属性路径无法识别，可能会返回 `false`
    - 如果值不是 `undefined`，则使用 `baseIsEqual` 进行判断， `baseIsEqual` 这里既是无序模式，同时也是部分比较
    
3. 以下的判断，就会有问题
```js
const a = {
  a: {
    b: {
      c: undefined
    }
  }
}

const func = baseMatchesProperty('a.b.c', undefined)

func(a) // false

```

此时，判断结果为 `false`，但是实际上，按照方法的使用说明来看，应该返回 `true` 
## Remark
1. [in MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/in)
    如果指定的属性在指定的对象或其原型链中，则in 运算符返回 true
## Example
```js
const a = {
  a: {
    b: {
      c: 1
    }
  }
}

const func = baseMatchesProperty('a.b.c', 1)

console.log(func(a)) // true
```
