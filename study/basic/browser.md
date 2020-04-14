# 浏览器的基本知识

## 从输入url到页面展示

首先需要知道，在这一过程当中一共做了多少事情

1. 输入url
2. 解析url是否正确
3. 查看本地缓存是否已经缓存过当前的url
4. 查找对应的url的DNS
5. 进行http/https连接
6. 如果返回的结果是重定向（上述步骤重来）
7. 获取返回的内容
8. 分析返回的请求头内容，是下载还是解析
9. 页面开始解析（dom tree， cssdom tree）
10. 重绘，回流

## 缓存策略

1. cache storage
2. 强缓存
3. 协商缓存

## 垃圾回收机制

js的垃圾回收分为两块内容

### 新生代

新生代是指一些生存周期短的变量会存在新生代的内容空间中，在新生代区域，分为两块，一个是正在使用的空间，另一个是空闲的空间，当正在使用的空间快要满的时候，会进行标记清除，然后将还在活跃的对象放入空闲空间并跟正在使用的空间进行替换，不断往复

### 老生代

老生代是指一些生命周期比较长的变量存放的空间，他的清除方式是标记清除

## javascript运行机制

## 变量的存储

存在两种存储方式， 栈和堆

栈是在代码运行时生成的，跟js调用栈一样，当调用到当前函数的时候，会生成一个调用栈，然后一些基本类型的内容会存在栈中

在栈中，存在的变量都是一些周期短的，只存储一些基础类型的变量，boolean，number等

所有的复合类型数据结构的变量都是存放在堆中，在栈里只保留了对object地址的引用，闭包的变量也是存在在堆中，所有的基本类型会形成一个闭包的object存放