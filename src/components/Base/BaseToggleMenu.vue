<template>
  <div class="menu-wrapper" :class="{ active: isSidebarOpen }">
    <div class="menu-bar one"></div>
    <div class="menu-bar two"></div>
    <div class="menu-bar three"></div>
  </div>
</template>

<script setup lang="ts">
import { useGlobal } from '@/providers/global';
import { computed } from 'vue';

const global = useGlobal();
const isSidebarOpen = computed(() => global.state.isSidebarOpen);
</script>

<style lang="scss" scoped>
.menu-wrapper {
  width: 1.5rem;
  height: 2rem;
  cursor: pointer;
  position: relative;
}

.menu-bar {
  position: absolute;
  width: 100%;
  height: 0.2rem;
  background: #fff;
  left: 0%;
}

.menu-wrapper:hover .menu-bar {
  /*animation-duration: 1s;
  animation-name: slideOut;
  animation-direction: alternate;
  animation-timing-function: ease-out;*/
}

.one {
  top: 0.4rem;
  animation-delay: 0.1s;
  transition: all 0.3s;
}

.two {
  top: 1rem;
  transition: all 0.3s;
}

.three {
  top: 1.6rem;
  transition: all 0.3s;
}

@keyframes slideOut {
  0% {
    width: 100%;
    left: 0%;
    right: auto;
  }

  50% {
    width: 0%;
    left: 0%;
    right: auto;
  }
  51% {
    width: 0%;
    right: 0%;
    left: auto;
  }

  100% {
    width: 100%;
    right: 0%;
    left: auto;
  }
}

/**/

.menu-wrapper:hover .menu-bar.active {
  animation: none;
}
.active .one {
  top: 50%;
  left: 0%;
  transform: rotate(45deg);
}
.active .two {
  top: 50%;
  left: 0%;
  transform: rotate(-45deg);
}

.active .three {
  opacity: 0;
}
</style>
