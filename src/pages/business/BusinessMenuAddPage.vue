<template>
    <LayoutContainer>
        <BusinessHeader></BusinessHeader>
        <div class="w-10/12">
            <h1 class="text-center">Add Menu To Collection</h1>
            <BusinessMenuForm @save="createMenu" />
        </div>
    </LayoutContainer>
</template>

<script setup lang="ts">
import LayoutContainer from '@/components/Layout/LayoutContainer.vue';
import BusinessHeader from '@/components/Business/BusinessHeader.vue';
import BusinessMenuForm from '@/components/Business/BusinessMenuForm.vue';
import { useEapi } from '@/providers';
import { useRoute, useRouter } from 'vue-router';
 
const eapi = useEapi();
const router = useRouter();


const createMenu = async (payload: any) => {
    const formData = new FormData();
    formData.append('foodName', payload.name)
    formData.append('category', payload.category)
    formData.append('price', payload.price)
    formData.append('description', payload.description)
    formData.append('menuImage', payload.menuImage)
    const result = await eapi.menu.adminCreateMenu(formData);
    if (result.success) {
        router.push('/business/menu')
    }
}


</script>

<style lang="scss" scoped>

</style>