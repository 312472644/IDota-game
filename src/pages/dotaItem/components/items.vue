<template>
  <div class="items-container">
    <div v-for="item in dataList" :key="item.name" class="items">
      <Divider class="divider" orientation="left" plain>
        {{ item.name }}
      </Divider>
      <div class="items-category-container">
        <div
          v-for="category in item.items"
          :key="category.name"
          class="items-category"
        >
          <Image
            width="100%"
            height="50px"
            :src="`https://www.dota2.com.cn/items/images/${category.img}`"
            lazy
            @click="showDetail(category)"
          >
            <template #placeholder>
              <Spin size="large" fix />
            </template>
          </Image>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const emit = defineEmits(['show-detail']);
defineProps({
  dataList: {
    type: Array,
    default: () => []
  }
});

const showDetail = items => {
  emit('show-detail', items);
};
</script>
<style lang="scss">
.items-container {
  .items-category-container {
    display: flex;
    flex-wrap: wrap;
    .items-category {
      width: calc((100% - 150px) / 16);
      margin-right: 10px;
      margin-bottom: 10px;
      &:nth-of-type(16n) {
        margin-right: 0;
      }
      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }
    }
  }
  .divider.ivu-divider::before {
    width: 1%;
  }
  .ivu-image-img {
    border-radius: 3px;
  }
}
</style>
