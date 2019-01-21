## vue day02

### 指令

#### v-model

Vue提供的双向数据绑定的指令, 在Vue中也只有唯一这一个属性可以提供双向数据绑定

```
<!-- v-bind只能实现单向绑定 -->
<!-- <input :aaa="msg" :value="msg" type="text"> -->

<!-- 为什么v-model不需要手动指定要绑定的属性呢??? -->
<!-- 由于用户与input交互时, 修改的都是value属性的值, 所以v-model只能绑定value属性 -->
<!-- v-model 除了可以从M层绑定到V层, 还可以在用户修改value属性时 自动同步回M层 -->
<input v-model="msg" type="text">
```

#### v-for

在Vue中可以迭代的类型有:

```
数组

对象

数字
```

1. 迭代数组

   数组中有多少个元素, 就会循环创建多少个p

   item表示数组中的每一项

   ```
    <p v-for="item in list">{{ item }}</p>
   ```

   index表示数组中的每一项对应的索引

   ```
    <p v-for="(item, index) in list">{{ item }}</p>
   ```

2. 迭代对象

   对象中有多少个属性, 就会循环创建多少个p

   ```
    <p v-for="(value, key) in obj">{{ key }} --- {{ value }}</p>
   ```

3. 迭代数字

   迭代的数字有多大, 就会循环创建多少个p

   **注意: v-for迭代数字时, num从1开始, 到10结束**

   ```
    <p v-for="num in 10">{{ num }}</p>
   ```

注意事项: v-for中的key属性, 在v-for循环渲染列表后, 如果每个单项中都有状态类型的表单元素, 例如: checkbox, 此时数据顺序发生变化后, 默认不会记录每个单项的状态, 会导致checkbox勾选状态出现混乱

#### v-for的原理

> 当 Vue.js 用 `v-for` 正在更新已渲染过的元素列表时，它默认用“就地复用”策略。

key的作用就是将当前的数据与当前对应的DOM元素进行绑定, 以后如果数据顺序发生变化, Vue会在内部重新排序 然后渲染

如果实在无法理解原理, 那就记住 以后只要用v-for, 都使用 `:key`, 给key绑定一个唯一标识, 可以是 `number/string`

#### v-if和v-show

v-if和v-show都是用于控制元素的显示隐藏的

区别在于: v-if有较高的切换性能消耗, v-show有较高的初始渲染消耗

因为, v-if如果表达式是false, 元素压根不会创建, 而v-show如果表达式结果是false, 元素也会创建只是把display设为了none

```
<h3 v-if="flag">这是用v-if控制的元素</h3>
<h3 v-show="flag">这是用v-show控制的元素</h3>
```

### 样式操作

以前在DOM阶段操作样式的两种方法:

```
dom.style.backgroundColor // 行内样式

dom.className // 设置类样式名, 结合css选择器完成
```

在Vue中同样也是两种方法操作样式:

#### 在Vue中动态绑定类样式

不用属性绑定, 设置固定的类样式

```
<p class="red active"></p>
```

如果需要动态修改类样式, 则需要使用属性绑定

属性绑定类样式可以为数组或对象

1. 绑定数组

   现在虽然是使用属性绑定了, 但是依然是写死了, 没有实现的动态的切换

   ```
    <p :class="['red', 'active']"></p>
   ```

   动态切换有两种方式, 可以使用三元表达式来决定是否要动态添加数组元素

   ```
    <p :class="['red', flag ? 'active' : '']"></p>
   ```

   推荐以下方法:

   ```
    <p :class="['red', { active: flag }]"></p>
   ```

2. 绑定对象

   当flag1为true时应用red类样式, 否则不应用

   当flag2位true时应用active类样式, 否则不应用

   ```
    <p :class="{ red: flag1, active: flag2 }"></p>
   ```

**总结: 当类样式较多, 而需要动态切换的类名只有一个时, 推荐使用绑定数组的方式来实现动态切换, 反之, 当类样式较少, 而都需要动态切换类名时, 使用对象较为方便**

#### 操作行内样式

给 `style` 属性进行 v-bind 绑定

```
<p :style="{ 'background-color': 'pink', color: 'black' }"></p>
```

通过绑定数组, 可以同时绑定多个样式对象

```
<p :style="[ 样式对象1, 样式对象2 ]"></p>
```

### 过滤器

过滤器的基本使用方法:

1. 先定义好全局过滤器

   ```
    // 定义全局过滤器
    // 参数1: 过滤器名称
    // 参数2: 回调函数
    //   回调函数中第一个参数是管道符左边的数据, 第二个参数起都是过滤器调用时传入的参数
    Vue.filter('msgFilter', function(data, str) {
      return data.replace('Helloworld', str)
    })
   ```

