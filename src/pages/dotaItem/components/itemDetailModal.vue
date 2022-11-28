<template>
  <Modal
    v-model="visible"
    class="model-detail"
    :closable="false"
    :footer-hide="true"
  >
    <div class="detail-name">
      <img :src="`https://www.dota2.com.cn/items/images/${itemDetail.img}`" />
      <span class="text">{{ itemDetail.dname }}</span>
    </div>
    <div class="detail-desc" v-html="filter(itemDetail.desc)"></div>
    <div class="detail-notes" v-html="itemDetail.notes"></div>
    <div class="detail-attrib" v-html="itemDetail.attrib"></div>
    <div v-if="itemDetail.cd || itemDetail.mc" class="detail-extract">
      <div class="detail-extract-item">
        <div class="cool-down"></div>
        <span class="extract-text">{{ itemDetail.cd }}</span>
      </div>
      <div class="detail-extract-item">
        <div class="cost"></div>
        <span class="extract-text">
          {{ itemDetail.mc }}
        </span>
      </div>
    </div>
    <div class="detail-lore">{{ itemDetail.lore }}</div>
  </Modal>
</template>
<script setup>
import { ref } from 'vue';
defineProps({
  itemDetail: {
    type: Object,
    required: true,
    default: () => {}
  }
});

const visible = ref(false);
const filter = desc => {
  return desc?.replaceAll('\\n', '') || '';
};

defineExpose({
  visible
});
</script>
<style lang="scss">
.model-detail {
  top: 20%;
  .ivu-modal-body {
    background: linear-gradient(45deg, #060606, #212121, #292928);
    border-radius: 3px;
  }
  .detail-name {
    display: flex;
    align-items: flex-start;
    color: #fff;
    font-size: 15px;
    img {
      width: 80px;
      height: 60px;
    }
    .text {
      padding-left: 10px;
    }
  }
  .detail-desc {
    padding-top: 8px;
    font-size: 14px;
    color: #c0c0c0;
    h1,
    h2 {
      font-weight: normal;
      font-size: 14px;
    }
  }
  .detail-extract {
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
  }
  .detail-notes {
    color: #63cd65;
  }
  .detail-extract-item {
    display: flex;
    align-items: center;
  }
  .extract-text {
    padding-left: 5px;
    color: #fbb040;
  }
  .detail-attrib,
  .detail-lore {
    color: #838080;
    font-size: 12px;
  }
}
</style>
