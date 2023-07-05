<script>
import { ref } from "vue";

export default{
    setup(){
        const message = ref("Hello, Multiverse");

        return {
            message
        }
    }
}
</script>

<template>
    <h1> {{  message  }}</h1>
</template>