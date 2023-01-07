# 循环引用

在处理 拷贝 函数时，我们要关注几个点
1. 循环引用
2. 相同引用
3. 各种数据类型

我们先看看循环引用和相同引用的处理


### 什么是循环引用

我们以数组举例

```js
const a = [1]
a.push(a)
```

这个时候就出现了循环引用

<img  :src="$withBase('/assets/circular.png')" />

### 什么是相同引用

```js
var arr = [1,2,3]
var obj = {}
obj.a = arr
obj.b = arr
```
<img  :src="$withBase('/assets/sameRefernce.png')" />

对象中的元素，指向了同一内存空间

### 浅拷贝
```js
const a = [{a: 1}]

const {length} = a

const b = new Array(length)

let index = -1

while (++index < length) {
  b[index] = a[index]
}
```
这样就实现了一个简单的浅拷贝

浅拷贝的问题就是在于，当引用类型的值改变时，拷贝出来的对象对应的值也会发生改变，所以出现了深拷贝

### 深拷贝

我们以数组举例

```js
const a = [{a: 1}]
```

相对用的比较多的拷贝方法，是使用 JSON.parse JSON.stringify

```js
const b = JSON.parse(JSON.stringify(a))
```

但是这种方式如果放到循环引用的时候就会出错

```js
const a = [1]
a.push(a)

JSON.parse(JSON.stringify(a))
```

<img  :src="$withBase('/assets/JSON.parse.png')" />

在这个时候我们就不能使用 JSON.parse 的形式来进行 clone 了

#### 递归函数

以数组举例

```js
function clone (arr) {
  if (!Array.isArray(arr)) return arr
  const {length} = arr
  const result = new Array(length)
  let index = -1
  while (++index < length) {
    result[index] = clone(arr[index])
  }
  return result
}
```
如果当它是数组时，我们递归处理，但是递归处理对于普通的数组没有问题，对于循环引用的问题还是没有得到解决

<img  :src="$withBase('/assets/circular_clone.png')" />

可以看到，报 **栈溢出** 了

### 那么对于循环引用的问题应该怎么解决

1. 维护一个变量用来缓存已经遍历的值
2. 每次递归遍历时，判断当前值是否已经在变量中，如果有，说明已经递归过当前值，直接停止当前递归，返回上次递归的值即可

以数组为例，实现如下
```js
function cloneDeep (arr) {
  const map = new Map
  function _deep(target) {
    if (!Array.isArray(target)) return target

    if (map.get(target)) return map.get(target)

    const {length} = target
    const result = new Array(length)

    map.set(target, result)

    let index = -1
    while (++index < length) {
      result[index] = _deep(target[index])
    }
    return result
  }
  return _deep(arr)
}
```

通过一个 Map 对象来缓存，在递归调用时，进行一个判断，如果 key 值已经重复了，直接返回对应的 value 即可

如果有处理 数组或者对象等引用类型对比的函数 比如 [equalArrays](../internal/equalArrays.md) 时，也是这样的思路来进行循环引用的处理，可以使用 == 来进行对比

== 会遵循 [Abstract Equality Comparison](https://262.ecma-international.org/7.0/#sec-abstract-equality-comparison) 判断逻辑，在类型相同时，会执行 [Strict Equality Comparison](https://262.ecma-international.org/7.0/#sec-strict-equality-comparison) 判断逻辑

最终如果都是引用类型会走到 [SameValueNonNumber](https://262.ecma-international.org/7.0/#sec-samevaluenonnumber) 规范，该规范规定 **如果 x 和 y 指向同一个对象，返回 true， 否则返回 false**

<img  :src="$withBase('/assets/circular_clone_deep.png')" />

至此，就解决了循环引用和相同引用的问题


