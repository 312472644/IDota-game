<template>
  <div class="overview-card">
    <div class="title">使用英雄</div>
    <div class="content">
      <Table class="table" :columns="columns" :data="data">
        <template #hero_id="{ row }">
          <div class="inline-logo-box">
            <table-image :src="row.avatar" fit="cover" />
            <span class="link" @click="toHeroDetail(row)">{{ row.heroCnName }}</span>
            <Icon type="ios-arrow-forward" size="13" color="#2d8cf0" />
          </div>
        </template>
      </Table>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
const props = defineProps({
  columns: {
    type: Array,
    default: () => []
  },
  data: {
    type: Array,
    default: () => []
  }
});

const router = useRouter();
const toHeroDetail = row => {
  router.push({ path: `/dota-data/dota-hero-summary/${row.hero_id}` });
};
</script>
