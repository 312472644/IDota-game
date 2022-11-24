<template>
  <header class="header">
    <div class="header-main wrap">
      <div class="logo-wrap">
        <span class="logo"></span>
      </div>
      <base-link />
    </div>
  </header>
</template>
<script setup>
import BaseLink from './BaseLink.vue';
</script>
<style lang="scss">
.header {
  background-image: linear-gradient(-180deg, #fff 0%, #fafbfc 100%);
  box-shadow: 0 0 0 1px rgb(0 0 0 / 3%), 0 2px 8px 0 rgb(0 0 0 / 4%);
  width: 100%;
  background-color: #fff;
  border-bottom: 1px solid #f8f8f8;
  min-width: 1280px;
  .header-main {
    .logo-wrap {
      .logo {
        width: 48px;
        height: 50px;
        float: left;
        background-image: url('../assets/logo/dota.png');
        background-size: contain;
        background-repeat: no-repeat;
        background-position: 0px center;
      }
    }
  }
}
</style>
