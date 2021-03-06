## prototype

原型链，在js中是一个很常见的也是一个很常用的方法，用于继承
但是在js中这个也是一个比较晦涩难懂的，因为他实际上会是比较饶的一个原理

### prototype，\_proto\_，constructor三者的关系

> prototype

是一个指针，指向的是原型的constructor方法

> proto

是一个实例对象的属性，指向该实例的原型

> constructor

是一个原型的构造函数，含有prototype

由上可知，prototyp指向的是一个原型的constructor方法，二constructor方法中含有prototype，那么这就是一个无限的死循环

``` javascript

// 原型
function superType() {
    this.super = '123'
}

// 输出的是一个对象，内部含有原型的constructor方法
// {constructor: f}
console.log(superType.prototype)
// 指回原型方法
console.log(superType.prototype.constructor)
// {constructor: f} 指回构造函数
console.log(superType.prototype.constructor.prototype)

const test = new superType();

// prototype 只存在于原型对象上，不存在实例对象上面，
// 所以不能够直接使用prototype访问，只能通过_proto_访问到原型的prototype
console.log(test._proto_);

```

代码可能看的会有点饶，看图可能会更加清晰一些

![prototype流程图](../public/image/3.png)

### 继承

原型链的继承其实相对而言很简单，只需要将要继承的原型的prototype指向继承的实例即可

``` javascript

// 原型链继承
// 方法1
function superFunc() {
    this.test = '123';
}
// 方法1上的prototype添加getValue方法
superFunc.prototype.getValue = function () {
    return this.test;
}
// 方法2
function subFunc() {
    this.subTest = '555';
}
// 实例化方法1
const superType = new superFunc();
// 将方法2的prototype指向方法1的实例
subFunc.prototype = superType;
// 实例化方法2
const interface = new subFunc();
// 方法2继承了方法1的内容
console.log(interface.getValue());  // 123
console.log(interface.subTest);     // 555

```

> 经典继承

经典继承使用起来非常方便，直接调用父类的构造函数，并传入this改变原父类的指向，将父类上的属性写入到子类中

缺点：
    1. 无法继承父类的prototype
    2. 方法都在构造函数中定义，无法复用
    3. 无法通过instanceof来判断是否是继承了父类

``` javascript

function father() {
    this.a = '123';
}

function child() {
    father.call(this);
}

const a = new child();

console.log(a.a) // '123'

```

> 组合继承

组合继承是将原型链继承与经典继承组合在一起来使用，既能够继承了父类的属性也能继承了父类的prototype的内容

缺点：
    1. 写法略过复杂
    2. 父类的构造函数被调用两次

``` javascript

function father() {
    this.test = '111';
}

father.prototype.getTest = function() {
    console.log(this.test);
}

function child() {
    father.call(this);
}

child.prototype = new father();

const a = new child();

console.log(a.test);    // '111'
console.log(a.getTest())// '111'

```

> 寄生式继承

通过构造函数返回出一个对象实例，能够实现内部封装

缺点：
    1. 无法继承原型链
    2. 内部方法都挂载咋实例上，无法被继续继承

``` javascript

function father(o) {
    const child = Object.create(o);
    child.getTest = function() {
        console.log(this.test);
    }

    return child;
}

const a = father({test: '123'});

a.getTest()     // '123'

```

> 寄生组合式继承

实际上是基于组合式继承的方法进行了更深层次的优化，因为组合式继承无论如何都会调用两次父类的构造函数，寄生组合式继承完美的解决了这个问题

``` javascript

function extend(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass._proto_ = superClass;
}

function father() {
    this.a = '123';
}

function child() {
    father.call(this);
    this.get = () => {
        console.log(this.a);
    }
}

extend(child, father);

const a = new child();

console.log(a.a) // '123'
console.log(a.get) // '123'


```

### new

看完寄生组合继承的实例以后，不得不解释一下，这里在extend中没有使用new但是却照样能够继承原型链，那么new具体做了什么事情

``` javascript

var obj = {};
obj.__proto__ = F.prototype;
F.call(obj);

```

实际上，new做的事情非常的简单，甚至说很浅显易见

1. 建立一个新的object对象
2. 将obj的__proto__指向了传入的方法的prototype
3. 调用了方法，修改了this指向获得一个新的object

### 总结

1. Object是所有的对象的终结点，就是所有的对象的爸爸，根据原型链查询最后都会走到Object的方法上
2. 实例化后的对象是不能获取prototype属性的只能通过__proto__
3. 每个__proto__属性指向的是原型的prototype
4. 继承其实就是对原型链进行操作，能够让当前的类通过原型链不断往上找到对应的值
