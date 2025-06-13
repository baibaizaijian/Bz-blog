## 1.js基本数据类型有哪些及它们的区别

JavaScript共有八种数据类型，分别是 Undefined、Null、Boolean、Number、String、Object、Symbol、BigInt。

一、数据类型分类：

JavaScript 中的数据类型分为两大类：

1. **基本数据类型（Primitive Types，共 7 种）**

| 类型        | 说明                                    | 示例                               |
| ----------- | --------------------------------------- | ---------------------------------- |
| `Number`    | 数值类型（整数、浮点数、NaN、Infinity） | `123`, `3.14`, `NaN`               |
| `String`    | 字符串                                  | `"hello"`, `'world'`               |
| `Boolean`   | 布尔值                                  | `true`, `false`                    |
| `Undefined` | 未定义，变量声明了但未赋值              | `let a; // undefined`              |
| `Null`      | 空值，表示"无"                          | `let b = null`                     |
| `Symbol`    | 唯一值，ES6 引入                        | `Symbol('desc')`                   |
| `BigInt`    | 大整数，ES11 引入                       | `123n`, `BigInt(9007199254740991)` |

2. **引用数据类型（Reference Types）**

| 类型                              | 说明                                         | 示例                        |
| --------------------------------- | -------------------------------------------- | --------------------------- |
| `Object`                          | 所有对象类型（数组、函数、普通对象、正则等） | `{}`, `[]`, `function() {}` |
| `Array`                           | 数组，本质上是对象                           | `[1, 2, 3]`                 |
| `Function`                        | 函数，本质上也是对象                         | `function fn() {}`          |
| `Date`、`RegExp`、`Map`、`Set` 等 | 各类内置对象                                 | `new Date()`, `new Map()`   |

------

二、它们的区别：

| 比较项       | 基本类型                               | 引用类型                                                     |
| ------------ | -------------------------------------- | ------------------------------------------------------------ |
| **存储位置** | 栈内存（Stack）                        | 堆内存（Heap）                                               |
| **存储内容** | 值本身                                 | 地址（引用）                                                 |
| **赋值方式** | 值拷贝                                 | 引用拷贝                                                     |
| **可变性**   | 不可变（例如：字符串内容无法原地修改） | 可变（可以修改属性、值等）                                   |
| **类型检测** | `typeof`                               | `typeof` 对对象统一返回 `"object"`，可以结合 `Array.isArray()`、`instanceof` 判断更具体类型 |
| **比较方式** | `===` 比较值                           | `===` 比较引用地址                                           |

## 2.数据类型检测的方式有哪些？

1. `typeof`

用于判断 **基本数据类型**，返回一个字符串。

```js
typeof 123        // 'number'
typeof 'hello'    // 'string'
typeof true       // 'boolean'
typeof undefined  // 'undefined'
typeof null       // 'object'（这是历史遗留 bug）
typeof Symbol()   // 'symbol'
typeof 123n       // 'bigint'

typeof {}         // 'object'
typeof []         // 'object'
typeof function(){} // 'function'
```

其中数组、对象、null都会被判断为object，其他判断都正确。

**2.instanceof**

`instanceof`可以正确判断对象的类型，**其内部运行机制是判断在其原型链中能否找到该类型的原型**。

```javascript
console.log(2 instanceof Number);                    // false
console.log(true instanceof Boolean);                // false 
console.log('str' instanceof String);                // false 
 
console.log([] instanceof Array);                    // true
console.log(function(){} instanceof Function);       // true
console.log({} instanceof Object);                   // true
```

可以看到，`instanceof`**只能正确判断引用数据类型**，而不能判断基本数据类型。`instanceof` 运算符可以用来测试一个对象在其原型链中是否存在一个构造函数的 `prototype` 属性。

3. `Object.prototype.toString.call(value)`

最准确、通用的方法，会返回如 `[object Type]` 的格式。

