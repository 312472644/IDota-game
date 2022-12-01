<template>
  <nav class="menu">
    <router-link
      v-for="item in menuList"
      :key="item.path"
      active-class="active"
      :class="{ 'menu-item': true, active: activeRoute.path === item.path }"
      :to="item.path"
    >
      {{ item.title }}
    </router-link>
  </nav>
</template>
<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const activeRoute = ref();
const menuList = ref([
  { title: '数据', path: '/dota-data' },
  { title: '职业战队', path: '/dota-team' },
  { title: '英雄资料', path: '/dota-hero' },
  { title: '物品资料', path: '/dota-item' }
]);

const getActiveRoute = path => {
  const rootPath = path.split('/')[1];
  const result = menuList.value.find(item => item.path === `/${rootPath}`);
  activeRoute.value = result;
};

watch(
  route,
  newValue => {
    getActiveRoute(newValue.path);
  },
  { immediate: true }
);
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
    transition: color 0.2s linear;
    &.active {
      color: #2d2f33;
    }
  }
}
</style>