2. 在插值表达式或v-bind中使用, v-text等其他指令中无法使用

   ```
    <p>{{ msg | msgFilter('你好世界') }}</p>
   
    <input type="text" :value="msg | msgFilter('你好世界')">
   ```

注意: 过滤器可以串联使用, 例如

```
<p>{{ msg | msgFilter('你好世界') | test }}</p>
```
### 私有过滤器

不同于全局过滤器, 私有过滤器只能在当前vm实例内部使用, 定义方式也是在当前vm实例的配置对象中加入一个filters的节点, 与methods和data等节点同级:

```
filters: {
    // 方法名就是过滤器名 
    // 方法就是过滤器
    // 就近原则 如果当前vm实例的私有过滤器和全局过滤器同名了 就会优先使用私有过滤器
    msgFormat() {
      
    }
  }
```

### 按键修饰符

当用户输入完数据后, 每次都需要点击添加按钮才可以将数据录入表中, 用户体验不佳, 最好能够当用户输入完数据后, 直接按回车立即录入表中

Vue提供了按键修饰符来解决这个问题:

```
<input @keyup.enter="add" type="text" class="form-control" v-model="name">
```

`@keyup.enter` 的意思是给input绑定键盘抬起事件, 并且只有在`回车键`抬起时才会触发

也就是当用户抬起回车时就会调用add方法 进行添加的逻辑操作

所有**键盘事件**都有按键修饰符, 本质上其实是点的keyCode, 只不过Vue为了方便大家记忆, 内置了一些别名:

```
.enter
.tab
.delete (捕获“删除”和“退格”键)
.esc
.space
.up
.down
.left
.right
```

如果需要自定义别名, 可以使用全局的`config.keyCodes`对象来添加:

```
// 可以使用 `v-on:keyup.f1`
Vue.config.keyCodes.f1 = 112
```

### 自定义指令 (了解内容)

在Vue内部提供了很多内置指令: v-text, v-html, v-if, v-show, v-model ... 等等, 一切以v-开头的都是指令

除了内部提供的这些指令外, 开发者还可以自定义指令

因为Vue的作者考虑到, 有些情况还是需要操作DOM元素的, 通过指令可以对一些DOM元素操作进行封装

1. 定义全局指令

   ```
    // 定义全局指令
    // 参数1: 指令名称, 不需要 v-
    // 参数2: 对象, 对象中有可以有5个函数 bind, inserted, update, componentUpdated, unbind
    //     5个函数就是所谓的钩子函数, 就是当指令应用到标签身上整个过程, 每个阶段所调用的函数
    Vue.directive('focus', {
      // 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
      bind(el) {
        // console.log(el)
        // console.log('我被绑定了')
        // el.focus()
      },
      // 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
      inserted(el) {
        console.log(el)
        // console.log('我insert到父节点了')
        el.focus()
      },
      // 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前
      update() {}
    })
   ```

2. 使用指令

   ```
    <input v-focus type="text" class="form-control" v-model="keywords">
   ```

**注意: 定义指令时不需要加 v- 使用指令时必须要加 v-**

### 定义私有指令

同私有过滤器, 在vm配置对象中, 和methods以及data同级的位置, 加入一个`directives`的属性:

```
directives: {
	focus: {
	  bind() {
	
	  },
	  inserted() {
	    
	  }
	}
}
```

### 生命周期函数

生命周期函数是指, Vue实例创建的过程中, 从出生到死亡每个阶段所执行的函数

一共有8个:

```
beforeCreate: 实例完全创建之前, 此时data和methods等数据都没有初始化, 不能使用

created: 实例已经创建完毕了, 此时data和methods等数据都可以使用了, 实例对象也可以访问

beforeMount: 模板在内存中编译完成了, 但是还未渲染到页面上

mounted: 编译好的模板完全渲染到页面, 用户最终看到的样子, 此时DOM元素也是最新的, 如果想操作DOM元素, 最好在这个生命周期函数中进行

beforeUpdate: 当data中数据改变时会触发, 此时页面上的数据并没有重新渲染, 只是data中的数据更新了

updated: 当data中数据改变后, 并将页面上的数据也更新完成后会触发, 此时data中的数据和页面上的数据是同步的

beforeDestroy: 当实例进入销毁阶段时执行的钩子函数, 此时Vue实例中的data/methods/filters/directives等都还可以使用

destroyed: 实例上的所有成员已经完全销毁, 无法使用了
```

### 域名更新

课程中所有接口的域名都替换为: `vue.lovegf.cn:8899`