<template>
  <div class="hero-detail-container main-container">
    <anchor-link id="background" title="背景"> 背景 </anchor-link>
    <anchor-link id="attribute" title="属性"> 属性 </anchor-link>
    <anchor-link id="skill" title="技能"> 技能 </anchor-link>
    <anchor-link id="talent" title="天赋"> 天赋 </anchor-link>
  </div>
  <anchor :anchor-list="anchorList" />
</template>
<script setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getHeroDetailAPI } from './api';

const route = useRoute();
const anchorList = [
  { title: '背景', name: 'background' },
  { title: '属性', name: 'attribute' },
  { title: '技能', name: 'skill' },
  { title: '天赋', name: 'talent' }
];
const getHeroDetail = async () => {
  const heroId = route.params.id;
  if (!heroId) {
    return;
  }
  const response = await getHeroDetailAPI(heroId);
  const { result } = response.data || {};
  const heroes = result.heroes;
  console.log(heroes);
};

onMounted(() => {
  getHeroDetail();
});
</script>
<style lang="scss">
.hero-detail-container {
  padding: 20px;
}
</style>
