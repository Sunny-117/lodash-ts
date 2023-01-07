# baseXor

## Description
baseXor 的作用是，传入一个数组集 arrays ，找出这个数组集中，只在其中一个数组中存在的元素，组成新的数组作为结果返回。

baseXor 和其他很多 base 类的内部函数一样，也支持迭代器 iteratee 和 comparator 。

```js
console.log(baseXor([
  [1,2,3,4],
  [2,3,4,5],
  [3,4,5,6]
])) // => [ 1, 6 ]
```
## Params
`(arrays, iteratee, comparator)`
## Return
`Array`
## Depend
```js
import baseDifference from './baseDifference.js'
import baseFlatten from './baseFlatten.js'
import baseUniq from './baseUniq.js'
```
> [baseDifference 源码分析](./baseDifference.md)
> <br/>
> <br/>
> [baseFlatten 源码分析](./baseFlatten.md)
> <br/>
> <br/>
> [baseUniq 源码分析](./baseUniq.md)
> 

## Code
```js
function baseXor(arrays, iteratee, comparator) {
  const length = arrays.length
  if (length < 2) {
    return length ? baseUniq(arrays[0]) : []
  }
  let index = -1
  const result = new Array(length)

  while (++index < length) {
    const array = arrays[index]
    let othIndex = -1

    while (++othIndex < length) {
      if (othIndex != index) {
        result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator)
      }
    }
  }
  return baseUniq(baseFlatten(result, 1), iteratee, comparator)
}
```
## Analyze
### arrays 长度小于 2
也就是说 arrays 中 只有 1个 或者 0个 数组，那么就会做一个判断，如果有元素，就使用 baseUniq 进行去重，如果没有元素，就返回数组

### arrays 长度大于等于 2
这里先是定义了一个结果数组 result ， result 的长度和 arrays 的长度相等

这里可能会有点疑问，lodash 怎么知道 result 的长度一定和 arrays 的长度相等，假设
```js
arrays = [
  [1,2,3,4,5],
  [6]
]
```

如果这个样子， result 的长度肯定不是2， 而是6，不符合条件啊

这里其实有一点想法的偏差就是，我们会下意识认为 result 就是一个一维数组，但是其实不然， result 是一个 二维是数组

按照上述的例子，其实 result 在处理传入的 arrays 的时候，中途的结果是这样的
```js
result = [
  [1,2,3,4,5],
  [6]
]
```
这样看起来，长度和 arrays 就是相等的

接下来我们来看看具体的处理过程

### 处理逻辑
```js
  while (++index < length) {
  const array = arrays[index]
  let othIndex = -1

  while (++othIndex < length) {
    if (othIndex != index) {
      result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator)
    }
  }
}
```

以 遍历 arrays 的长度为结束条件

在每一次遍历时，拿到当前 arrays 中对应的数组 array

紧接着会遍历全部的 arrays 数组，然后进行对比

```js
 while (++othIndex < length) {
    if (othIndex != index) {
      result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator)
    }
  }
```

对比这里，判断了一个条件 `othIndex != index` 

如果按照这个逻辑 那就是 和 index 相等的这一组，是不会参与判断的

#### e.g

```js
arrays = [
  [1,2,3,4],
  [2,3,4,5],
  [3,4,5,6]
]
```

#### 在第一次遍历时
```js
拿到 array 为 [1,2,3,4]，然后遍历所有的 arrays，此时 index 为 0

内层循环，第一次判断 othIndex 为 0，不做处理
内层循环，第二次判断 othIndex 为 1, 此时通过 baseDifference 拿到 result[0] 或者 array 的值
和 arrays[othIndex] 的值做差集

    假设以 result 和 oth 表示，也就是说 拿到 result 相对 oth 的差集，什么意思

    就是 此时 result 为 [1,2,3,4] , oth 为 [2,3,4,5] ,得到的结果是 [1]

内层循环，第三次判断 othIndex 为 2, 继续通过 baseDifference 拿差集，同样以 result 和 oth 表示

    result 此时为 [1], oth 为 [3,4,5,6],差集结果为 [1]

至此 第一次遍历结束
```

第一次遍历完，`result` 为 `[[1], empty, empty]`

#### 第二次遍历
```js
拿到 array 为 [2,3,4,5]， 此时 index 为 1

inner,，othIndex 为 0，调用 baseDifference 拿差集，

    result 为 [2,3,4,5] , oth 为 [1,2,3,4], 差集 为 [5]

inner,，othindex 为 1， 不做处理

inner，othIndex 为 2， 调用 baseDifference 拿差集，

    result 为 [5], oth 为 [3,4,5,6], 差集 []

第二次遍历结束
```
第二次遍历完 `result` 为 `[[1], [], empty]`

#### 第三次遍历
```js
拿到 array 为 [3,4,5,6]， 此时 index 为 2

inner, othIndex 为 0， 调用 baseDifference 拿差集

    result 为 [3,4,5,6], oth 为 [1,2,3,4], 差集 [6]

inner, othIndex 为 1， 调用 baseDifference 拿差集

    result 为 [6], oth 为 [2,3,4,5], 差集 [6]

inner, othIndex 为 2， 不做处理

第三次遍历结束
```
第三次遍历完 `result` 为 `[[1], [], [6]]`

每一次在遍历时，使用 `othIndex !== index`, 跳过了自身的判断，防止出错


#### result 处理

到这一步，我们已经拿到了 `result` 所组成的 二维数组，那么结果需要的是一个 一维数组，接着就是要将二维数组展平

使用 `baseFlatten` 将数组展平，这时数组中可能会存在重复的元素

使用 `baseUniq` 去重后，返回结果即可


这就是 `baseXor` 处理的整体逻辑，会定义和 `arrays` 长度相等的 二维数组，然后每次比较时，都不比较自身，和其他元素都对比，拿到差集，最后将所有的差集展平，去重，就得到了 只在一个数组中出现的元素集合
## Remark
`while` 循环那个逻辑可以结合示例看两遍就明白了，相对比较清晰，就是比较拿相对差集

`baseDifference` 返回的差集，是指 **第一个数组相对第二个数组的 差集**

`[1,2,3],[2,3,4] => [1]`
## Example
```js
console.log(baseXor([
  [1,2,3,4],
  [2,3,4,5],
  [3,4,5,6]
])) // [1, 6]
```