```
js复制编辑Object.prototype.toString.call(null)        // "[object Null]"
Object.prototype.toString.call([])          // "[object Array]"
Object.prototype.toString.call({})          // "[object Object]"
Object.prototype.toString.call(() => {})    // "[object Function]"
Object.prototype.toString.call(123)         // "[object Number]"
Object.prototype.toString.call(undefined)   // "[object Undefined]"
Object.prototype.toString.call(Symbol())    // "[object Symbol]"
```

**优点**：可以准确区分所有类型（包括 `null`、`array` 等）
**缺点**：写法稍长，需要封装成工具函数

封装一个万能判断类型的小函数：

```js
function getType(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}

getType([]);       // "Array"
getType(null);     // "Null"
getType(123);      // "Number"
```

## 3.数组的常用方法有哪些？

JavaScript 中数组的常用方法可以分为以下几类：

---

**一、增删改查（原数组会被改变）**

| 方法                                   | 作用               | 示例                         |
| -------------------------------------- | ------------------ | ---------------------------- |
| `push()`                               | 向数组尾部添加元素 | `arr.push(4)`                |
| `pop()`                                | 删除最后一个元素   | `arr.pop()`                  |
| `unshift()`                            | 向数组头部添加元素 | `arr.unshift(0)`             |
| `shift()`                              | 删除第一个元素     | `arr.shift()`                |
| `splice(start, deleteCount, ...items)` | 删除/插入/替换元素 | `arr.splice(1, 2, 'a', 'b')` |

---

**二、不改变原数组的方法（返回新数组）**

| 方法                | 作用                 | 示例                                 |
| ------------------- | -------------------- | ------------------------------------ |
| `slice(start, end)` | 截取数组一部分       | `arr.slice(1, 3)`                    |
| `concat()`          | 合并数组或值         | `arr.concat([4, 5])`                 |
| `map()`             | 遍历数组并返回新数组 | `arr.map(x => x * 2)`                |
| `filter()`          | 过滤符合条件的元素   | `arr.filter(x => x > 2)`             |
| `reduce()`          | 累加器方法，汇总数据 | `arr.reduce((sum, x) => sum + x, 0)` |

---

三、查找相关

| 方法            | 作用                       | 示例                        |
| --------------- | -------------------------- | --------------------------- |
| `includes()`    | 是否包含某值               | `arr.includes(3)`           |
| `indexOf()`     | 查找某值第一次出现的位置   | `arr.indexOf(2)`            |
| `lastIndexOf()` | 查找某值最后一次出现的位置 | `arr.lastIndexOf(2)`        |
| `find()`        | 找到第一个符合条件的值     | `arr.find(x => x > 2)`      |
| `findIndex()`   | 找到第一个符合条件的索引   | `arr.findIndex(x => x > 2)` |

---

四、排序与反转

| 方法        | 作用                 | 示例                        |
| ----------- | -------------------- | --------------------------- |
| `sort()`    | 排序（可传比较函数） | `arr.sort((a, b) => a - b)` |
| `reverse()` | 反转数组顺序         | `arr.reverse()`             |

---

五、遍历类

| 方法        | 作用                         | 示例                               |
| ----------- | ---------------------------- | ---------------------------------- |
| `forEach()` | 遍历数组                     | `arr.forEach(x => console.log(x))` |
| `every()`   | 是否**所有**元素满足条件     | `arr.every(x => x > 0)`            |
| `some()`    | 是否**至少一个**元素满足条件 | `arr.some(x => x > 3)`             |

---

六、转换与构造

| 方法              | 作用                    | 示例                                   |
| ----------------- | ----------------------- | -------------------------------------- |
| `join()`          | 转成字符串              | `arr.join('-')`                        |
| `toString()`      | 转成逗号分隔的字符串    | `arr.toString()`                       |
| `Array.isArray()` | 判断是否为数组          | `Array.isArray(arr)`                   |
| `Array.from()`    | 类数组/可迭代对象转数组 | `Array.from('abc') // ['a', 'b', 'c']` |
| `Array.of()`      | 用参数创建新数组        | `Array.of(1, 2, 3)`                    |



