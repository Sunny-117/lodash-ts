# lodash-ts

本仓库只实现 lodash 中的某些漂亮的函数即可，比如 memorize, difference,没必要完全实现,封装到单独的包内，ts实现

Lodash 是一个一致性、模块化、高性能的 JavaScript 实用工具库。

Lodash 包含数组的排序算法和过滤、集合的算法、数学函数、与字符串的变更函数，共包含超过一百个函数。Lodash 使用的函数式编程模式允许开发者同时串连多数个函数。

同时，Lodash 的源码分析也可以提升自己的 JavaScript 功底

**Export** 是 `lodash` 暴露给用户使用的方法，如 `add` ， `set` ， `round` …… 等，这里的方法有互相依赖的，也有依赖于内部方法的，在每一篇源码分析中，都加入了对其依赖的源码分析的链接

**Internal** 是 `lodash` 内部的一些方法，这些方法大多是提供给 **Export** 中的方法调用的，一些方法因为是内部使用的方法，所以在参数的边界情况等的处理上并没有那么严格

**Other** 是在分析 lodash 源码过程中，发现的一些个人觉得值得记录的东西，如 [为什么0.1+0.2!==0.3]() 、 [拷贝对象时需要考虑什么]() 、 [有意思的位运算]() 等等，以及记录了 [lodash 源码里面一些不合理以及有错误的地方]()


https://lxchuan12.gitee.io/lodash/
https://juejin.cn/post/6957682023540457480
https://underglaze-blue.github.io/lodash-analysis/
https://lodash.lcs.show/
https://github.com/HeftyKoo/pocket-lodash
https://cloud.tencent.com/developer/article/1507017