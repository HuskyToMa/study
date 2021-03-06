## webpack学习

之前跟着视频走了一趟webpack的内容，感觉没有深刻领会webpack，所以我决定自己从头整理一趟webpack的内容

### entry

1. 将公用的文件打包成一个独立的模块

    ``` javascript
        entry: {
        vendor: ['antd'],
        react: ['react', 'react-router', 'react-redux', 'redux', 'redux-saga'],
        index: path.resolve(__dirname, '../src/index.ts')
    },
    ```

2. 单入口的只需要写一个文件入口，多入口的需要添加多个文件入口以及 多个 htmlWebpackPlugin
3. resolve设置extensions的时候，需要添加'.js'而不是'js'
4. 将公用的lessLoader分离出去，dev环境不需要打包出额外的css，pro环境需要从js中读取css组成文件（mini-css-extract-plugin）
5. 将图片等文件用url-loader处理，超过4KB就用路径，小于4KB则用base64
6. 开发使用hotonly而不是用hot，避免每次修改重新刷新页面
7. 添加const文件，获取当前目录文件路径
8. pro环境添加js代码压缩（uglifyjs-webpack-plugin）
9. pro环境添加css文件压缩插件（optimize-css-assets-webpack-plugin）

### 自动化测试

https://travis-ci.org/

### 性能优化

1. 使用happypack进行多进行/多实例打包

```javascript

    module: {
        rules: [
            {
                test: /.(ts|tsx)$/,
                loader: 'HappyPack/loader?id=babelLoader',
                exclude: /node_modules/
            }
        ]
    }

    plugins: [
        new HappyPack({
            id: 'babelLoader',
            cache: true,
            loaders: ['babel-loader']
        })
    ]

```

2. 使用dll预编译模式对公共包进行打包

``` javascript

    // webpack.dll.conf.js
    module.exports = {
        entry: {
            react: ['react', 'react-dom'],
            redux: ['redux', 'react-redux', 'redux-saga'],
            reactRouter: ['react-router', 'react-router-dom']
        },
        output: {
            path: path.resolve(__dirname, "./dll"),
            filename: "myDll.[name].js",
            library: "[name]_[fullhash]"
        },
        plugins: [
            new webpack.DllPlugin({
                path: path.resolve(__dirname, "./dll", "[name]-manifest.json"),
                name: "[name]_[fullhash]"
            })
        ]
    }

    // webepack.pro.conf.js
    new webpack.DllReferencePlugin({
        manifest: require('./dll/react-manifest.json'),
        name: './myDll-react.js',
    })
```

3. tree Shaking 擦除无用的css代码

``` javascript

    const glob = require('glob');

    const PATHS = {
        src: path.join(__dirname, 'src')
    }

    new PurgecssPlugin({
        paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
    }),

```

4. 使用cache进行构建缓存
5. 对图片进行压缩
    - Node库 imagemin / yinypng API
    - image-webpack-loader
6. 动态polyfill
    - polyfill Service 识别User Agent，动态下发不同的plyfill
    - polyfill.is/v3/polyfill.min.js


### 源码分析

#### 入口文件：

    1. process.exitCode   正常执行返回
    2. runCommand   运行命令
    3. isInstalled  判断是否存在包（require.resolve）
    4. CLIs         webpack可用包，webpack-cli，webpack-command
    5. isInstalledCLIs  判断是否安装命令行包
    6. webpack会去寻找webpack-cli执行其命令
    7. webpack-cli使用yargs配置命令行参数
    8. webpack-cli最终使用webepack构建

#### tapable：

> 类似于nodejs的eventEmitter的库（发布订阅），控制webpack的插件系统

```javascript

const {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelBailHook,
    AsyncSeriesHook,
    AsyncSeriesBailHook,
    AsyncSeriesWaterfallHook,
    MultiHook,
    HookMap,
    Tapable
} = require('tapable')

```

> tapable中的钩子名称对应含义

type | function
:-- | :--
Hook | 所有钩子的后缀
Waterfall | 同步方法，会传值给下一个函数
Bail | 熔断：当函数有返回值的时候，就会在当前执行函数停止
Loop | 监听函数返回truee表示继续循环，返回undefined表示结束循环
Sync | 同步方法
AsyncSeries | 异步串行钩子
AsyncParallel | 异步并行执行钩子

> tapable 提供了同步&异步的绑定钩子的方法

Async* | Sync*
:-- | :--
绑定：tapAsync/tapPromise/tap | 绑定：tap
执行：callAsync/promise | 执行：call

#### tapable 使用

``` javascript

const {
    SyncHook
    AsyncSeriesHook
} = require('tapable')

// 创建同步的hook
const hook = new SyncHook(['arg1', 'arg2', 'arg3']);
// 创建异步钩子
const asyncHook = new AsyncSeriesHook(['test1', 'test2', 'test3']);

asyncHook.tapPromiise('asyncHook1', (test1, test2, test3, callback) => {
    cosnole.log('asyncHoook done');
    return new Promise(resolve, reject => {
        setTimeout(() => {
            console.log(`this hook params is ${test1} , ${test2} , ${test3}`)
            resolve();
        }, 1000)
    })
})

// 绑定hook内容
hook.tap('hook1', (arg1, arg2, arg3) => {
    console.log(arg1, arg2, arg3);
})

// 执行hook
hook.call(1, 2, 3);

// 执行asyncHook
asyncHook.promise(1, 2, 3).then(() => {
    console.log('promise resolve');
}).catch(e => {
    cosnole.log('promise error');
    console.error(e);
})

```

#### webpack 插件

webpack插件方式是tapable跟webpack关联的一种行为方式，使用事件监听的方法，对webpack返回出来的compiler的hooks进行监听并完成
对应的功能

> 流程

plugins是一个array格式的结构，对于外部传入的plugins会进行判断，是否是一个function，如果是，并执行plugin的apply方法

言外之意，就是如果我们需要去编写一个plugin的话，则必须开放出一个apply方法给webpack去调用

```javascript

if(options.plugins && Array.isArray(options.plugins)) {
    compiler.apply.apply(compiler, options.plugins);
}

```

### 打包结果

``` javascript
    // webpack.js
    const path = require('path');
    module.exports = {
        entry: path.resolve(__dirname, './index.js'),
        output: {
            filename: 'build.js',
            path: path.resolve(__dirname, 'dist')
        },
        optimization: {
            minimize: false
        }
    }
    // index.js
    const a = '123';

```

最基础的webpack的配置就是一个入口一个出口，这样就能将js的内容打包出来，那么来看下打包之后的结果是怎么样的

``` javascript

(function(modules){
    function __webpack_require__(moduleId) {
        // Check if module is in cache
        if(installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        // Create a new module (and put it into the cache)
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };

        // Execute the module function
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

        // Flag the module as loaded
        module.l = true;

        // Return the exports of the module
        return module.exports;
    }

    return __webpack_require__(__webpack_require__.s = 0);
})([
    (function(module, exports) {
        const a = '123';
    })
])

```

去掉多余累赘内容，就剩下了一个自调用函数，先看下函数内部

有一个 `__webpack_require__` 的方法，这个是webpack自己实现的commonjs规范的require方法，然后看下面的参数

是一个function，里面就一句 `const a = '123';` ，这很明显，这个就是我们刚刚写的 `index.js`，然后自调用函数里面默认返回了类似 `require(0)` 的操作，这表明，在这个js加载的时候，默认会引用我们的入口文件
