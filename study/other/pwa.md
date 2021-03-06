# PWA

pwa 是一个可以将网页应用放在手机桌面的一个概念，他不是一个方法，是一连串的使用方法整合起来的一种技术集合

## Service Work

Service Work 可以理解为一个Web应用程序，浏览器与网络之前的一层代理服务器，他能够在后台执行你注册时候写入的一个js文件

``` javascript

// app.js
if ('serviceWorker' in window.navigator) {
    navigator.serviceWorker.register('./sw.js', { scope: './' }).then(reg => {
        console.log('serviceWork is success', reg);

    }).catch(err => {
        console.log('serviceWorker is error', err);
    })
}

// sw.js
this.addEventListener('install', event => {
    console.log('serviceWorker is install', event);
    event.waitUntil(
        caches.open('sw_demo').then(function (cache) {
          return cache.addAll([
            '/test.js',
            '/app.js',
            '/index.html'
          ])
        }
    ));
})

this.addEventListener('activate', event => {
    console.log('serviceWork is activate', event);
})

this.addEventListener('fetch', function(event) {
    event.respondWith(caches.match(event.request).then(function(response) {
        if (response !== undefined) {
            return response;
        } else {
            return fetch(event.request).then(function (response) {
            let responseClone = response.clone();
            caches.open('sw_demo').then(function (cache) {
                cache.put(event.request, responseClone);
            });
            return response;
            }).catch(function () {
            return caches.match('/app.js');
            });
        }
    }));
});

```

在html里面将app.js引入，就能够生成一个`service work`，如果你的浏览器支持的话，然后内部可以直接使用this监听`install`,`activate`,`fetch`三个方法，然后使用`Cache Storage API`将文件缓存到本地，并读取跟重新吸入

## Cache Storage

上面的代码中使用了部分的`cache storage`的方法，他是可以单独使用的，并不是必须在`service work`中

将文件缓存到本地，能够通过放出来的API进行缓存文件的细微操作

## Web App Manifest

暂时只是一个草案，他实际上就是一段json，然后通过`link`引入，具体的参数在 [MDN](https://developer.mozilla.org/en-US/docs/Web/Manifest) 上面写的很清楚

## push & Notification

Notification是一个消息提醒框，能够推送一个消息提示，在手机上的展示行为与app一致

``` javascript

function spawnNotification(theBody,theIcon,theTitle) {
  var options = {
      body: theBody,
      icon: theIcon
  }
  var n = new Notification(theTitle,options);
}

```

具体参数在 [MDN](https://developer.mozilla.org/en-US/docs/Web/API/notification/Notification) 上体现的很清晰

## 自适应的布局

这个是前端的基础了，不应该拿出来讲，可以写手机端跟PC端的自适应布局形式，这样的web应用才能够再手机上展示的比较好
