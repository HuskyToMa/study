## 设计模式

js设计基础，拥有设计模式能够有更好的开发体验，开发出的代码拥有更好的维护性

### 工厂模式

工厂模式，顾名思义，类似工厂的一种生产模式，量化的产生一系列相同的产品，即使用工厂模式进行设计内容的时候，开发一个统一创建接口，返回一个唯一的值

``` javascript

class Factory {
    constructor(name) {
        this.name = name;
    }

    getName(){
        return this.name;
    }

}

const a = new Factory('123');

console.log(a.getName());

```

利用es6的class语法糖能够很方便的获得一个简单工厂模式的类，但是这样的简单工厂会有一个问题，举个例子，如果我们有一批手机来自不同的厂家，那么我们在生产的时候就需要通过不同的工厂去生产不同的手机，而不是同一个工厂生产，虽然在js语法中使用同一个类也能够实现一个工厂生产多种类型的手机，但是这个与工厂模式的原意略微相差

``` javascript

class PhoneFactory {
    constructor(name) {
        this.name = name;
    }

    getName(){
        return this.name;
    }

    createdProduct() {
        switch(this.name) {
            case 'apple':
                console.log('apple Factory');
                break;
            case 'huawei':
                console.log('huawei Factory');
                break;
            case 'xiaomi':
                console.log('xiaomi Factory');
                break;
            default:
                throw new Error('厂家错误');
        }
    }

}

const a = new PhoneFactory('apple');

console.log(a.createdProduct());

```

上面的方法实现了一个工厂生产多个商品，每当生产新的产品的时候都需要判断下当前的是哪个牌子的手机，然后去生产这样其实不符合工厂模式的内容

``` javascript

class PhoneFactory {
    constructor(name) {
        this.name = name;
    }

    getName(){
        return this.name;
    }

    createdProduct() {
        throw new Error('不能使用抽象方法');
    }

}

class huaweiPhoneFactory extends PhoneFactory{
    constructor(name) {
        super(name)
    }

    createdProduct() {
        console.log('huawei Factory');
    }
}

const phone = new huaweiPhoneFactory();

phone.createdProduct();

```

通过定义一个父类工厂，实现抽象方法，在用子类去继承父类具体实现方法，来完成工厂模式，这样就能够通过固定的工厂生产固定的手机

### 观察者模式

观察者模式简单的说就是根据以一个上帝视角观察整个页面，当一个数据变化或者触发到一个数据就会触发一个方法

js里天然存在很多观察者模式的方法，各种数据监听，各种事件监听，`Object.defineProperties`, `proxy`

``` javascript

// 数据劫持算是比较简单的观察者了，他观察了当前这个对象，并对对象的修改做出反应
let a = {}
let currentVal = '';
Object.defineProperty(a, 'b', {
    get(){
        return currentVal;
    },
    set(val) {
        currentVal = val;
    },
    enumerable : true,
    configurable : true
})

// es6提供了新的数据劫持的方法proxy
let a = new Proxy({}, {
    get(target, name) {
        console.log(target, name);
        return target[name];
    },
    set(target, name, val) {
        console.log(target, name, val);
        target[name] = val;
    }
})
```

### 发布订阅模式

发布订阅也称订阅者模式，这是比较常见的一种设计模式，vue的主要核心用的就是发布订阅模式，举个例子，就是你打个电话通知一鸣以后每天早上给你送一杯牛奶，这你就订阅了一鸣的牛奶，而一鸣每天到早上6点的时候，就开始通过订阅的人发送对应的牛奶，这就是最粗俗易懂的发布订阅理解

``` javascript

class Dep {
    constructor(name, publish = void 0) {
        this.name = name;
        this.publish = publish;
        this.child = [];
    }

    setPublish(publish) {
        thiis.publish = publish
    }

    add(dep) {
        this.child.push(dep);
        return this;
    }

    del(dep) {
        this.child = this.child.filter(item => item.name === dep.name);
    }

    done() {
        this.child.map(item => {
            item.publish();
        })
    }
}

function getName() {
    console.log(`${this.name} is publish`);
}

const dep = new Dep('dep', getName);
const dep1 = new Dep('dep1', getName);
const dep2 = new Dep('dep2', getName);
const dep3 = new Dep('dep3', getName);

dep.add(dep1).add(dep2).add(dep3);

dep.done();

```

