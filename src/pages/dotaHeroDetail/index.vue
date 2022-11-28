<template>
  <page-header :title="`${heroInfo.name_loc || ''} - 资料`" back hidden-breadcrumb @on-back="back" />
  <div class="hero-detail-container main-container">
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
  <anchor :anchor-list="anchorList" />
</template>
<script setup>
import { Message } from 'view-ui-plus';
import { onMounted, ref, getCurrentInstance } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import heroBackground from './components/heroBackground.vue';
import heroBase from './components/heroBase.vue';
import heroSkill from './components/heroSkill.vue';
import { getHeroDetailAPI } from './api';

const route = useRoute();
const router = useRouter();
const heroInfo = ref({});
let timer = null;
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
  timer = setTimeout(() => {
    Message.loading({
      content: '加载中...',
      duration: 0
    });
  }, 0);
  const response = await getHeroDetailAPI(heroId);
  setTimeout(() => {
    Message.destroy();
  }, 500);
  const { result } = response.data || {};
  heroInfo.value = result.heroes;
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
}
</style>
