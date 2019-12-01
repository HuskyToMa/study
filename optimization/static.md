## 静态资源优化

### 图片优化

jpeg: 不适合线条性图片和文字，压缩算法不支持，并且不止alpha通道即不支持透明度
png: 图片体积较大，不适合大量的使用大型图片
gif: 不适合存储彩色图片，适用于动画
webp: 不太适用彩色的图片，以及兼容性问题

### 图片压缩

> node-pngquant-native

跨平台，压缩比高，压缩png24非常好

``` javascript
    // 二次封装库
    const pngquant = require('jdf-png-native');
    const fs = require('fs');

    fs.readFile('./in.png', (err, buffer) => {
        const resBuffer = pngquant.option({}).compress(buffer);
        console.log(resBuffer);
    })

```

> jpegtran

jpegtran -copy none -optimize outefile out.jpg in.jpg

> gifsicle

gifsicle -optimize=3 -o out.gif in.gif

### 根据图片路径传入参数修改图片

node接收图片路径，通过参数解析获取到对应的调用方法，使用对应方法来处理图片返回图片结果

### 响应式图片

1. JavaScript 监控窗口大小
2. css 媒体查询
3. img 标签属性

### 逐步加载图片

1. 使用同一占位符
2. 使用LQIP，低质量占位符
3. 使用SQIP，基于svg

### 图片替代

1. web font
2. data uri
3. 雪碧图

## 页面渲染架构设计及方案选型

## 原生app优化

## 混合式开发（rn）

## 服务端和网络

## 研发开发流程

## 全链路质量建设