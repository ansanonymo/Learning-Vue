<script>
export default{
    emits : [
        'make-large'
    ]
}
</script>

<template>
    <button class="btn" @click="$emit('make-large',43)">Increase Size</button>
</template>
