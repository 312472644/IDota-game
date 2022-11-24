<template>
  <nav class="menu">
    <router-link
      v-for="(item, index) in menuList"
      :key="index"
      active-class="active"
      class="menu-item"
      :to="item.path"
    >
      {{ item.title }}
    </router-link>
  </nav>
</template>
<script setup>
import { ref } from 'vue';

const menuList = ref([
  { title: '比赛数据', path: '/dota-matches' },
  { title: '英雄', path: '/dota-hero' },
  { title: '职业战队', path: '/dota-team' }
]);
</script>
<style lang="scss">
.menu {
  height: 50px;
  line-height: 50px;
  .menu-item {
    font-size: 16px;
    color: #a8abb3;
    position: relative;
    margin-left: 40px;
    &.active {
      color: #2d2f33;
    }
  }
}
</style>
