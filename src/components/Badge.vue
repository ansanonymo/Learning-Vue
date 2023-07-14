<script setup>
const props = defineProps({
    color : {
        type : String,
        default : "aliceblue"
    },
    bgColor : {
        type : String,
        default : "purple"
    },
    padding : {
        type : String,
        default : "8px"
    }
})

const css = {
    "color" : props.color,
    "background-color" : props.bgColor,
    "padding" : props.padding
};
</script>

<template>
    <span :style="css">
        <slot>Badge</slot>
    </span>
</template>