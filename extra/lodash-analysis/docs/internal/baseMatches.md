# baseMatches 

## Description 
和 matches 基本类似，区别在于不会 拷贝 source 对象

创建一个函数，该函数执行给定对象路径到srcValue的值之间的部分深度比较，如果对象值相等，则返回true，否则返回false。
## Params
`source`
## Return
`Function`
## Depend
```js
import baseIsMatch from './baseIsMatch.js'
import getMatchData from './getMatchData.js'
import matchesStrictComparable from './matchesStrictComparable.js'
```
> [baseIsMatch 源码分析](./baseIsMatch.md)
> <br/>
> <br/>
> [getMatchData 源码分析](./getMatchData.md)
> <br/>
> <br/>
> [matchesStrictComparable 源码分析](./matchesStrictComparable.md)


## Code
```js
function baseMatches(source) {
  const matchData = getMatchData(source)
  if (matchData.length === 1 && matchData[0][2]) {
    return matchesStrictComparable(matchData[0][0], matchData[0][1])
  }
  return (object) => object === source || baseIsMatch(object, source, matchData)
}
```
## Analyze
1. 首先根据 `getMatchData` 获取 `source` 的 `matchData` 数组，其中包含了每个属性值是否可以执行严格相等比较
2. 如果 `matchData` 长度为 1，并且可以执行严格相等，则使用 `matchesStrictComparable` 创建一个 比较函数，并返回
3. 否则创建一个箭头函数返回，参数为 `object`， 首先会判断 `object` 与 `source` 是否严格相等，如果严格相等则返回，否则 使用 `baseIsMatch` 来进行判断
4. 这里会判断，如果 source 只有单一属性，则返回的函数只会判断单一属性的相等性，否则使用baseIsMatch来判断整个对象是否包含
## Remark
1. 对于对象的 `===` 判断，如果两个对象指向同一个内存空间，则认为两个对象是相等的
## Example
```js
const a = {a:1,b:2,c:3,d: {}}

const fun = baseMatches(a)

const b = {a:1,b:2,c:3,d: {},e:2}

console.log(fun(b)) // true
```
