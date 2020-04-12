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

代理模式是一种通过第三方对象去调用目标对象的实现方法，为每个类提供单一的职能，安全管理，数据筛选，缓存处理等等

``` javascript

function add() {
    const arr = Array.from(arguments);
    let num = 0;
    arr.map(item => num += item);
    console.log(num);
    return num;
}

class proxyCache {
    constructor(func) {
        this.func = func;
        this.cache = {};
    }

    done() {
        const arr = Array.from(arguments);
        const name = arr.toString();
        if (this.cache[name]) {
            return this.cache[name]
        }
        this.cache[name] = this.func.apply(this, arr);
        return this.cache[name];
    }

}

const addCache = new proxyCache(add);

addCache.done(1,2,3,4,5);
addCache.done(1,2,3,4,5);    // 第二次运算直接从缓存中取出

```

上次的`proxyCache类`通过代理了add方法，使add方法方法添加了缓存的效果, 需要换一种方法的话，只需要重新new一个`proxyCache类`出来，所以实际上proxyCache是一个工厂模式生成的类，只提供缓存能力

### 命令模式

命令模式指的是通过指令的方式将操作与界面结合，例如，点击一个按钮，只是发送了一个指令，但是却不知道这个指令具体做了什么事情，也不是这个按钮要关心的内容，将UI或者说方法与方法之间变成松耦合

``` javascript


function test() {
    console.log('test execute');
}

const command = {
    execute() {
        test();
    }
}

const btn = document.getElementById('btn');

btn.addEventListener('click', command.execute);

```

以上就是实现了最简单的一种UI跟实现分离，就是UI你自己做完UI调用一下`command.execute`，而实现方法的人不需要知道在UI层是否是调用了这个方法，具体的调用就存在于`command.execute`中，这就是实现了多人合作的一个人画界面一个人写方法，不需要沟通相互实现对方的内容即可，但是也会有问题，明明是一个函数能够解决这么简单的事情，却非要加一个`command类`出来，多麻烦，是的，相对这种简单的案例来说，确实没有直接调用来的简洁明了，但是一旦中间添加了些操作那么就是这么简单了，比如如果一个按钮操作完内容，需要撤回，或者需要撤回到好几步之前的操作，使用命令模式就能很好的解决问题

``` javascript

const btn = document.getElementById('btn');
const restart = document.getElementById('restart');
const revoke = document.getElementById('revoke');
const input = document.getElementById('input');

const testCommand = {
    execute(value) {
        console.log(`${value} execute`);
    }
}

class Command{
    constructor() {
        this.cache = [];
    }
    execute(value) {
        testCommand.execute(value);
        this.cache.push(testCommand.execute.bind(this, value));
    }
    reStart() {
        this.cache.map(func => func());
    }
    revoke() {
        this.cache.pop();
        this.reStart();
    }
}

const command = new Command();

btn.addEventListener('click', () => command.execute(input.value));
restart.addEventListener('click', () => command.reStart());
revoke.addEventListener('click', () => command.revoke());

```

### 组合模式

组合模式是一种针对普通命令你模式的整合形态，他可以支持一次性直接多个命令，同时在组合模式中他还可以支持自己的组合里面也存在组合，即就是基本的树形结构，父叶子下面的可以是子叶子也可以还是父叶子

