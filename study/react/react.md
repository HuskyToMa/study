## react 的学习心路历程

### react hooks

#### hooks出现的原因

1. 在组件之间难以复用状态逻辑
2. 组件变的难以理解
3. 取消class之间的难以理解的部分
    - this的指向
    - 方法的绑定
    - 在funtional和class之间来回切换
    - funtional还是class之间区分场景的使用
4. 不依赖其他的第三方数据管理库
5. 不影响class的使用，将会用hook渐进式取代class

#### hook 使用

1. hook只能在函数最外层调用
2. 只能在react的函数式组件中使用hook
3. 不要在循环，条件或嵌套函数中调用 Hook

#### state hook

> 使用中遇到的问题

1. 使用useState初始化为Object的时候，直接修改当前值再使用set是不起作用的，需要浅拷贝

#### effect hook

> 调用react的useEffect

1. 在组件更新之后会默认调用
2. effect 返回一个函数做清除副作用工作
3. 组件在渲染之后调用新的effect之前清除函数会被调用
4. 声明多个effect hook的时候，会根据声明的顺序依次调用
5. 传递第二个参数，用于进行性能优化，判断当前传入的第二个参数是否发生改变而去调用effect

#### 自定义 hook

1. 自定义hook必须以use开头
2. 在于重用逻辑而不在于重用状态

> 使用中遇到的问题

1. useEffect内部使用fetch或者ajax方法请求数据并返回的使用
    - 内部实现async函数，请求接口
    - 获取对应的数据，loading状态，路由设置
    - 自定义hook返回setUrl方法，对应数据，错误信息等等

#### 使用hook仿写redux

用到的方法： 
    useContext，useReducer，createContext
自定义的hook：
    useStore
自定义的方法：
    createStore，mergeReducer
自定义的高阶组件：
    StoreProvider

##### 使用方法

1. 在初始化app中调用createStore生成store
2. 可以使用mergeReducer，添加多个reducer
3. 在入口文件中引用StoreProvider的高阶组件，传入store（createStore生成的）
4. 在各自子组件当中使用useStore获取[state, dispatch]
5. 使用dispatch修改字段内容

### hooks实际应用

> useHttp

通过对`useEffect`的封装，只需要传入一定的参数就可以实现一个简单的http请求，可通过`setParams`修改参数重新获取请求


``` javascript

import React, { useState, useEffect } from 'react';
import Http from 'util/Http';

const useHttp = (func, params, defaultValue) => {

    const [res, setRes] = useState(void 0);
    const [param, setParam] = useState(params);

    useEffect(() => {

        if (typeof func === 'string') {
            func = Http.post.bind(this, func, { ...param });
        } else if (typeof func === 'function') {
            func = func.bind(this, { ...param });
        }

        const getUrlData = async () => {
            const curRes = await func();
            if (curRes) {
                setRes(curRes);
            }
        }
        getUrlData();
    }, [param])

    return [res || defaultValue, setRes, setParam];
}

export default useHttp;

```

> useDiff

这个方法是最简单的一个实现，通过判断传入的数据是否发生改变，然后会回调方法，假装是原来的`componentWillReceiveProps`生命周期

``` javascript

import React, { useEffect } from 'react';

const useDiff = (props, func) => {
    useEffect(() => {
        func()
    }, [props]);
}

export default useDiff;

```
