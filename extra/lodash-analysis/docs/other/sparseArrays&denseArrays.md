# 稀疏数组 和 稠密数组

```js
var a = new Array(3);
// a 在遍历时，并不会打印任何值，此时为稀疏数组
a.forEach(function (x, i) { console.log(i+". "+x) }) 

var b = new Array(3).fill(undefined)
b.forEach(function (x, i) { console.log(i+". "+x) }) // 0. undefined ; 1. undefined; 2. undefined;
```
区别在于遍历时，稀疏数组会跳过不存在的元素，但是稠密数组可以打印出来，虽然都为 `undefined`


### 快速创建自增数组
```js
[...Array(1000).keys()] // [0,1,2,3,4,...,999]
```


[JavaScript: sparse arrays vs. dense arrays](https://2ality.com/2012/06/dense-arrays.html)
