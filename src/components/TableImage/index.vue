<template>
  <Image class="table-image" v-bind="$attrs" width="35px" height="35px" fit="contain" lazy>
    <template #placeholder>
      <Spin />
    </template>
    <template #error>
      <div class="image-error"></div>
    </template>
  </Image>
</template>
<script setup></script>
<style lang="scss">
.table-image {
  .ivu-image-error {
    .image-error {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-image: url('../../assets/logo/dota.png');
      background-position: center;
      background-size: 100% 100%;
    }
  }
}
</style>
