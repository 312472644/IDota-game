<template>
  <Modal v-model="visible" class="talent-dialog" :footer-hide="true" :closable="false">
    <div class="tile">天赋树</div>
    <div class="talent">
      <div v-for="(item, index) in dataList" :key="index" class="talent-item">
        <div class="talent-loc">{{ item.dataList[1].talentText }}</div>
        <div class="talent-level">{{ item.level }}</div>
        <div class="talent-loc">{{ item.dataList[0].talentText }}</div>
      </div>
    </div>
  </Modal>
</template>
<script setup>
import { ref } from 'vue';
const props = defineProps({
  dataList: {
    type: Array,
    default: () => []
  }
});

const visible = ref(false);

defineExpose({
  visible
});
</script>
<style lang="scss">
.talent-dialog {
  .ivu-modal-content {
    border-radius: 3px;
  }
  .tile {
    text-align: center;
    font-size: 14px;
  }
  .talent {
    padding: 10px 0;
    .talent-item {
      position: relative;
      display: flex;
      align-content: center;
      &:not(:last-of-type) {
        margin-bottom: 10px;
      }
      .talent-loc {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 8px 12px;
        font-size: 13px;
        width: calc(50% - 25px);
        border-radius: 3px;
        background: #ececec;
      }
      .talent-level {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 2px solid #dcdee2;
        font-size: 18px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #e6e6e6;
      }
    }
  }
}
</style>
