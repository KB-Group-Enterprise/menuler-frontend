<template>
  <BaseContainer>
    <div class="text-center text-2xl mt-8 text-gray-600 uppercase">
      <span class="font-semibold text-bl">Menuler</span>
      Business
    </div>
    <div class="text-center text-lg my-2">เข้าสู่ระบบ</div>
    <BusinessLoginForm />
  </BaseContainer>
</template>

<script setup lang="ts">
import BaseContainer from '../../components/Base/BaseContainer.vue';
import BusinessLoginForm from '../../components/Business/BusinessLoginForm.vue';
</script>
