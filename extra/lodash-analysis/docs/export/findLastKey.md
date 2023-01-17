# findLastKey

## Description
这个方法类似于findKey，不同之处在于它以相反的顺序遍历集合中的元素。
## Params
`(object, predicate)`
## Return
`string | undefined`
## Depend
```js
import baseFindKey from './.internal/baseFindKey.js'
import baseForOwnRight from './.internal/baseForOwnRight.js'
```
> [baseFindKey 源码分析](../internal/baseFindKey.md)
> <br/>
> <br/>
> [baseForOwnRight 源码分析](../internal/baseForOwnRight.md)
> 

## Code
```js
function findLastKey(object, predicate) {
  return baseFindKey(object, predicate, baseForOwnRight)
}
```
## Analyze
调用 `baseFindKey` 方法进行查找，使用 `baseForOwnRight` 作为遍历函数，也就是从右到左

## Example
```js
console.log(findLastKey({a:1,b:2,c:3}, (v) => v<3)) // b
```