- `splice()` 会修改原数组，常用于插入或删除。
- `map()`、`filter()`、`reduce()` 是函数式编程中的核心方法。
- `sort()` 默认按字符串排序，需要传比较函数来按数字排序。

---

## 4.对象的常用方法有哪些？



JavaScript 中对象的常用方法主要分为以下几类：

---

**一、对象属性操作**

| 方法                                          | 说明               | 示例                            |
| --------------------------------------------- | ------------------ | ------------------------------- |
| `Object.assign(target, ...sources)`           | 合并对象（浅拷贝） | `Object.assign({}, obj1, obj2)` |
| `Object.defineProperty(obj, key, descriptor)` | 定义/修改属性      | 自定义 getter/setter 等         |
| `Object.defineProperties(obj, descriptors)`   | 定义多个属性       | 批量定义属性特性                |

---

**二、对象信息获取**

| 方法                                    | 说明                               | 示例                                    |
| --------------------------------------- | ---------------------------------- | --------------------------------------- |
| `Object.keys(obj)`                      | 获取可枚举属性名数组               | `Object.keys({a:1, b:2}) // ['a', 'b']` |
| `Object.values(obj)`                    | 获取属性值数组                     | `Object.values({a:1, b:2}) // [1, 2]`   |
| `Object.entries(obj)`                   | 获取键值对数组                     | `Object.entries({a:1}) // [['a',1]]`    |
| `Object.getOwnPropertyNames(obj)`       | 获取所有自身属性名（包括不可枚举） | 包括 `configurable: false` 的属性       |
| `Object.getOwnPropertyDescriptors(obj)` | 获取所有属性的详细描述对象         | 用于深拷贝时保留属性描述符              |

---

**三、原型操作相关**

| 方法                                | 说明                   | 示例                                 |
| ----------------------------------- | ---------------------- | ------------------------------------ |
| `Object.create(proto)`              | 使用指定原型创建新对象 | `Object.create(null)` 创建无原型对象 |
| `Object.getPrototypeOf(obj)`        | 获取原型对象           | `Object.getPrototypeOf(obj)`         |
| `Object.setPrototypeOf(obj, proto)` | 设置原型对象           | `Object.setPrototypeOf(obj, {})`     |

---

**四、属性判断相关**

| 方法                      | 说明                           | 示例                      |
| ------------------------- | ------------------------------ | ------------------------- |
| `obj.hasOwnProperty(key)` | 判断是否为自身属性             | `obj.hasOwnProperty('a')` |
| `key in obj`              | 判断属性是否存在（自身或原型） | `'toString' in obj`       |
| `Object.hasOwn(obj, key)` | ES2022 新增，判断自身属性      | 更安全，推荐使用          |

---

**五、对象冻结与扩展控制**

| 方法                            | 说明                        | 示例                       |
| ------------------------------- | --------------------------- | -------------------------- |
| `Object.freeze(obj)`            | 冻结对象，不能增删改        | `Object.freeze(obj)`       |
| `Object.seal(obj)`              | 密封对象，不能添加/删除属性 | 可修改已有属性值           |
| `Object.preventExtensions(obj)` | 禁止添加新属性              | 可删除/修改已有属性        |
| `Object.isFrozen(obj)`          | 判断对象是否冻结            | `Object.isFrozen(obj)`     |
| `Object.isSealed(obj)`          | 判断是否密封                | `Object.isSealed(obj)`     |
| `Object.isExtensible(obj)`      | 是否可扩展                  | `Object.isExtensible(obj)` |

---

**六、比较与判断**

