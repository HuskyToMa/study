## redux的内容

### redux的基本概念

redux是一个状态管理库，主要用于react的全局状态管理

redux是一个标准函数式编程规范的库，通过不同的action触发reducer，然后进行状态的修改，reducer是一个纯函数，接受要改变的状态，返回一个新的状态

### reducer为什么是一个纯函数

1. redux是一个函数式编程的库
2. reducer需要返回一个新的状态，在异步过程中是无法实现的

### middleWare

redux中间件，能够在dispatch中间实现各种处理，类似于koa的中间件，但是redux的中间件主要是用户处理副作用以及数据整合

### middleWare编写

中间件是一个颗粒化的函数

```javascript

const middleWare = store => next => action => {
    // do someting
}

```

redux提供了一个applyMiddleWare方法，能够将多个中间件以链式结构整合在一起，不断的深入

``` javascript

// applyMiddleWare的内部实现
// 整合了多个middleWare的内容，并且不断的将dispatch进行调用，即每个next方法都是下一个方法的调用形式
// 链式调用结束之后才能够调用到最后的store.dispatch;

function (store, middleWares) {
    // ...
    let dispatch = store.dispatch;

    middleWares.map(middleWare => {
        dispatch = middleWare(store)(dispatch);
    })

    return Object.assign({}, store, { dispatch });
}

```

### redux-thunk

redux-thunk是一个很简单的东西，它本质上就是将action进行判断，如果action是一个function的话，重新调用下action并传入参数

```javascript
// 源码
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }

    return next(action);
  };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;

```
