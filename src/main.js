import App from "./App.vue";
import { createApp } from "vue";

// useless component
import UselessComponent from "./UselessComponent.vue"

// create vue app
const app = createApp(App);

// error handling here
app.config.errorHandler = (err) =>{
    console.log("this is error handler.");
    console.log(err);
}

// set the component globally
/**
 * app.component("component_name_to_use",component);
 */

app.component("UselessBtn",UselessComponent);


// mount the application
app.mount("#app");

