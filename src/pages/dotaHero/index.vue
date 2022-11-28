<template>
  <div class="main-container">
    <condition @query="queryEvent" />
    <hero-list :hero-list="heroDataList" />
  </div>
  <scroll-top />
</template>
<script setup>
import { onMounted, ref } from 'vue';
import condition from './components/condition.vue';
import heroList from './components/heroList.vue';
import { getHeroListAPI } from './api';
import lodash from 'lodash';
import { heroMap } from '@utils/map.js';

const heroInitList = [];
const heroDataList = ref([]);

const getHeroList = async () => {
  const response = await getHeroListAPI();
  const { result } = response.data || {};
  if (result?.heroes) {
    result.heroes = result?.heroes.map(item => {
      return {
        ...item,
        primaryAttrLogo: heroMap[item.primary_attr].primaryAttrLogo
      };
    });
    heroDataList.value.push(...result.heroes);
    heroInitList.push(...lodash.cloneDeep(heroDataList.value));
  }
};

const queryEvent = queryParam => {
  let dataList = lodash.cloneDeep(heroInitList);
  const { attr, complexity, heroName } = queryParam;
  // 属性筛选
  if (attr > -1) {
    dataList = dataList.filter(item => item.primary_attr === attr);
  }
  // 复杂度筛选
  if (complexity > -1) {
    dataList = dataList.filter(item => item.complexity === complexity);
  }
  // 名称筛选
  if (heroName) {
    dataList = dataList.filter(item => item.name_loc === heroName);
  }
  heroDataList.value = [];
  heroDataList.value.push(...dataList);
};

onMounted(() => {
  getHeroList();
});
</script>
