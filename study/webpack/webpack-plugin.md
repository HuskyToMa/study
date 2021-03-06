## webpack plugin

根据钩子（hook）和tap方法，插件可以以多种不同的方式运行,针对不同的钩子有不同的调用方法

1. 同步钩子，使用tap

``` javascript

    compiler.hooks.compile.tap('myPlugin', params => {
        console.log('同步方式触发');
    })

```

2. 异步钩子，使用tapAsync或者tapPromise

``` javascript

    compilter.hooks.run.tapAsync('myPlugin', (compilter, callback) => {
        console.log('异步钩子');
        callback();
    })

```

3. 自定义钩子, 通过tapable中的钩子类来创建

``` javascript

    const SyncHook = require('tapable').SyncHook;

    if(compilter.hooks.myCustomHook) throw new Error('Alraed in use');
    compilter.hooks.myCustomHook = new SyncHook(['a', 'b', 'c']);

    compilter.hooks.myCustomHook.call(a, b, c);

```

### compilter 钩子

钩子名称 | 底层钩子 | 参数 | 解释
:-- | :-- | :-- | :--
entryOption | SyncBailHook | null | 在entry配置项处理过之后，执行插件
afterplugins | SyncHook | compiler | 设置完初始化插件之后，执行插件
afterResolvers | SyncHook | compiler | resolver安装完成之后，执行插件
environment | SyncHook | null | enviironment准备好之后，执行插件
beforeRun | AsyncSeriesHook | compiler | compiler.run()执行之前，添加一个钩子
run | AsyncSeriesHook | compiler | 开始读取records之前，添加钩子
watchRun | AsyncSeriesHook | compiler | 监听模式下，一个新的编译触发之后，执行插件
normalModuleFactory | SyncHook | normalModuleFactory | normalModuleFactory 创建之后，执行插件
contextModuleFactory | null | contextModuleFactory | contextModuleFactory创建之后，执行插件
beforeCompile | AsyncSeriesHook | compilationParams | 编译参数创建之后，执行插件
compile | SyncHook | compilationParams | 一个新的编译创建之后，添加一个钩子
thisCompilation | SyncHook | compilation | compilation 事件之前执行
compilation | SyncHook | compilation | 编译创建之后，执行插件
emit | AsyncSeriesHook | compilation | 生成资源到output目录之前
afterEmit | AsyncSeriesHook | compilation | 生成资源到output目录之后
done | SyncHook | stats | 编译完成
failed | SyncHook | error | 编译失败
invalid | SyncHook | fileName， changeTime | 监听模式下，编译无效时
watchClose | SyncHook | null | 监听模式停止


### compilation 钩子

[webpack官网](https://webpackjs.com/api/compilation-hooks)
