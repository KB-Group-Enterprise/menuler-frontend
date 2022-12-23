<template>
  <LayoutContainer>
    <BaseLoading v-if="isLoading" />
    <div v-else class="w-full">
      <BusinessHeader></BusinessHeader>
      <div class="w-full">
        <h1 class="text-center">Edit Menu</h1>
        <BusinessMenuForm :menu="menu" @save="updateMenu" @refetch="fetchData()" />
      </div>
    </div>
  </LayoutContainer>
</template>

<script setup lang="ts">
import LayoutContainer from '@/components/Layout/LayoutContainer.vue';
import BusinessHeader from '@/components/Business/BusinessHeader.vue';
import BusinessMenuForm from '@/components/Business/BusinessMenuForm.vue';
import { useEapi } from '@/providers';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';
import BaseLoading from '@/components/Base/BaseLoading.vue';

const eapi = useEapi();
const router = useRouter();
const route = useRoute();
const id = route.params.id as string;
const menu = ref<any>(null);
const isLoading = ref(true);

if (!id) {
  router.push('/business/menu');
}

const fetchData = async () => {
  const result = await eapi.menu.getMenuByMenuId(id);
  if (result.success && result.message) {
    menu.value = result.data.menu;
    isLoading.value = false;
  } else {
    router.push('/business/menu');
  }
};

fetchData();

const updateMenu = async (payload: any) => {
  const formData = new FormData();
  formData.append('foodName', payload.name);
  formData.append('category', payload.category);
  formData.append('price', payload.price);
  formData.append('description', payload.description);
  if (payload.menuImage) formData.append('menuImage', payload.menuImage);
  const result = await eapi.menu.adminUpdateMenu(id ,formData, { noticeSuccess: true });
  if (result.success) {
    router.push('/business/menu');
  }
};
</script>

<style lang="scss" scoped></style>
