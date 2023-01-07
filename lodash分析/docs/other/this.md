# this
## this到底指向谁
1. 在函数体中，非显式或隐式的简单调用函数时，在严格模式下(`'use strict'`)，函数的 this会被绑定到 `undefined` 上，在非严格模式下会被绑定到全局对象 `window`/`global` 上
2. 一般使用 `new` 方法调用构造函数时，构造函数内的`this`会被绑定到新创建的对象上
3. 一般通过`call`/`apply`/`bind`方法显式调用函数时，函数体内的`this`会被绑定到指定参数的对象上
4. 一般通过上下文对象调用函数时，函数体内的`this`会被绑定到改对象上
5. 在箭头函数中，`this`的指向是由外层(函数或全局)作用域来决定的，箭头函数的绑定无法被修改

## 全局环境中的this
```js
    function f1 () {
      console.log(this)
    }
    function f2 () {
      'use strict'
      console.log(this)
    }
    
    f1() // window
    f2() // undefined
```

在严格模式下指向`undefined`，在非严格模式指向`window`

```js
    var foo = {
      bar: 10,
      fn: function() {
        console.log(this)
        console.log(this.bar)
      }
    }
    var fn1 = foo.fn
    fn1()
```

此时`fn`函数仍在`window`的全局环境中执行，因此，会输出 `window` 和 `undefined`

```js
    var foo = {
      bar: 10,
      fn: function() {
        console.log(this)
        console.log(this.bar)
      }
    }
    foo.fn()
```
这里this指向最后调用它的对象，也就是 `foo`

## 上下文对象调用中的this
简单来说就是 this会指向最后调用它的对象

```js
    var o1 = {
      text: 'o1',
      fn: function() {
        return this.text
      }
    }
    var o2 = {
      text: 'o2',
      fn: function() {
        return o1.fn()
      }
    }
    var o3 = {
      text: 'o3',
      fn: function() {
        var fn = o1.fn
        return fn()
      }
    }
    
    console.log(o1.fn()) // o1
    console.log(o2.fn()) // o1
    console.log(o3.fn()) // undefined
```
第一次调用时，`o1.fn()` , this指向 o1, `o2.fn()` this指向还是 o1, `o3.fn()` ,this指向window

## 通过bind、call、apply改变 this 指向
call、apply、bind 的区别，用一句话总结就是，它们都是用来改变相关函数 this 的指向，但是 call 和 apply 是直接进行相关函数调用的；bind 不会执行相关函数，而是返回一个新的函数，这个新的函数已经自动绑定了新的 this 指向，开发者可以手动调用它。

```js
    const foo = {
      name: 'lucas',
      logName: function() {
        console.log(this.name)
      }
    }
    const bar = {
      name: 'mike'
    }
    console.log(foo.logName.call(bar)) // mike
```

## 构造函数和 this
```js
    function Foo() {
      this.bar = "mike"
    }
    const instance = new Foo()
    console.log(instance.bar) // mike
```
#### new 操作符到底做了什么：
1. 创建一个新的对象
2. 将构造函数的this指向这个新的对象
3. 为这个对象添加属性、方法等
4. 最终返回新的对象

#### 如果在构造函数中出现了 return
```js
    function Foo() {
      this.name = "mike"
      const a = {}
      return a
    }
    const instance = new Foo()
    console.log(instance.name) // undefined
```
此时 instance 返回的是空对象 a

```js
    function Foo() {
      this.name = "mike"
      return 1
    }
    const instance = new Foo()
    console.log(instance.name) // mike
```
如果构造函数中显式的返回了一个值，且返回的是一个对象（返回复杂类型），那么 this 就会指向其返回的对象；如果返回的不是一个对象（返回基本类型），那么 this 仍然指向实例

## 箭头函数中的this
箭头函数中 this 的指向是由起所属函数或全局作用域决定的

```js
    const foo = {
      fn: function(){
        setTimeout(function() {
          console.log(this)
        })
      }
    }
    console.log(foo.fn()) // window
```
上面代码中，this出现在 setTimeout 的匿名函数中，因此 this 指向 window 对象

```js
    var foo = {
      fn: function(){
        setTimeout(() => {
          console.log(this)
        })
      }
    }
    console.log(foo.fn())
```
通过箭头函数可以将 this 指向到 fn


[this MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)
