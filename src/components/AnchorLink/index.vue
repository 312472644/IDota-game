<template>
  <div :id="id" class="anchor-card">
    <div class="anchor-header">{{ title }}</div>
    <div class="anchor-body">
      <slot></slot>
    </div>
  </div>
</template>
<script setup>
defineProps({
  id: {
    type: [String, Number],
    required: true
  },
  title: {
    type: String,
    required: true
  }
});
</script>
<style lang="scss">
.anchor-card {
  .anchor-header {
    position: relative;
    color: #17233d;
    font-size: 15px;
    font-weight: 400;
    padding-left: 10px;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: 5px;
      width: 2px;
      height: 12px;
      background: #17233d;
    }
  }
  .anchor-body {
    padding: 10px 0;
  }
}
</style>
