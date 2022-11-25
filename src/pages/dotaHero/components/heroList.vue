<template>
  <div v-if="heroList.length > 0" class="hero-list-wrap">
    <div v-for="item in heroList" :key="item.name_loc" class="hero-item">
      <div class="hero-header">
        <img class="hero-logo" :src="item.index_img" />
      </div>
      <div class="hero-foot">
        <img class="hero-attr-logo" :src="item.primaryAttrLogo" />
        <span>{{ item.name_loc }}</span>
      </div>
    </div>
  </div>
  <div v-else class="empty-data">暂无数据</div>
</template>
<script setup>
import { watch, ref } from 'vue';

const props = defineProps({
  heroList: {
    type: Array,
    default: () => []
  }
});
const heroList = ref([]);
watch(
  props,
  newValue => {
    heroList.value = [];
    heroList.value.push(...newValue.heroList);
  },
  {
    deep: true
  }
);
</script>
<style lang="scss">
.hero-list-wrap {
  display: flex;
  flex-wrap: wrap;
  padding: 0 20px 20px 20px;
  .hero-item {
    width: calc((100% - 50px) / 6);
    margin: 0 10px 10px 0;
    border: 1px solid #ebedf2;
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
    transition: transform 0.2s ease-in-out;
    &:nth-of-type(6n) {
      margin: 0 0 10px 0;
    }
    &:hover {
      cursor: pointer;
      box-shadow: 3px 3px 8px #0000004f;
      transform: scale(1.2);
    }
    .hero-header {
      font-size: 0;
      .hero-logo {
        width: 100%;
        height: 100%;
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
      }
    }
    .hero-foot {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 10px;
      background: #fff;
    }
    .hero-attr-logo {
      width: 25px;
      height: 25px;
    }
  }
}
</style>