上面就是一个简单的订阅器，能够通过dep添加对应的子dep，而子dep也可添加对应的依赖，当触发到一定条件的时候触发当前的dep进行执行就可以了

### 单例模式

单例模式是一种能减少消耗的模式，不管你new多少个新的对象，如果已经存在这个对象，那么只会返回当前对象，而不会新建对象

``` javascript

const createdCase = function () {
    let single = '';
    function singleCase(name) {
        this.name = name
    }

    return function(name) {
        return single ? single : single = new singleCase(name)
    }
}();

const a = new createdCase('123');
const b = new createdCase('111');

console.log(a.name === b.name); // true

```

使用闭包的形式保存住唯一的生成内容，每次new function的时候会判断当前是否已经存在，如果已经存在就返回当前的内容不存在就新new一个对象

### 策略模式

策略模式讲究将具体计算与判断逻辑进行分离，以便于减少if-else的死亡判断，话不多说直接看代码

``` javascript

// 一般性的代码

function getPhoneFactory(name) {
    if (name === 'apply') {
        console.log('apply factory');
    } else if (name === 'huawei') {
        console.log('huawei factory');
    } else if (name === 'vivo') {
        console.log('vivo factory');
    }
}

// 使用策略模式后的代码
const phoneFactory = {
    apply() {
        console.log('apply factory');
    },
    huawei() {
        console.log('huawei factory');
    },
    vivoo() {
        console.log('vivo factory');
    }
}

function phone() {
    this.func = () => {};
    this.add = function(func) {
        this.func = func;
    }
    this.start = function() {
        this.func();
    }
}

const a = new phone();
a.add(phoneFactoty.apply);
a.start();

```

这样子就能够将一个面向过程的代码改为面向对象，但是同时也增加了很多额外的负担

- 需要更多的内存去存储对应的变量以及方法
- 不同的代码之间，可能会生成更多的策略类以及方法类

> 实际用例

当对form进行校验的时候如果使用策略模式，会让代码变得更加简洁易懂

``` javascript

// 校验规则
const rules = {
    maxLength(value, length, errmsg) {
        if (value.length > length) {
            return errmsg
        }
    },
    minLength(value, length, errmsg) {
        if (value.length < length) {
            return errmsg
        }
    },
    isPhone(value, errmsg) {
        if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
            return errmsg
        }
    }
}
// 校验类
class FormValid{
    constructor() {
        // 缓存的校验规则
        this.rules = [];
        // 校验数据
        this.data = {};
    }
    setRule(key, name, errmsg) {
        if (!key || !name || !errmsg) {
            console.error('方法参数不正常');
            return ;
        }
        // 通过对校验方法进行封装，添加数据
        this.rules.push(function(value) {
            const nameArr = name.split(':');
            const paramsArr = [];
            paramsArr.push(this.data[key]);
            !!nameArr[1] && paramsArr.push(nameArr[1]);
            paramsArr.push(errmsg);
            return rules[nameArr[0]].apply(this, paramsArr);
        });
    }
    setData(data) {
        this.data = data;
    }
    valid() {
        if (Object.keys(this.data).length === 0) {
            console.error('当前校验器中没有数据');
            return ;
        }
        // 校验
        let errmsg = [];
        this.rules.map(func => {
            const currentErrmsg = func.call(this);
            !!currentErrmsg && errmsg.push(currentErrmsg);
        });

        return {
            isValid: errmsg.length === 0,
            errmsg
        }

    }
}

function getValid() {
    const validator = new FormValid();
    validator.setRule('a', 'maxLength:6', 'a最大长度为6');
    validator.setRule('b', 'minLength:2', 'b最小长度为2');
    validator.setRule('c', 'isPhone', 'c不是手机类型');
    validator.setData({
        a: '123123123',
        b: '1',
        c: '11702834617'
    })
    console.log(validator.valid());
}

getValid();

```


### 代理模式