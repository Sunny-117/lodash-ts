# 连续赋值 


以下代码， 会输出什么
```js
var a = {n: 1};
var b = a;
a.x = a = {n: 2};
console.log(a.x);
console.log(b);
```

假设将上述代码改为
```js
var a = b = 1
```

那么问题会简单很多，答案是 a、b 都是 1


可是如果 a 是一个引用类型呢，这个时候赋值运算是怎么处理的

## [赋值运算](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Assignment_Operators)

基本的赋值运算符是等号（=），**该运算符把它右边的运算值赋给左边**。即，`x = y` 把 `y` 的值赋给 `x`

那么 对于 `a = b = 1`，就是 把 1 赋值给 b ，然后再把 b 赋值给 a ，在这个过程中 1 只使用了一次，就是赋值给 b 的时候

我们接着来分析一开始的例子 

1. 首先 定义 a, 并且在堆内存中开辟一个空间 ，创建一个新对象 {n: 1} 将一个对象 {n: 1} 的地址赋值给 a
2. 定义 b ， 将 a 的引用地址 赋值给 b
3. `a.x = a = {n: 2}`
    - 首先取 a.x ，但是 a.x 并不存在，所以 js 在堆内存中新增一个 x ，值为 undefined
    - 然后 将 a 的指针指向了 {n: 2} 的堆内存空间，此时 a 已经不在使用之前的堆内存了，而是一个新的堆内存，原来的只有 b 在使用
    - 然后 再将 a 指向的堆内存，赋值给 刚刚新增的 x
    - 此时 a = {n: 2} , b = {n: 1, x: {n: 2}}
4. 在调用 a.x 时，因为 a 为对象，所以 x 的初始值为 undefined

### 关键点
1. 对象中，不存在的属性，值为 undefined
2. 对象的成员在等待赋值的时候，锁定的是成员，而不是对象
3. 对象重新赋值时，并不是更改之前的堆内存，而是会重新开辟一片内存空间赋值，会更改栈中的指针指向，之前的内存空间，如果还有栈的指针指向它，则不会消失。（对应例子，就是 b 还指向之前的内存空间）

### 答案
所以， 最终答案为
```js
b = {n: 1, x: {n: 2}}
a = {n: 2}
a.x === undefined
```