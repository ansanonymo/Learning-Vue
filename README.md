# Vue Essentials

Contains : 
- [Install vue basic template](#install-vue-basic-template)
- [Creating a Vue Application](#creating-a-vue-applicaiton)


## Install vue basic template

```sh
npm init vue@latest
```

<hr />

## Creating a Vue Applicaiton 

```javascript
import { createApp } from 'vue'

const app = createApp({
  /* root component options */
})

// setup error handler
app.config.errorHandler = (err) =>{

}


// setup global componet
app.component("ComponentNameToAccess",ComponentFromImport);

// mount applicaiton
app.mount("selector");
```

> 🟢 it possible to create multiple app instance in vue.

```javascript
const app1 = createApp({
  /* ... */
})
app1.mount('#container-1')

const app2 = createApp({
  /* ... */
})
app2.mount('#container-2')
```

<hr />

## template syntax

contains : 
- [Text Interpolation](#text-interpolation)
- [Raw HTML](#raw-html)
- [Directives](#directives)
- [Modifier](#modifier)
- [Attribute](#attribute-bindings)

### Text Interpolation
Here is the basic text interpolation :

```html
<span>Message: {{ variableFromStateOrAnyOtherExpression }}</span>
```

### Raw HTML

Use `v-html` to change raw html for vue. Here `v-html` is directive which is provide by **VueJS**. I create a branch for understanding all vue 15 directive.

```javascript
<div v-html="rawHtmlHere"></div>
```

### Directives
Directive are special attributes with the `v-` prefix. Vue provides a number of built in directive, including `v-html` and `v-bind`. I cover all directive in another brances.

##### [Click here to see all directive in vue official page.](https://vuejs.org/api/built-in-directives.html)

Syntax of directive : 

```html
<tagname v-directiveName:argument="value"></tagname>
```


Dynamic attribute name :
```html
<tagname v-bind:[attributeName]="value"></tagname>

<!-- shorthand -->
<tagname :[attributeName]="value"></tagname>
```

Dynamic event name :
```html
<tagname v-on:[eventName]="functionToDoSomething"></tagname>

<!-- shorthand -->
<tagname @[eventName]="functionToDoSomething"</tagname>
```

### Modifier

> 🟢 Modifiers are special postfixes denoted by a dot, which indicate that a directive should be bound in some special way. 

Here is example of vue js official documentation website :

```html
<form @submit.prevent="onSubmit">...</form>

<!--
    .prevent modifier tells the v-on directive
    to call event.preventDefault() on the
    triggered event.
-->
```


Here is simple img to understand the vue directive :
![Vue Directive](./asset/directive.69c37117.png)

### Attribute Bindings

Here is simple example of attribute binding : 

```html
<div v-bind:id="dynamicId"></div>

<!-- shorthand -->
<div :id="dynamicId"></div>

<!-- also support boolean attribute -->
<button :disabled="isButtonDisabled">Button</button>
```

Here dynamically binding multiple attribute : 
```javascript
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper'
}
```

```html
<!-- in this case use only v-bind -->
<div v-bind="objectOfAttrs"></div>
```

<hr />

## Reactivity Fundametals

contains : 
- [Declaring Reactive State](#declaring-reactive-state)
- [`<script setup>`](#script-setup)
- [Deep Reactivity](#deep-reactivity)
- [DOM Update timing](#dom-update-timing)
- [`reactive()`](#reactive)
- [Limitation of reactive()](#limitation-of-reactive)

### Declaring Reactive State

In Composition APi, to declare state syntax is here :
```javascript
import { ref } from 'vue';

const count = ref(0);

/**
 * here ref return object
 * {
 *  value : 0
 * }
 * 
 * ref shallowed the value into a object.
 * 
 */
```

To access refs in component object the use setup function which return ref variable and function. Here is example :

```javascript
import { ref } from 'vue'

export default {
  // `setup` is a special hook dedicated for the Composition API.
  setup() {
    const count = ref(0)

    function increment(event){
        count.value++;
    }
    // expose the ref to the template
    return {
      // usable state and function which can mutate refs
      count,
      increment
    }
  }
}
```


Exposed methods can then be event handlers :
```html
<button @click="increment">
    {{ count }}
</button>
```

### script setup

> 🟢 If need to avoid `setup()` function to setup state and method manually then used **Single-File Components (SFCs).** In that case use `<script setup>`


```html
<script setup>
import {ref} from 'vue';

const count = ref(0);

function increment(){
    count.value++;
}
</script>

<template>
    <button @click="increment">
        {{ coutn }}
    </button>
</template>
```

### Deep Reactivity
Refs can hold any value type in javascript and use it like state. It can detect object properties changes. Example : 

```javascript
import { ref } from "vue";

const obj = ref({
    nested : {count : 0},
    arr: ['foo', 'bar']
})

function mutatedDeeply(){
    // these will work as expected
    obj.value.nested.count++;
    obj.value.arr.push('baz');
}
```

### DOM Update timing

> 🟢 DOM update automatically when change reactive state.DOM updates are not applied synchronously.

In that case, Necessary to wait for the DOM update to complete after a state change, then use `nextTick()` global API:

```javascript
import {nextTick} from 'vue';

async function increment(){
    count.value++;
    await nextTick();
    // now the DOM is updated
}
```

### `reactive()`

> 🟢 `reactive()` is another api to declare reactive state. `reactive()` makes an object itself reactive.

Example : 
```html
<script>
    import { reactive } from 'vue';
    const state = reactive({count : 0});
</script>

<template>
    <button @click="state.count++">
        {{ state.count }}
    </button>
</template>
```

> 🔴 It is important to note that the returned value from `reactive()` is a Proxy of the original object. Which is not equal to the original object. Proxy mean the copy of object.


Example : 
```javascript
const raw = {}
const proxy = reactive(raw)

// proxy is NOT equal to the original.
console.log(proxy === raw) // false

// calling reactive() on the same object returns the same proxy
console.log(reactive(raw) === proxy) // true

// calling reactive() on a proxy returns itself
console.log(reactive(proxy) === proxy) // true

```


> 🔴 Nested objects inside a reactive object are also proxies.

Examples : 
```javascript
// calling reactive() on the same object returns the same proxy
console.log(reactive(raw) === proxy) // true

// calling reactive() on a proxy returns itself
console.log(reactive(proxy) === proxy) // true
```

### Limitation of reactive()
1. It only works for object types.
2. Cannot replace entire object.
3. Not destructure-friendly.

Example for 3 : 
```javascript
const state = reactive({ count: 0 });

// count is disconnected from state.count when destructured.
let { count } = state;
// does not affect original state
count++;

// the function receives a plain number and
// won't be able to track changes to state.count
// we have to pass the entire object in to retain reactivity
callSomeFunction(state.count);
```

<hr />

## Computed Properties

> 🟢 **Computed** properties is one kind of method or propertie which can return a result based on changing reactive data.

#### There are two way create computed properties : 
- Computed Api or Computed Section.
- Invoking a Method.

#### Computed API and Method Invoking a Method

**Declare computed propertie in composition :**
```html
<script setup>
  import { computed } from "vue";

  // create computed propertie
  const computedPropertieName = computed(()=>{
    // function which can return data
    // based on state(s).
    // if states change which are 
    // dependencies of this function
    // then it render again.
  })

  // create Invoking a Method 
  function computedFunction(){
    // function which can return data
    // based on state(s).
    // if any state change then
    // it render again.
  }
</script>

<template>
  <!-- using computed Propertie -->
  <tag>{{ computedPropertieName }}</tag>

  <!-- using computed function-->
  <tag>{{ computedFunction() }}</tag>
<template>
```

**Declare computed propertie in option :**
```html
<script>
  export default{
    data(){
      return {
        // state here
      }
    },

    setup(){
      {
        // return ref and reactive data
        // also return computed propertie and function
      }
    },

    methods : {
      computedFunctionName(){
        // function which can return data
        // based on state(s).
        // if any state change then
        // it render again.
      }
    },

    computed: {
      computedPropertieName(){
        // function which can return data
        // based on state(s).
        // if states change which are 
        // dependencies of this function
        // then it render again.
      }
    }
  }
</script>

<template>
  <!-- using computed Propertie -->
  <tag>{{ computedPropertieName }}</tag>

  <!-- using computed function-->
  <tag>{{ computedFunction() }}</tag>
<template>
```

#### Computed Caching vs. Method

> 🔴 A method invocation will always run the function whenever a re-render happens.

> 🔴 Computed properties are cached based on their reactive dependencies. A computed property will only re-evaluate when some of its reactive dependencies have changed.

#### Writable Computed
It is possible to create `getter` and `setter` for computed propertie using `computed` API. Here is syntax : 

```html
<script setup>
  import { computed } from 'vue';

  const computedPropertieName = computed({
    // getter
    get(){
      // return data based on state
    }

    // setter
    set(newValue){
      // which can change state by below syntax
      /**
       * computedPropertieName.value = newValue;
       */
    }
  })
```

#### Best Practices.

- Getter should be side-effect
  - Not muted state in getter function in computed propertie.
  - Don't make async request.
- Avoid mutating computed value.
  - Think that return value of computed propertie or function is read only.

<hr />

## Class and Style Bindings

#### Binding with Object
It possible to pass dynamically toggle classes : 

```html
<div :class="{ active : isActive, "text-danger": hasError}"></div>

<!-- if active : true and "text-danger" : true then -->
<div class="active text-danger"></div>

<!-- if active : false and "text-danger" : true then -->
<div class"text-danger"></div>

<!-- another example -->
<div class="static" :class="{ active : isActive}"></div>

<!-- if here isActive : true -->
<div class="static active"></div>
```

#### Binding with Array
It possible to `:class` bind to an array :
```html
<div :class="[activeClass, errorClass]"></div>

<!-- if activeClass = 'active' and
     errorClass = 'text-danger' then -->

<div class="active text-danger"></div>

<!-- array and toggle object -->
<div :class="[{ active: isActive}, errorClass]"></div>

```

#### Compunent Class
Child class and Parent class names are combines.

```html
<!-- child class MyComponent-->
<p class="foo bar">Hi!</p>

<!-- Use this component -->
<MyComponent class="bas boo" />

<!-- it will render like this -->
<p class="foo bar baz boo">Hi!</p>

<!-- The same is true for class bindings -->
<MyComponent :class="{active:isActive}" />

<!-- if isActive is true then -->

<p class="foo bar active">Hi!</p>

<!-- if components has multiple root element -->
<p :class="$attrs.class">Text</p>
<span>This is a child component</span>

<MyComponent class="baz" />

<!-- will run -->
<p class="baz">text</p>
<span>This is child component</span>
```

#### Binding inlin styles
**It is possible to pass object to set inline style :**
```html
<script>
  styledObject = reactive({
    color : 'ref',
    fontSize : '13px' // camelCase
    // 'font-size' : '13px' // kabab case also work
  });
</script>

<template>
  <div :style='styleObject'></div>
</template>
```

**It is possible to pass array of object to set inline style :**

```html
<div :style="[baseStyles,overridingStyles]"></div>
```


#### auto-prefixing
It is possible to provide multiple value for auto prefixing supporting browser : 

```html
<div :style="{display: ['-webkit-box','-ms-flexbox','flex']}"></div>
```

<hr />

## Conditional Rendering

`v-if`, `v-else-if` and `v-else` directive use for conditional render like use `if-else` syntax in programming. Here is syntax : 

```html
<div v-if="num < 0">this is negative</div>

<div v-else-if="num > 0">This is not negative</div>

<div v-else>This is zero</div>

<!-- 
  Here if num is less than zero then first div will render.
  If num is greater than zero then second div will render.
  else third div will render.
  -->
```

One more directive is `v-show` which is work alone. It dose not render or rerender the dom element it's just change the directive. Example : 

```html
<div v-show="isOk">Hello!</h1>
```

<hr />

## List Rendering

`v-for` directive use for render list. Here is syntax : 

```html
<li v-for="item in items">
  {{ item.message }}
</li>
```
also support second allias : 

```html
<script>
  .....
  .....
  const parentMessage = ref("Parent");
  const item = reactive([
    {
      message : 'foo'
    },
    {
      message : 'bar'
    }
  ])
</script>

<li v-for="(item, index) in items">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>
```

> 🟢 Variable scoping of v-for is similar to the javascript function. Here it is limited in tag where it used.



#### using object in list rendering

The syntax of render list based on object : 

```html
<li v-for="value in aObject">
</li>
```

Also access key and value : 

```html
<li v-for="(value, key) in aObject">
  {{ key }} : {{ value }}
</li>
```

Also access key, value and index : 
```html
<li v-for="(value, key, index) in aObject">
</li>
```

#### using range to render list
The syntax of using range to render element : 

```html
<li v-for="i in 10">
</li>
<!-- some thing like python range function -->
```


#### Maintaining state with key

If need to manipulate the item of list in vue then don't manipulate it directily touch dom just set uniuqe key to every liste item. here syntax : 

```html
<div v-for="item in items" :key="item.id">
</div>
```

> 🔴 Must use key for render list item if the item need to be change.

#### v-for with a component

The syntax is same with render a list component : 

```html
<Component v-for="(item, index) in items"
           :item="item"
           :index="index"
           :key="item.id"
           />
```


<hr />

## Listening to Events

`v-on` directive use for listening even. The shortcut key of this directive is @. One more thing the handler can be two way. The way is : 

1. ***Inline handlers :** inline javascript to be executed when the event is triggered (similar to the native onclick attribute).

2. **Method handlers :** A property name or path that point to a method defined on the component.

**Example of inline handlers :**
```html
<script>
  export default {
    data(){
      return {
        count : 0
      }
    }
  }
</script>

<template>
  <button @click="count++">add 1</button>
  <p>Count is : {{ count }}</p>
</template>
```

**Example of method handlers :**
```html
<button @click="greet">Greet</button>
```

#### Calling method in inline handlers
It possible to call methods in an inline handler, which allow to pass the method with custom arguments :

```html
<button @click="say("hello")">Say Hello</button>
```


#### Accessing event argument in inline handlers 

```html
<!-- here $event is the event argument -->
<button @click="functionName($event)"></button>

<!-- also using inline arrow function -->
<button @click="(event)=> functionName(event)"></button>
```

#### Event Modifiers

Event modifiers help to call some built in function inside the event. Like need to call `event.preventDefault()` or `event.stopPropagation()` etc. here is some event modifiers name : 

- `.stop`
- `.prevent`
- `.self`
- `.capture`
- `.once`
- `.passive`

Here is example : 

```html
<!-- the click event's propagation will be stopped -->
<a @click.stop="functionName"></a>

<!-- the submit event will no longer reload the page -->
<form @submit.prevent="onSubmit"></form>

<!-- modifiers can be chained -->
<a @click.stop.prevent="functionName()"</a>

<!-- just the modifier -->
<form @submit.prevent></form>

<!-- only trigger handler if event.target is the element itself. -->
<div @click.self="functionName"></div>
```

#### Key Modifiers
When listening for keyboard events, often neet to check for specific keys. Vue allow adding key modifiers for `v-on` or `@` whent listening for key events : 

```html
<!-- only call `submit` when the `key` is `enter` -->
<input @keyup.enter="submit" />

<!-- Directly use any valid key names exposed via keyboardEvent.key as modifiers by converting them to kebab-case -->
<input @keyup.page-down="onPageDown" />
```

**Key Aliases :**
vue provides aliases for the most commonly used keys : 

- `.enter`
- `.tab`
- `.delete` (captures both "delete" and "backspace")
- `.esc`
- `.space`
- `.up`
- `.down`
- `.left`
- `.right`

**System modifier keys :**

- `.ctrl`
- `.alt`
- `.shift`
- `.shift`
- `.meta`


**For example :**
```html
<!-- alt + enter -->
<input @keyup.alt.enter="clear">


<!-- ctrl + click -->
<div @click.ctrl="doSomething">Do Somethign</div>
```

#### .exact modifier

the .exact modifier allows control of the exact combination of system modifiers needed to trigger and event.

```html
<!-- it will fire even if alt or shift is also pressed -->
<button @click.ctrl="onClick"></button>

<!-- this will only fire when ctrl and no other keys are pressed -->
<button @click.ctrl.exact="onCtrlClick"></button>

<!-- this will only fire when no system modifiers are pressed -->

<button @click.exact="onClick">A</button>
```

**Mouse button modifires :**

- `.left`
- `.right`
- `.middle`


<hr />

## Form input bindings

**Two way binding in vue :**

```html
<input
  :value="text"
  :@input="event=> text = event.target.value" />
```

The `v-model` directive do same thing in shortcut.

```html
<input v-model="text" />
```

**v-model used on :**

- `<input>` with text types and `<textarea>` elements use `value` property and input event.
- `<input type="checkbox" />` and `<input type="radio">` use checked property and change event.
- `<select>` use value as a prop and change as an event.

**Basic example :**
```html
<p>Message is : {{ message }}</p>
<input v-model="message" placeholder="edit me" />
```

#### Checkbox

**Exmaple of using check box :**

```html
<!-- it work here like a boolean -->
<input type="checkbox" id="checkbox" v-model="checked" />
```


**It possible to set checkbox name with array or set. But in that case use `ref` instead of `reactive`.

```html
<div>Checked names: {{ checkedNames }}</div>

<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>

<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>

<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
<label for="mike">Mike</label>
```

***It possible to set true and false value in checkbox :**
```html
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no" />
```


#### Modifiers

- `.number` : if user input to be automatically typecast as a number the use this modifier. `<input v-model.number="age" />

- `.trim` : If whitespace from user input to be trimmed automatically, then add the `trim` modifier to `v-model` inputs. `<input v-model.trim="msg" />

<hr />

## Lifecycle Hooks

Here is all life cycle hooks, in diagram :

![Lifecycle hooks diagram](./asset/lifecycle_diagram.png)

<hr />

## Watchers 

> 🟢 The watcher function called when the spacifie state change.

**Syntax of watcher with composition api :**

```html
<script setup>
  import {ref, watch} from "vue";

  const state = ref('');

  // watcher for state varaiable
  watch(state,async(newState,oldState)=>{
    // do anything here.
  })
</script>
```

**Syntax of watcher with option :**

```html
<script>
  export default {
    data(){
      return {
        // state here
        state : ""
      }
    },

    watch : {
      // watch for state
      state(newState){
        // do anything
      }
    }
  }
</script>
```

#### Watch source types

> 🟢 Watch first argument can be different types of reactive "sources" : it can be a ref (including computed refs), a reactive object, a getter function or an array of mulitple sources.

Example :

```javascript
const x = ref(0);
const y = ref(0);

// single ref
watch(x, (newX)=>{
  console.log(`x is ${newX}`);
})

// getter // it called when x or y change
watch(
  ()=> x.value + y.value,
  (sum)=>{
    console.log(`sum of x + y is : ${sum}`);
  }
)

// array of multiple sources
watch(
  [x, ()=> y.value], ([newX,newY]=>{
    console.log(`x is ${newX} and y is ${newY}`);
  })
)
```

> 🟢 Note that it not possile to watch a property of a reactive object like this : 

```javascript
const ob = reactive({count : 0});

watch(ob.count,(count)=>{
  console.log(`count is : ${count}`);
})
```

instead use getter: 

```javascript
watch(
  ()=> ob.count,
  (count)=>{
    // do something
  }
)
```

#### Deep watchers

```javascript
const obj = reactive({count : 0});

watch(obj,(newValue,oldValue)=>{
  // fires on nested property mutations
  // note: `newValue` will be equal to `oldValue` here
  // because they both point to the same object.
})

obj.count++;
```

But this think different in getter : 

```javascript
watch(
  ()=> state.someObject,
  ()=>{
    // fires only when state.someObject is replaced
  }
)
```

or make the first way to deep watcher : 

```javascript
watch(
  ()=> state.someObject,
  (newValue,oldValue)=>{
    // Note : `newValue` will be equal to `oldValue` here
    // *unless* state.someObject has been replaced
  },
  {
    deep : true
  }
)
```

#### Eager watchers

on the `immediate` opiton in watch to called watcher initially. Here is syntax : 

```javascript
watch(source, (newValue,oldValue)=>{

}, {immediate : true });
```

#### watchEffect 

> `watchEffect` work like `watch` but main different is that, it automatically detect dependencies in state.

```javascript
watchEffect(async ()=>{
  // do something state
})
```

> 🟢 Main different between `watch` and `watchEffect` is that `watch` only tracks the explicitly watched source and `watchEffect` detect dependencies automatically.

#### Callback flush timing

If need to trigger watch before Vue component then set flush option to 'post' in watch option.

```javascript
watch(source,callback,{
  flush : "post"
})

watchEffect(callback,{
  flush : "post"
})
```

post-flush `watchEffect()` also has a convenience alias, `watchPostEffect()`.

#### Stoping a watcher

> 🟢 Every watcher stoped after the unmount the component but if watcher created in asynchronously then it can not me stop. in that case :

```javascript
const unwatch = watchEffect(()=>{});

// .... later, when no longer needed
unwatch();
```

<hr />

## Template Refs

If need to access dom then use `ref` attribute to achive this. Don't touch directly.

```html
<input ref="input" />
```
**Access the refs in option :**

```html
<script>
  export default {
    mounted(){
      this.$refs.input.focus();
    }
  }
</script>

<template>
  <input ref="input" />
</template>
```

**Access the refs in composition :**
```html
<script setup>
  import {ref,onMounted} from "vue";

  const input = ref(null);

  onMounted(()=>{
    input.focus();
  })
</script>

<template>
  <input ref="input" />
</template>
```

#### Refs inside the v-for 

When `ref` is used inside the `v-for`, the resulting ref value will be an array containing refs elements.

```html
<script>
  export default {
    // accessing refs
    mounted(){
      console.log(this.$refs.items);
    }
  }
</script>

<template>
  <ul>
    <li v-for="n in 10" ref="items">
      {{n}}
    </li>
  </ul>
</template>
```

in composition : 

```html
<script setup>
  import { ref,onMounted } from "vue";

  const items = ref([]);

  // accessing items.
  onMounted(()=>{
    console.log(items.value);
  })
</script>

<template>
  <div v-for="n in 10" ref="items"></div>
```

#### Function Refs

`ref` attribute can also be bound to a function, wich will be called on each component update and gives flexiblity on where to store the reference. The function receives the element reference as the first argument : 

```html
<input :ref="(el) => { /* assign el to a property or ref */} />"
```

#### Ref on Component

It possible to use `ref` in a child component. In this case the reference will be that of a component instance : 

```html
<script>
  import Child from "./child.vue"
  
  export default {
    components : {
      Child
    },
    mounted(){
      // this.$refs.child will hold an instance of <Child />
    }
  }
</script>

<template>
  <Child ref="child" />
</template>
```

The `expose option can be used to limit the access to a child instance.

```javascript
export default {
  expose : ['publicData', 'publicMethod'],

  data(){
    return {
      publicData : 'foo',
      privateData : 'bar'
    }
  },

  methods : {
    publicMethod(){
      /* ... */
    },

    privateMethod(){
      /* ... */
    }
  }
}
```

<hr />

## Defining a Component

Define a **Single-File Component :**

```html
<script>
  export default {
    data(){
      return {
        count : 0
      }
    }
  }
</script>

<template>
  <button @click="count++">You clicked me {{ count }} times. </button>
<template>
```

It can possible ot a vue component plain javascript object. Here is example : 

```javascript
export default{
  data(){
    return {
      count : 0
    }
  },
  template : `
    <button @click="count++">
      You clicked me {{ count }} times
    </button>
  `
}
```

in that case use "vue/dist/vue.esm-bundler" instead of "vue" at App.vue or current file.

## Using a Component

Example of using component : 

```html
<script>
  import ButtonCounter from './ButtonCounter.vue';

  export default {
    components : {
      ButtonCounter
    }
  }
</script>

<template>
  <h1> Here is a child component!</h1>
  <buttonCounter />
<template>
```

In option way, to expose the imported component to template, neet to register it with the `components` option.

> 🟢 In SFC's it's recommended to use `PascalCase` tag names for child components to differentiate from native HTML element.

#### Passing Props

Example of passing props : 

```html
<!-- it is BlogPost child-->
<script>
  export default {
    props : ['title']
  }
</script>

<template>
  <h4> {{ title }}</h4>
<template>
```

using child with props : 

```html
<BlogPost title="title" />
```

#### Create emit in child

```html
<script>
  export default{
    emits : ['emit-name',/* here list of emit */]
  }
</script>

<template>
  <tag @eventName="$emits('emit-name','argument')/* access the emit function */"> </tag>
</template>
```

Use emit from parent : 

```html
<template>
  <Child @emit-name="function_name" />
</template>
```

Emit in composition : 

```html
<script setup>
  const emit = defineEmits(['emit-name']);

  // call the emit with argument
  emit('emit-name',"rest_of_argument");
</script>
```

#### Content Distribution with Slots

`<slot>` tag use for distrubute content inside the child tag. Here is example : 

```html
<template>
  <div>
    <strong>This is text</strong>
    
    <!-- here destributing the inside of the child content.-->
    <slot />
  </div>
<template>
```

Default text to slot : 
```html
<slot> By default text </slot>
```


#### Dynamically set components

```html
<component :is="ComponentName" />
<component :is="AnotherComponentName"></component>

<!--
  it possible to use the `is` attribute to create regular html element.
-->
```

#### Case insensitivity

HTML is case-insensitive so that case use props and emits which are written in camelCase will convert in kabab case for component attriute for use in template.

```js
// camelCase in JavaScript
const BlogPost = {
  props: ['postTitle'],
  emits: ['updatePost'],
  template: `
    <h3>{{ postTitle }}</h3>
  `
}
```

```html
<!-- kebab-case in HTML -->
<blog-post post-title="hello!" @update-post="onUpdatePost"></blog-post>
```