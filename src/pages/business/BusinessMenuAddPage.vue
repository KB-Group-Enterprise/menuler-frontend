<template>
    <LayoutContainer>
        <BusinessHeader></BusinessHeader>
        <div class="w-10/12">
            <h1 class="text-center">Add Menu To Collection</h1>
            <BusinessMenuForm />
        </div>
    </LayoutContainer>
</template>

<script setup>
import LayoutContainer from '@/components/Layout/LayoutContainer.vue';
import BusinessHeader from '@/components/Business/BusinessHeader.vue';
import BusinessMenuForm from '@/components/Business/BusinessMenuForm.vue';

</script>

<style lang="scss" scoped>

</style>