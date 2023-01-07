# setToArray 

## Description 
将set转换为其值的数组。
## Params
`{Object} set`
## Return
`Array`

## Code
```js
function setToArray(set) {
  let index = -1
  const result = new Array(set.size)

  set.forEach((value) => {
    result[++index] = value
  })
  return result
}
```
## Analyze
1. 根据 set.size 初始化数组长度
2. set.forEach 遍历， 将值放到数组对应的下标中
## Remark
1. [Set.prototype.forEach() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach) 方法会根据集合中元素的插入顺序，依次执行提供的回调函数。
2. 这里不能像 [mapToArray](./mapToArray.md) 一样使用 entries 方法，会很复杂
3. [Set.prototype.entries() MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set/entries) 方法返回一个新的迭代器对象 ，这个对象的元素是类似 [value, value] 形式的数组，value 是集合对象中的每个元素，迭代器对象元素的顺序即集合对象中元素插入的顺序。由于集合对象不像 Map 对象那样拥有 key，然而，为了与 Map 对象的 API 形式保持一致，故使得每一个 entry 的 key 和 value 都拥有相同的值，因而最终返回一个 [value, value] 形式的数组。

```js
    const mySet = new Set();
    mySet.add("foobar");
    mySet.add(1);
    mySet.add("baz");
    
    const setIter = mySet.entries();
    
    console.log(setIter.next().value); // ["foobar", "foobar"]
    console.log(setIter.next().value); // [1, 1]
    console.log(setIter.next().value); // ["baz", "baz"]
```
## Example
```js
const set = new Set

for (let i = 0; i < 5; i++) {
  set.add('value'+i)
}

console.log(setToArray(set)) // [ 'value0', 'value1', 'value2', 'value3', 'value4' ]
```
