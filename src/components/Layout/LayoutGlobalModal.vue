<template>
  <BaseModal
    v-if="state.isModalOpen && state.modalComponent"
    :is-modal-active="state.isModalOpen"
    @close="closeModal"
  >
    <component :is="state.modalComponent"></component>
  </BaseModal>
</template>

<script setup lang="ts">
import { useGlobal } from '@/providers/global';
import BaseModal from '../Base/BaseModal.vue';

const { state, setState } = useGlobal();
const closeModal = () => {
  setState({ isModalOpen: false });
};
</script>
