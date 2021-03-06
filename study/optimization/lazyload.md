## 懒加载

### IntersectionObserver

IntersectionObserver 是交叉监听，在两个元素相交的时候会触发当前的回调

IntersectionObserver 是一个工厂函数，返回一个实例对象，实例对象上有`observe`和`unobserve`方法，参数都是dom元素，能够监听这个元素与 `IntersectionObserver` 传入的root节点（默认为当前文档可视范围），和接触监听

``` javascript

const ob = new IntersectionObserver((entries) => {
    entries.map(item => {
        // 小于等于0，即未进入可视区域
        if (item.intersectionRatio <= 0) {
            return ;
        }
        // func()
    })
});

ob.observe(dom);

```

### IntersectionObserver + React

话不多说直接上代码

``` javascript

import React from 'react';

const getDataTimeOut = func => {
    const flag = func();
    if (!flag) {
        setTimeout(() => {
            getDataTimeOut(func);
        }, 1000)
    }
}

class LazyLoad extends React.Component {

    observer = null;

    componentDidMount() {
        this.observer = new IntersectionObserver(this.observerCallback);
        // 存在异步获取数据并更新的情况，所以需要在不断的循环去查找对应的img元素是否已经生成
        // 不想使用额外的生命周期
        getDataTimeOut(() => {
            const doms = document.querySelectorAll('img');
            if (doms.length) {
                Array.from(document.querySelectorAll('img')).map(dom => this.observer.observe(dom))
            }
            return doms.length;
        })
    }

    componentWillUnmount() {
        // 解除引用
        this.observer = null;
    }

    observerCallback = entries => {
        // 返回的进入可视范围的元素
        entries.map(ob => {
            // 小于等于0的即未进入
            if (ob.intersectionRatio <= 0) {
                return ;
            }
            const target = ob.target;
            const currentSrc = target.getAttribute('data-src');
            target.src = currentSrc;
            this.observer.unobserve(target);
        })
    }



    render() {
        return  <>
                    {this.props.children}
                </>
    }
}

export default LazyLoad;

```

通过这个react组件，内部含有`img`标签的元素并且`img`的元素`src`为空，自定义属性`data-src`存在就可以使用图片的懒加载了
