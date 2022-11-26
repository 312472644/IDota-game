<template>
  <div class="dota-item-container">
    <Tabs value="name1">
      <TabPane label="商店物品" name="shop">
        <items :data-list="shopList" />
      </TabPane>
      <TabPane label="中立物品" name="name2">
        <items :data-list="neutralList" />
      </TabPane>
    </Tabs>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import items from './components/items.vue';
import { jsonp } from '@utils';
import { getDotaItemAPI } from './api';

const shopList = ref([]);
const neutralList = ref([]);
const getDotaItem = async () => {
  const response = await getDotaItemAPI();
  const itemResult = response.data || {};
  const { basic, neutral, upgrade } = itemResult.result;
  const shopDataList = basic.concat(upgrade);
  shopList.value.push(...shopDataList);
  neutralList.value.push(...neutral);
};

const getDotaItemDetail = () => {
  jsonp({
    url: 'https://www.dota2.com.cn/items/json',
    callback(data) {
      console.log(data);
    }
  });
};

onMounted(() => {
  getDotaItem();
  getDotaItemDetail();
});
</script>
<style lang="scss">
.dota-item-container {
  padding: 20px;
  background: #fff;
  border: 1px solid #ebedf2;
}
</style>
