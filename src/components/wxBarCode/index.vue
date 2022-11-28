<template>
  <Modal v-model="visible" class="wx-bar-code" :mask="false" :footer-hide="true" :z-index="999">
    <template #header>
      <div class="bar-code-desc">
        <span class="wx-app">刀塔辅助助手</span>
        <span>微信小程序</span>
      </div>
    </template>
    <div>
      <img class="bar-code-img" src="../../assets/images/wx_bar_code.jpg" />
    </div>
  </Modal>
</template>
<script setup>
import { ref } from 'vue';
const visible = ref(true);
</script>
<style lang="scss">
.wx-bar-code {
  width: 200px !important;
  position: fixed !important;
  top: auto !important;
  right: 20px !important;
  bottom: 40px !important;
  padding: 10px;
  .bar-code-desc {
    font-size: 13px;
  }
  .ivu-modal-header {
    padding: 12px 8px;
  }
  .ivu-modal-close {
    right: 2px !important;
    top: 2px !important;
  }
  .ivu-icon-ios-close {
    font-size: 25px !important;
  }
  .ivu-modal-body {
    padding: 8px;
  }
  .bar-code-img {
    width: 100%;
    display: block;
  }
  .wx-app {
    color: #2d8cf0;
  }
}
</style>
