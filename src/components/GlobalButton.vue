<script setup>
const props = defineProps({
    bgColor : String,
    color : String
});

const css = { 
    "background-color" : props.bgColor,
    "border" : `1px solid ${props.bgColor}`,
    "color" : props.color,
    "padding" : "10px",
    "margin" : "3px",
    "cursor" : "pointer",
 };
</script>

<template>
    <button :style="css">
        <slot />
    </button>
</template>