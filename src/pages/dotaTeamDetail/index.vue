<template>
  <page-header title="队伍详情" back hidden-breadcrumb @on-back="back" />
  <div class="dota-team-detail main-container">
    <team-background :team-id="teamId" />
    <div class="team-content">
      <Tabs class="tab-animate" :animated="false" @on-click="tabClick">
        <TabPane label="概观" name="overview"><overview ref="overviewRef" :team-id="teamId" /></TabPane>
        <TabPane label="近期战绩" name="record"><record :options="overviewRef.matchOptions" /></TabPane>
        <TabPane label="英雄" name="heroes"><heroes :options="overviewRef.heroOptions" /></TabPane>
        <TabPane label="玩家" name="players"><players :options="overviewRef.playersOptions" /></TabPane>
      </Tabs>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import teamBackground from './components/teamBackground.vue';
import overview from './components/overview.vue';
import heroes from './components/heroes.vue';
import players from './components/players.vue';
import record from './components/record.vue';

const route = useRoute();
const router = useRouter();
const teamId = ref(route.params.id);
const overviewRef = ref({});

const back = () => {
  router.push({ path: '/dota-team' });
};

const tabClick = () => {
  document.documentElement.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
</script>
<style lang="scss">
.dota-team-detail {
  .team-content {
    padding: 0 20px 20px 20px;
  }
  .overview-card {
    margin-bottom: 10px;
    .title {
      font-size: 14px;
      padding-bottom: 10px;
    }
  }
}
</style>
