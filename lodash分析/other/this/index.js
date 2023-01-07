function f1 () {
  console.log(this)
}
function f2 () {
  'use strict'
  console.log(this)
}

f1() // window
f2() // undefined

var foo = {
  bar: 10,
  fn: function() {
    console.log(this)
    console.log(this.bar)
  }
}
var fn1 = foo.fn
fn1()

var foo = {
  bar: 10,
  fn: function() {
    console.log(this)
    console.log(this.bar)
  }
}
foo.fn()

var student = {
  name: 'Lucas',
  fn: function() {
    return this
  }
}
console.log(student.fn() === student)

var person = {
  name: 'Lucas',
  brother: {
    name: 'Mike',
    fn: function() {
      return this.name
    }
  }
}
console.log(person.brother.fn())

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

console.log(o1.fn())
console.log(o2.fn())
console.log(o3.fn())

var o1 = {
  text: 'o1',
  fn: function() {
    return this.text
  }
}
var o2 = {
  text: 'o2',
  fn: o1.fn
}

console.log(o2.fn())

const foo = {
  name: 'lucas',
  logName: function() {
    console.log(this.name)
  }
}
const bar = {
  name: 'mike'
}
console.log(foo.logName.call(bar))

function Foo() {
  this.bar = "Lucas"
}
const instance = new Foo()
console.log(instance.bar)


const foo = {
  fn: function(){
    setTimeout(function() {
      console.log(this)
    })
  }
}
console.log(foo.fn())

var foo = {
  fn: function(){
    setTimeout(() => {
      console.log(this)
    })
  }
}
console.log(foo.fn())

function foo(a) {
  console.log(this.a)
}

var obj1 = {
  a: 1,
  foo: foo
}

var obj2 = {
  a: 2,
  foo: foo
}

obj1.foo.call(obj2)
obj2.foo.call(obj1)

function foo(a) {
  this.a = a
}

var obj1 = {}

var bar = foo.bind(obj1)
bar(2)
console.log(obj1.a)

function foo() {
  return a => {
    console.log(this.a)
  };
}

var obj1 = {
  a: 2
}

var obj2 = {
  a: 3
}

var bar = foo.call(obj1)
console.log(bar.call(obj2))

var a = 123
const foo = () => a => {
  console.log(this.a)
}

const obj1 = {
  a: 2
}

const obj2 = {
  a: 3
}

var bar = foo.call(obj1)
console.log(bar.call(obj2))

Function.prototype.bind = Function.prototype.bind || function (context) {
  var me = this;
  var args = Array.prototype.slice.call(arguments, 1);
  return function () {
    var innerArgs = Array.prototype.slice.call(arguments);
    var finalArgs = args.concat(innerArgs);
    return me.apply(context, finalArgs);
  }
}
