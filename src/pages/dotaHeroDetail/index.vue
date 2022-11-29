<template>
  <page-header title="英雄资料" back hidden-breadcrumb @on-back="back" />
  <div class="hero-detail-container main-container">
    <Spin :show="loading" class="page-loading" size="small">
      <Icon type="ios-loading" size="18" class="spin-icon-load"></Icon>
      <div>加载中...</div>
    </Spin>
    <div v-show="!loading">
      <anchor-link id="background" title="背景">
        <hero-background :data="heroInfo" />
      </anchor-link>
      <anchor-link id="attribute" title="属性">
        <hero-base :data="heroInfo" />
      </anchor-link>
      <anchor-link id="skill" title="技能">
        <hero-skill />
      </anchor-link>
      <anchor-link id="talent" title="天赋"> 天赋 </anchor-link>
    </div>
  </div>
  <anchor :anchor-list="anchorList" />
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import heroBackground from './components/heroBackground.vue';
import heroBase from './components/heroBase.vue';
import heroSkill from './components/heroSkill.vue';
import { getHeroDetailAPI } from './api';

const route = useRoute();
const router = useRouter();
const heroInfo = ref({});
const loading = ref(true);

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
  heroInfo.value = result.heroes;
  setTimeout(() => {
    loading.value = false;
  }, 1000);
  console.log(heroInfo.value);
};

const back = () => {
  router.replace({ path: '/dota-hero' });
};

onMounted(() => {
  getHeroDetail();
});
</script>
<style lang="scss">
.hero-detail-container {
  padding: 20px;
  min-height: 80px;
}
</style>
