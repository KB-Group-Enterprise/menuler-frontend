<template>
    <div class="text-center text-2xl mt-8 text-gray-600 uppercase">
        <span class="font-semibold text-bl">Menuler</span>
        Business
    </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
    setup () {
        const state = reactive({
            count: 0,
        })
    
        return {
            ...toRefs(state),
        }
    }
}
</script>

<style lang="scss" scoped>

</style>