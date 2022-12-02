<template>
  <div class="dota-item-container main-container">
    <Tabs>
      <TabPane label="商店物品" name="shop">
        <div class="filter">
          <Select v-model="filterValue" style="width: 220px" @on-change="filterEvent">
            <Option v-for="item in shopCategoryList" :key="item.value" :value="item.value">
              {{ item.label }}
            </Option>
          </Select>
        </div>
        <items :data-list="shopList" @show-detail="showDetail" />
      </TabPane>
      <TabPane label="中立物品" name="neutral">
        <items :data-list="neutralList" @show-detail="showDetail" />
      </TabPane>
    </Tabs>
    <item-detail-modal ref="itemDetailModalRef" :item-detail="itemDetail" />
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import loadsh from 'lodash';
import items from './components/items.vue';
import itemDetailModal from './components/itemDetailModal.vue';
import { jsonp } from '@/utils';
import { getDotaItemAPI } from './api';

const initData = ref();
const shopList = ref([]);
const neutralList = ref([]);
const itemDetail = ref({});
const itemDetailModalRef = ref();
const shopCategoryList = ref([]);
const filterValue = ref('all');

let itemData = {};
const getDotaItem = async () => {
  const response = await getDotaItemAPI();
  const itemResult = response.data || {};
  const { basic, neutral, upgrade } = itemResult.result;
  const shopDataList = basic.concat(upgrade);
  shopList.value.push(...shopDataList);
  neutralList.value.push(...neutral);
  // 原始数据
  initData.value = loadsh.cloneDeep(shopList.value);
  getShopCategoryList(shopDataList);
};

const getShopCategoryList = (dataList = []) => {
  const option = dataList.map(item => {
    return {
      label: item.name,
      value: item.name
    };
  });
  shopCategoryList.value.push({ label: '全部', value: 'all' }, ...option);
};

const getDotaItemDetail = () => {
  jsonp({
    url: 'https://www.dota2.com.cn/items/json',
    callback(data) {
      itemData = data;
    }
  });
};

const showDetail = item => {
  const { cd, mc, cost } = itemData.itemdata[item.name];
  itemData.itemdata[item.name].cd = parseInt(cd);
  itemData.itemdata[item.name].mc = parseInt(mc);
  itemData.itemdata[item.name].cost = parseInt(cost);
  itemDetail.value = itemData.itemdata[item.name];
  itemDetailModalRef.value.visible = true;
};

const filterEvent = () => {
  let dataList = initData.value;
  if (filterValue.value !== 'all') {
    dataList = initData.value.filter(item => item.name === filterValue.value);
  }
  shopList.value = [];
  shopList.value.push(...dataList);
};

onMounted(() => {
  getDotaItem();
  getDotaItemDetail();
});
</script>
<style lang="scss">
.dota-item-container {
  padding: 20px;
}
</style>