| 方法              | 说明                                      | 示例                          |
| ----------------- | ----------------------------------------- | ----------------------------- |
| `Object.is(a, b)` | 类似 `===`，但能正确比较 `NaN` 和 `-0/+0` | `Object.is(NaN, NaN) // true` |

## 5.字符串的常用方法有哪些？

JavaScript 中字符串（String）的常用方法主要分为以下几类：

---

**一、查找与判断**

| 方法                | 说明                            | 示例                               |
| ------------------- | ------------------------------- | ---------------------------------- |
| `charAt(index)`     | 返回指定位置的字符              | `'abc'.charAt(1) // 'b'`           |
| `charCodeAt(index)` | 返回指定位置字符的 Unicode 编码 | `'A'.charCodeAt(0) // 65`          |
| `includes(sub)`     | 判断是否包含某子串              | `'abc'.includes('b') // true`      |
| `indexOf(sub)`      | 返回子串第一次出现的位置        | `'abcabc'.indexOf('b') // 1`       |
| `lastIndexOf(sub)`  | 返回子串最后一次出现的位置      | `'abcabc'.lastIndexOf('b') // 4`   |
| `startsWith(sub)`   | 判断是否以某字符串开头          | `'hello'.startsWith('he') // true` |
| `endsWith(sub)`     | 判断是否以某字符串结尾          | `'hello'.endsWith('lo') // true`   |

---

**二、提取与截取**

| 方法                    | 说明                                    | 示例                                |
| ----------------------- | --------------------------------------- | ----------------------------------- |
| `slice(start, end)`     | 截取字符串的一部分                      | `'abcdef'.slice(1, 4) // 'bcd'`     |
| `substring(start, end)` | 与 `slice` 类似，不能接收负数           | `'abcdef'.substring(1, 4) // 'bcd'` |
| `substr(start, length)` | 从 start 开始取 length 个字符（已废弃） | `'abcdef'.substr(1, 3) // 'bcd'`    |

---

**三、修改与拼接**

| 方法                        | 说明                     | 示例                                        |
| --------------------------- | ------------------------ | ------------------------------------------- |
| `concat()`                  | 拼接字符串               | `'hello'.concat(' world') // 'hello world'` |
| `repeat(n)`                 | 重复字符串 n 次          | `'ab'.repeat(3) // 'ababab'`                |
| `replace(regexp, newVal)`   | 替换字符串               | `'a-b'.replace('-', '_') // 'a_b'`          |
| `replaceAll(sub, newVal)`   | 替换所有匹配项（ES2021） | `'a-b-c'.replaceAll('-', '_') // 'a_b_c'`   |
| `toUpperCase()`             | 转为大写                 | `'abc'.toUpperCase() // 'ABC'`              |
| `toLowerCase()`             | 转为小写                 | `'ABC'.toLowerCase() // 'abc'`              |
| `trim()`                    | 去除首尾空格             | `'  abc  '.trim() // 'abc'`                 |
| `trimStart()` / `trimEnd()` | 去除开头或结尾空格       | `'  abc'.trimStart() // 'abc'`              |

---

**四、转换与拆分**

| 方法               | 说明               | 示例                                    |
| ------------------ | ------------------ | --------------------------------------- |
| `split(separator)` | 拆分字符串为数组   | `'a,b,c'.split(',') // ['a', 'b', 'c']` |
| `toString()`       | 转为字符串         | `123.toString() // '123'`               |
| `valueOf()`        | 获取字符串的原始值 | `'abc'.valueOf() // 'abc'`              |

---

🔧 示例代码

```js
const str = ' Hello, World! ';

// 查找与判断
str.includes('World');         // true
str.startsWith(' Hello');      // true
str.endsWith('! ');            // true

// 提取
str.slice(1, 6);               // 'Hello'

// 修改与转换
str.trim();                    // 'Hello, World!'
str.toUpperCase();             // ' HELLO, WORLD! '
str.replace('World', 'JS');    // ' Hello, JS! '

// 拆分
'1-2-3'.split('-');            // ['1', '2', '3']****
```



