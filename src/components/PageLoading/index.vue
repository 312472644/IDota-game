<template>
  <Spin :show="show" class="page-loading" size="small">
    <Icon type="ios-loading" :color="color" :size="size" class="spin-icon-load"></Icon>
    <div class="loading-text">加载中...</div>
  </Spin>
</template>
<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: '#808695'
  },
  size: {
    type: String,
    default: '18'
  }
});
</script>
