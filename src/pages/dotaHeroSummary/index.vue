<template>
  <div class="dota-hero-summary main-container">
    <page-header title="英雄统计" back hidden-breadcrumb @on-back="back" />
    <hero-base :hero-id="heroId" />
    <div class="hero-summary-content">
      <Tabs class="tab-animate tab-center" :animated="false">
        <TabPane label="排名" name="ranking"><ranking :hero-id="heroId" /></TabPane>
        <TabPane label="评估" name="benchmarks">评估</TabPane>
        <TabPane label="近期" name="recent">近期</TabPane>
        <TabPane label="匹配" name="matchups">匹配</TabPane>
        <TabPane label="时长" name="durations">时长</TabPane>
        <TabPane label="玩家" name="players">玩家</TabPane>
        <TabPane label="物品" name="items">物品</TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router';
import heroBase from './components/heroBase.vue';
import ranking from './components/ranking.vue';

const route = useRoute();
const heroId = route.params.heroId;

const back = () => {
  console.log(route);
};
</script>
<style lang="scss">
.dota-hero-summary {
  .hero-summary-content {
    padding: 0 20px 20px 20px;
  }
}
</style>
