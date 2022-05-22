<template>
    <span>
          {{ interval && (zeroCondition.length > 0 ? zeroCondition?.every(i => i) : true )? `${(interval.value!.hours! + interval.value!.days! * 24).toString().padStart(2,'00')}:${interval.value!.minutes!.toString().padStart(2,'00')}:${interval.value!.seconds!.toString().padStart(2,'00')}` : '00:00:00'}}
    </span>
</template>

<script setup lang="ts">
const props = defineProps({
    interval: Object as any,
    zeroCondition: {
        type: Array,
        default: () => [],
    },
})
</script>

<style scoped>

</style>