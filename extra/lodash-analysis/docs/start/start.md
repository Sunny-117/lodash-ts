# 开始

::: tip 提示
和现有 npm 能下载的最新版本不同， lodash 在更新过程中也会删除一些方法，或者重新实现一些方法。

本次源码分析只针对于 GitHub 上 lodash [master](https://github.com/lodash/lodash) 分支下的代码

因为写源码分析时，时间是 2021年1月，在后续有可能 lodash 会更新一些内容，因此如果在对比过程中发现有代码更新的部分，可以在 当前源码分析的 GitHub 仓库中找到对应的 [lodash](https://github.com/Underglaze-Blue/lodash-analysis/tree/main/lodash) 代码
:::

## 目录

**Export** 是 `lodash` 暴露给用户使用的方法，如 `add` ， `set` ， `round` …… 等，这里的方法有互相依赖的，也有依赖于内部方法的，在每一篇源码分析中，都加入了对其依赖的源码分析的链接

**Internal** 是 `lodash` 内部的一些方法，这些方法大多是提供给 **Export** 中的方法调用的，一些方法因为是内部使用的方法，所以在参数的边界情况等的处理上并没有那么严格

**Other** 是在分析 lodash 源码过程中，发现的一些个人觉得值得记录的东西，如 [为什么0.1+0.2!==0.3](../other/0.1+0.2.md) 、 [拷贝对象时需要考虑什么](../other/CircularReferences.md) 、 [有意思的位运算](../other/bit0peration.md) 等等，以及记录了 [lodash 源码里面一些不合理以及有错误的地方](../other/question.md)

::: tip
源码分析大部分是基于个人现有的知识做的分析，有不合理的地方欢迎指正以及交流
:::

#### 现在可以开始源码分析第一篇, [add](../export/add.md) 的实现
