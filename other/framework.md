# 前端的架构

## 开发规范

## docker

就前端而言其实对使用docker的概率不是很大，但是如在深入使用node的情况下，那么docker就变得必要了，毕竟docker主要还是用在服务器上，针对各种环境的布置以及部署，所以针对我们环境部署来讲，如果用上docker会有事半功倍的感觉

## gitlab

## 脚手架

自建脚手架的必要性其实是根据各个公司的情况来自行考虑的，如果觉得`create-react-app`或者`vue-cli`带来的脚手架用处不是很够的话，可以考虑自己搭建，正常情况，没有特殊需求的公司或者产品是可以直接使用cli来快速搭建，没必要花费时间在这个上面，毕竟重头写一个出来也是要花点时间的，不如直接使用cli工具来的更快更方便，但是可能存在就是会有很多多余的内容残留

封装出3个项目

### webpack配置

使用`node`来运行`webpack，webpack-dev-server`运行开发环境，这没什么好说的，用的都是封装好的api

### react源代码路径

正常的路径解析，但是将webpack的配置使用`npm`包管理之后的路径配置，有不同的配置路径，以及`eslint，test`文件需要放在这里

### eslint

为了统一项目规范而使用的`eslint`，`webpack`配置中添加`eslint-loader`,可以保证每次文件更新的时候会触发eslint的校验，然后保证代码风格的统一，也可以添加`pre-commit`来触发`eslint`的校验

配置eslint的时候需要注意几个问题：

1. es6的代码可能还不能够解析，所以需要使用babel-eslint来解析es6的代码
2. `webpack alisa`中有的代码，指定路径的时候，需要添加`eslint-import-resolver-webpack`插件，来指定`webpack alisa`的路径
3. 可以配置路径解析，不需要写全路径
4. react中使用了`Airbnb`的`eslint`配置，那么需要编写`typeProps`和`defaultProp`

> eslint 配置

```javascript

module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "airbnb",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "settings": {
        "import/resolver": {
            "webpack": {
                "config": "node_modules/@mj/react-webpack/webpack/webpack.conf.js"
            }
        }
    },
    "parser": "babel-eslint",
    "rules": {
        'import/extensions': ['error', 'always', {
            'js': 'never',
            'jsx': 'never'
        }]
    }
};

```

### 脚手架下载cli工具

用于下载脚手架，避免每次都重新写一份或者说，拷贝一份

### 自动发布

这个需要使用到`jenkins`，严格意义上来讲不属于脚手架的范围，因为这个是在`git`上面进行的操作，当然，如果没有用到`jenkins`的话，可以在本地进行打包在使用`sh`脚本文件将打包后的代码上传到服务器上

### mock数据

在前后端分离的项目中，其实针对数据mock的方法非常的多，我就只写那么几点就好了，各个方法有各自的优势

1. 使用yapi，前后端通过对接口的定义，直接体现在yapi上，然后通过yapi的mock方法进行数据mock（简单，但是对返回的数据上的要求不严格）
2. 自建mock内容，通过node代理接口，然后将代理数据保存在本地一份，后续的所有接口全部跑本地存储的文件上的内容（必须联通本地数据一次之后才能开始开发，适合已经开发完成但是有需求更改的情况）
3. 拦截http请求，在http请求发送之前，针对整个项目上的一个dev环境，而是用本地文件的mock（需要自己书写mock的数据）

### node中间层

node中间层，看各自的情况吧，其实需求的方式并不是很大，而且意义上而言，反而容易出现各种问题

1. 服务端渲染，其实很多手机上的app而言已经不用服务端渲染了，所以从某种意义上来讲，seo的重要性有一定程度的降低，当然现在前端也有插件实现seo，并不一定需要用服务端渲染
2. 前端介入后端业务，这个事情，其实我并不是很赞成，因为前端跟后端的领域性其实是很大的，容易造成性能问题以及p0级故障

### 微前端

## 私有npm

这个是个必需品吧，在自己的项目没有开源或者自己公司的业务组件总需要有一个地方去存储的，不可能全放到业务框架里面，所以私有npm对一个公司而言是必需品，必须要搭建起来的一个项目

市场上现在有很多搭建方法，有一键搭建的也有可自己搭建的内容，我这边比较推荐的是`cnpm`吧，毕竟代码是可改并且自由度比较高，纯node编写的，前端能够看得懂

## jenkins

jenkins 是现有发布系统中使用率比较高的一个产品，针对所有项目能够打包编译以及自动化测试等内容，直接使用docker进行jenkins安装（注意一下docker安装时候的源地址，改成过内镜像）

### 自动化测试

## 单点登录

## 后台管理平台

### 权限

### 内容

## 报警系统

## 埋点系统

埋点对于一个企业对于用户的数据收集以及后续产品的方向的把握是十分重要的

1. 手动埋点
2. 无埋点
3. 可视化埋点

具体使用哪种方式，或者混合使用就是仁者见仁智者见智了，毕竟手动埋点更加精确，但是代码耦合度高，无埋点耦合度低，写起来方便，但是会将所有的行为都保存起来，可视化埋点对于平台的搭建要求比较高

我个人比较推荐的一种做法是，在无埋点的事件委托上，将`event.target`上添加`data-id`字段，并且在元素身上声明这个是什么类型的，进行一个判断，这样能够减少一些http请求，并且将一些不需要收集的方法不收集

> 无埋点实现方案

``` javascript

<img src="..." onError="报错方法"/>

window.addEventListener('click', function(e) {
    const target = e.target;
    // 判断target上的内容类型
    // 进行请求发送，1*1的gif图
    // 进入埋点
})

window.addEventListener('error', function(message, url, line, column, error) {
    // 进行错误检测
})

window.addEventLister('load', function() {
    // performance进行性能监控
})

// 也可以使用service work进行http请求拦截监听
```