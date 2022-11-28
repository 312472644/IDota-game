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
    color: #17233d;
    font-size: 15px;
    font-weight: bold;
  }
  .anchor-body {
    padding: 10px 0;
  }
}
</style>