## 6.简述 `this`



一、什么是 `this`？

在 JavaScript 中，`this` 是一个关键字，**代表函数运行时的上下文对象**，即：函数被**调用时所在的对象**。

`this` 的指向并不是在函数定义时决定的，而是 **在函数执行时动态绑定的**。

---

二、`this` 的几种典型指向情况

| 场景               | 示例                                                  | `this` 指向                                        |
| ------------------ | ----------------------------------------------------- | -------------------------------------------------- |
| **全局环境**       | `console.log(this)`                                   | 浏览器中指向 `window`，Node 中指向 `global`        |
| **普通函数调用**   | `function fn() { console.log(this); } fn();`          | 非严格模式下指向全局对象，严格模式下为 `undefined` |
| **对象方法调用**   | `obj.fn()`                                            | 指向调用该方法的对象 `obj`                         |
| **构造函数调用**   | `new Fn()`                                            | 指向新创建的实例对象                               |
| **箭头函数**       | `() => { console.log(this); }`                        | 没有自己的 `this`，**继承外层作用域的 this**       |
| **事件处理函数中** | `element.onclick = function() { console.log(this); }` | 指向触发事件的 DOM 元素                            |
| **显式绑定**       | 使用 `call` / `apply` / `bind`                        | 指向第一个参数传入的对象                           |

---

三、示例代码

```js
const obj = {
  name: 'Alice',
  sayHi() {
    console.log(this.name); // this -> obj
  }
};
obj.sayHi(); // Alice

function normalFn() {
  console.log(this);
}
normalFn(); // 浏览器下为 window

const arrowFn = () => {
  console.log(this);
}
arrowFn(); // this 与定义时所在作用域一致
```

## 7.bind、call、apply 区别？如何实现一个bind?

一、作用

`call `、`apply `、`bind `作用是改变函数执行时的上下文，简而言之就是改变函数运行时的`this`指向

那么什么情况下需要改变`this`的指向呢？下面举个例子

```
const name="lucy";
const obj={
    name:"martin",
    say:function () {
        console.log(this.name);
    }
};
obj.say(); //martin，this指向obj对象
setTimeout(obj.say,0); //lucy，this指向window对象
```



从上面可以看到，正常情况`say`方法输出`martin`

但是我们把`say`放在`setTimeout`方法中，在定时器中是作为回调函数来执行的，因此回到主栈执行时是在全局执行上下文的环境中执行的，这时候`this`指向`window`，所以输出`luck`

我们实际需要的是`this`指向`obj`对象，这时候就需要该改变`this`指向了

```
setTimeout(obj.say.bind(obj),0); //martin，this指向obj对象
```



二、区别

下面再来看看`apply`、`call`、`bind`的使用

### **apply**

`apply`接受两个参数，第一个参数是`this`的指向，第二个参数是函数接受的参数，以数组的形式传入

改变`this`指向后原函数会立即执行，且此方法只是临时改变`this`指向一次

```
function fn(...args){
    console.log(this,args);
}
let obj = {
    myname:"张三"
}

fn.apply(obj,[1,2]); // this会变成传入的obj，传入的参数必须是一个数组；
fn(1,2) // this指向window
```



当第一个参数为`null`、`undefined`的时候，默认指向`window`(在浏览器中)

```
fn.apply(null,[1,2]); // this指向window
fn.apply(undefined,[1,2]); // this指向window
```



### **call**

`call`方法的第一个参数也是`this`的指向，后面传入的是一个参数列表

跟`apply`一样，改变`this`指向后原函数会立即执行，且此方法只是临时改变`this`指向一次

```
function fn(...args){
    console.log(this,args);
}
let obj = {
    myname:"张三"
}

fn.call(obj,1,2); // this会变成传入的obj，传入的参数必须是一个数组；
fn(1,2) // this指向window
```



