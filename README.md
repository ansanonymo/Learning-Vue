# Components In-Depth

Here this part contains : 


<hr />

## Component Registration

### Global Registration

It can possible to make component avaiable globally use `component()` method of `app` object which is created by `createApp()` method. Here is example : 

```javascript
import { createApp } from 'vue';

const app = createApp({});

app.component(
    // the registered name
    "ComponentName",

    // the implementation
    {
        /* ... */
    }
)
```

If using SFC, then : 

```javascript
import MyComponent from "./myComponent.vue";

app.component("MyComponent",MyComponent);
```

`component` method can be chain.

```javascript
app
    .component("ComA",ComA)
    .component("ComB",ComB)
    .component("ComC",ComC);
```

### Local Registration

Problem with **Global Registration** : 

- Global registraiton prevents build system from removing unused components. If globally register a component is not using anywhere in app, then it will still be included in the final bundle.
- Gobal Registration makes dependency relationships less explicit in large applicaitons.

Local registration is done using the `components` option :

```html
<script>
    import CompA from "./path/to/comp";

    export default{
        components : {
            NameComponent : CompA
        }
    }
</script>

<template>
    <CompA />
</template>
```

### Component Name Casing

- PascalCase
- kabab-case

<hr />


## Props

### Props Declaration

Props are declared using the props option : 

```javascript
export default {
    props : ['foo'],
    created(){
        // props are exposed on `this`
        console.log(this.foo);
    }
}
```

another way export props : 

```javascript
export default {
    props : {
        title : String, // prop type
        likes : Number // prop type
    }
}
```

### One-Way Data Flow
Props are read only thing. It's not possible to change state value by props.

```javascript
export default {
    props : ['foo'],
    // x warning, props are readonly!
    created(){
        this.foo = 'bar'
    }
}
```

### Prop Validation

```javascript
export default {
    props : {
        // basic type check
        // ( 'null' and 'undefined' values will allow nay type)
        propA : Number,

        // Multiple possible types
        propB : [String, Number],

        // required string
        propC : {
            type : String,
            required : true
        }, 

        // Number with a default value
        propD : {
            type : Number,
            default : 100
        },

        // object with a default value
        propE : {
            type : Object,
            // object or array defaults must be retuned
            // from a factory function. The function
            // receives the raw props received by the
            // component as the argument.

            default(rawProps){
                return { message : 'hello' }
            }
        },

        // custom validator function
        propF : {
            validator(value) {
                // The value must match one of these strings
                return ['success', 'warning', 'danger'].includes(value)
            }
        },

        // Function with a default value
        propG : {
            type : Function,
            // unlike object or array default, this is
            // not a factory function - this is a function
            // to serve as a default value
            default(){
                return 'Default function';
            }
        }
    }
}
```

additional details : 

- all props are optional by default, unless `required: true` is specified.
- The `Boolean` absent props will be cast to `false`. But it can change by setting a `default` for it. `default : undefined` to behave as a non-Boolean prop.


### Runtime Type Checks

The `type` can be one of the following native constructors : 

- `String`
- `Number`
- `Boolean`
- `Array`
- `Object`
- `Date`
- `Function`
- `Symbol`

> 🟢 In addtion, `type` can also be a custom class or constructor function and the assertion will be made with `instanceof` check.