<template>
    <div class="w-full">
    <div class="text-center text-2xl mt-8 text-gray-600 uppercase">
        <span class="font-semibold text-bl">Menuler</span>
        Business
    </div>
        <h1 class="text-center" v-show="title">{{ title }}</h1>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        title: {
            type: String,
            required: false,
        }
    })

    // console.log(props.title)
</script>