同样的，当第一个参数为`null`、`undefined`的时候，默认指向`window`(在浏览器中)

```
fn.call(null,[1,2]); // this指向window
fn.call(undefined,[1,2]); // this指向window
```



### **bind**

bind方法和call很相似，第一参数也是`this`的指向，后面传入的也是一个参数列表(但是这个参数列表可以分多次传入)

改变`this`指向后不会立即执行，而是返回一个永久改变`this`指向的函数

```
function fn(...args){
    console.log(this,args);
}
let obj = {
    myname:"张三"
}

const bindFn = fn.bind(obj); // this 也会变成传入的obj ，bind不是立即执行需要执行一次
bindFn(1,2) // this指向obj
fn(1,2) // this指向window
```



从上面可以看到，`apply`、`call`、`bind`三者的区别在于：

- 三者都可以改变函数的`this`对象指向
- 三者第一个参数都是`this`要指向的对象，如果如果没有这个参数或参数为`undefined`或`null`，则默认指向全局`window`
- 三者都可以传参，但是`apply`是数组，而`call`是参数列表，且`apply`和`call`是一次性传入参数，而`bind`可以分为多次传入
- `bind `是返回绑定this之后的函数，`apply `、`call` 则是立即执行

### 实现`bind`

实现`bind`的步骤，我们可以分解成为三部分：

- 修改`this`指向
- 动态传递参数

```
// 方式一：只在bind中传递函数参数
fn.bind(obj,1,2)()

// 方式二：在bind中传递函数参数，也在返回函数中传递参数
fn.bind(obj,1)(2)
```



- 兼容`new`关键字

整体实现代码如下：

```js
Function.prototype.myBind = function (context) {
    // 判断调用对象是否为函数
    if (typeof this !== "function") {
        throw new TypeError("Error");
    }

    // 获取参数
    const args = [...arguments].slice(1),
          fn = this;

    return function Fn() {

        // 根据调用方式，传入不同绑定值
        return fn.apply(this instanceof Fn ? new fn(...arguments) : context, args.concat(...arguments)); 
    }
}
```

## 8.说说你对闭包的理解？闭包使用场景？

### 一、闭包的定义

**闭包是指：让你可以在一个内层函数中访问到其外层函数的作用域。**

简单来说：  
> **函数内部引用了函数外部的变量，并在函数外部仍然能访问这个函数，这就是闭包。**

在 `JavaScript `中，每当创建一个函数，闭包就会在函数创建的同时被创建出来，作为函数内部与外部连接起来的一座桥梁

下面给出一个简单的例子

```js
function init() {
    var name = "bzz"; // name 是一个被 init 创建的局部变量
    function displayName() { // displayName() 是内部函数，一个闭包
        alert(name); // 使用了父函数中声明的变量
    }
    displayName();
}
init();
```



`displayName()` 没有自己的局部变量。然而，由于闭包的特性，它可以访问到外部函数的变量

---

### 二、闭包的特性

- 闭包会**捕获其创建时的作用域链**。
- 被引用的外部变量不会被垃圾回收，直到闭包失效。
- 可以模拟私有变量。

---

### 三、闭包的经典示例

### 柯里化函数

柯里化的目的在于避免频繁调用具有相同参数函数的同时，又能够轻松的重用

```
// 假设我们有一个求长方形面积的函数
function getArea(width, height) {
    return width * height
}
// 如果我们碰到的长方形的宽老是10
const area1 = getArea(10, 20)
const area2 = getArea(10, 30)
const area3 = getArea(10, 40)

// 我们可以使用闭包柯里化这个计算面积的函数
function getArea(width) {
    return height => {
        return width * height
    }
}

const getTenWidthArea = getArea(10)
// 之后碰到宽度为10的长方形就可以这样计算面积
const area1 = getTenWidthArea(20)

// 而且如果遇到宽度偶尔变化也可以轻松复用
const getTwentyWidthArea = getArea(20)
```



