# matches 

## Description 
创建一个深比较的方法来比较给定的对象和 source 对象。 如果给定的对象拥有相同的属性值返回 true，否则返回 false。
## Params
`source`
## Return
`Function`
## Depend
```js
import baseClone from './.internal/baseClone.js'
import baseMatches from './.internal/baseMatches.js'
```
> [baseClone 源码分析](../internal/baseClone.md)
> <br/>
> <br/>
> [baseMatches 源码分析](../internal/baseMatches.md)
>

## Code
```js
/** Used to compose bitmasks for cloning. */
const CLONE_DEEP_FLAG = 1

function matches(source) {
  return baseMatches(baseClone(source, CLONE_DEEP_FLAG))
}

```
## Analyze
本质也就是对 `source` 进行了 深拷贝，然后 传给了 `baseMatches` 创建一个函数并返回

## Example
```js
const objects = [
  { 'a': 1, 'b': 2, 'c': 3 },
  { 'a': 4, 'b': 5, 'c': 6 }
]

console.log(objects.filter(matches({ 'a': 4, 'c': 6 })))// => [{ 'a': 4, 'b': 5, 'c': 6 }]
```