``` javascript

function getIndent(length) {
    let str = '';
    for(let i = 0; i < length; i++) {
        str += '  ';
    }
    return str;
}

class parentNode {
    constructor(name) {
        this.name = name;
        this.parent = null;
        this.child = [];
    }
    add(node) {
        node.setParent(this);
        this.child.push(node);
        return this;
    }
    setParent(parent) {
        this.parent = parent;
    }
    scan(length = 0) {
        console.log(`${getIndent(length)}正在扫描父节点：${this.name}`);
        this.child.map(node => 
            !!node.child ? 
            node.scan(length + 2) : 
            console.log(`${getIndent(length + 2)}正在输出子节点:${node.name}`)
        );
        console.log(`${getIndent(length)}当前父节点扫描结束`);
    }
}

class childNode {
    constructor(name) {
        this.name = name;
        this.parent = null;
    }
    add() {
        throw new Error('子节点不能够添加节点');
    }
    setParent(parent) {
        this.parent = parent;
    }
    scan() {
        console.log(`正在打印当前节点：${this.name}`);
    }
}

const parent = new parentNode('parent1');
const parent1 = new parentNode('parent2');
const child = new childNode('child');
const child1 = new childNode('child1');
const child2 = new childNode('child2');

parent.add(parent1).add(child).add(child1);
parent1.add(child2);

parent.scan();

```

![结果](../public/image/7.png)

这样就实现了一种简单的组合模式的运用，实际上就是组合生成一个树形的数据结构，但是能够拥有更好的扩展空间，并且能够保证子节点跟父节点的方法相同，让调用的时候不用在意或者区分父节点跟子节点的差别，但是仔细看一下，发现他实际上对于父节点和子节点的区分并不是很明显，他们有很多共同点在里面，那么应该还有一个种其他办法能够精简一下这里的代码

### 模板方法模式

模板方法模式就是提供这么一个方法，执行相同的步骤内容

继续看上面的代码，我们会发现，父节点跟子节点都拥有同样的方法，但是子节点里面有很多方法是不可使用的，接下来，我们来改造一下

``` javascript

function getIndent(length) {
    let str = '';
    for(let i = 0; i < length; i++) {
        str += '  ';
    }
    return str;
}

class Node {
    constructor(name) {
        this.name = name;
        this.parent = null;
        this.child = [];
    }
    add() {
        throw new Error('需要在子类中实现');
    }
    setParent() {
        throw new Error('需要在子类中实现');
    }
    preGetCurrentNodeInfo() {
        console.log('preGetCurrentNodeInfo钩子')
    }
    scan() {
        console.log(`${getIndent(length)}正在扫描父节点：${this.name}`);
        this.child.map(node => 
            !!node.child.length ? 
            node.scan(length + 2) : 
            console.log(`${getIndent(length + 2)}正在输出子节点:${node.name}`)
        );
        console.log(`${getIndent(length)}当前父节点扫描结束`);
    }
    getCurrentNodeInfo() {
        console.log(`
            当前节点名称： ${this.name}
            当前节点是否有子节点： ${!!this.child.length}
            当前节点的子节点数量： ${this.child.length}
            当前节点的父节点名称： ${!!this.parent && this.parent.name}
        `)
    }
    start() {
        this.scan();
        console.log('------------------');
        this.preGetCurrentNodeInfo();
        this.getCurrentNodeInfo();
    }
}

class parentNode extends Node {
    constructor(name) {
        super(name);
    }
    add(node) {
        node.setParent(this);
        this.child.push(node);
        return this;
    }
    setParent(parent) {
        this.parent = parent;
    }
}

class childNode extends Node {
    constructor(name) {
        super(name);
    }
    setParent(parent) {
        this.parent = parent;
    }
}

const parent = new parentNode('parent1');
const parent1 = new parentNode('parent2');
const child = new childNode('child');
const child1 = new childNode('child1');
const child2 = new childNode('child2');

parent.add(parent1).add(child).add(child1);
parent1.add(child2);

parent.start();
child.start();

```

我们重新定义了一个类，他拥有子节点跟父节点相同的方法内容，并且拥有一个固定的方法执行方式，打印了当前所有的节点以及当前节点的所有信息

这个时候，我们可能会在打印当前节点信息之前会处理一些其他事情呢，所以会提供一个钩子函数，他在虚拟类里面不实现，也不报错，但是子类中实现之后就会去调用，模板方法模式必须是要通过继承来实现的设计模式，因为他会将一个通用的流程步骤封装在父类里面，子类实现对应的方法来完成子类的构造