### 使用闭包模拟私有方法

在`JavaScript`中，没有支持声明私有变量，但我们可以使用闭包来模拟私有方法

下面举个例子：

```js
var Counter = (function() {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function() {
      changeBy(1);
    },
    decrement: function() {
      changeBy(-1);
    },
    value: function() {
      return privateCounter;
    }
  }
})();

var Counter1 = makeCounter();
var Counter2 = makeCounter();
console.log(Counter1.value()); /* logs 0 */
Counter1.increment();
Counter1.increment();
console.log(Counter1.value()); /* logs 2 */
Counter1.decrement();
console.log(Counter1.value()); /* logs 1 */
console.log(Counter2.value()); /* logs 0 */
```



上述通过使用闭包来定义公共函数，并令其可以访问私有函数和变量，这种方式也叫模块方式

两个计数器 `Counter1` 和 `Counter2` 是维护它们各自的独立性的，每次调用其中一个计数器时，通过改变这个变量的值，会改变这个闭包的词法环境，不会影响另一个闭包中的变量

### 四、闭包的常见使用场景

| 场景                   | 示例                               |
| ---------------------- | ---------------------------------- |
| ✅ 封装私有变量         | 利用闭包模拟 `private` 成员        |
| ✅ 工厂函数             | 返回具有特定作用域的函数           |
| ✅ 柯里化函数           | 将多个参数的函数拆解执行           |
| ✅ 事件监听器           | 在回调中持久保存外部状态           |
| ✅ 异步逻辑中的数据保留 | `setTimeout`、`Promise` 等异步逻辑 |
| ✅ 防抖节流             | 保存定时器 ID、记录时间戳等        |

### 五、闭包的优缺点

✅ 优点：

- 能保存函数运行时的上下文；
- 可以封装数据，避免全局变量污染；
- 有助于构建高阶函数、函数式编程等模式。

⚠️ 缺点：

- 占用内存，容易导致**内存泄漏**；
- 滥用可能导致调试困难；
- 不易理解（容易写出 bug）。

# 9.执行上下文和执行栈是什么？

一、执行上下文（Execution Context）

执行上下文是 JavaScript 代码运行的环境。每当 JavaScript 代码在运行时，都是在某个执行上下文中运行的。

执行上下文的三种类型：

1. **全局执行上下文（Global Execution Context）**
   - 页面首次加载时创建。
   - 只有一个，浏览器中即 `window`。
   - 会创建一个全局对象（`window`），并将 `this` 指向它。

2. **函数执行上下文（Function Execution Context）**
   - 每次调用函数时都会创建一个新的上下文。
   - 作用域链、函数参数、局部变量都在其中。

3. **`eval` 执行上下文**
   - 执行在eval函数中的代码会有属于他自己的执行上下文不常用，也不推荐使用。

---

二、执行上下文的生命周期

1. **创建阶段（Creation Phase）**
   - 创建变量对象（Variable Object，VO）
   - 建立作用域链（Scope Chain）
   - 确定 `this` 的值

2. **执行阶段（Execution Phase）**
   - 执行代码，变量赋值、函数引用等实际操作

---

三、执行栈（Execution Stack）也叫调用栈（Call Stack）

执行栈是一种**后进先出（LIFO）**的数据结构，用来管理执行上下文。

- 当 JS 程序开始运行时，会创建全局执行上下文并压入执行栈。
- 每当一个函数被调用时，会创建该函数的执行上下文，并压入栈顶。
- 函数执行完毕后，其上下文会从栈顶移除（弹出）。
- 程序运行结束，栈清空。

---

四、执行栈示意图

```js
function a() {
  console.log('a');
  b();
}
function b() {
  console.log('b');
}
a();
```

五、总结

- **执行上下文**是代码运行的环境，包含变量、作用域链和 `this`。
- **执行栈**决定了代码的执行顺序，通过后进先出的机制管理上下文。