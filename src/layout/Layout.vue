<template>
  <base-header />
  <div class="content-wrap">
    <div class="wrap">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </div>
  </div>
</template>
<script setup>
import BaseHeader from './BaseHeader.vue';
</script>
<style lang="scss">
.content-wrap {
  width: 100%;
  min-width: 1280px;
}
</style>
