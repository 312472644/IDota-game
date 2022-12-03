<template>
  <div class="empty-box">
    <div class="empty-image">
      <img src="../../assets/images/empty.svg" />
    </div>
    <div class="empty-description">{{ emptyText }}</div>
  </div>
</template>
<script setup>
defineProps({
  emptyText: {
    type: String,
    default: 'No Data'
  }
});
</script>
<style lang="scss">
.empty-box {
  padding: 10px 0;
  text-align: center;
  user-select: none;
  .empty-image {
    height: 40px;
    margin-bottom: 8px;
  }
  .empty-description {
    color: #00000040;
  }
}
</style>
