<template>
  <div class="overview-card">
    <div class="title">{{ title }}</div>
    <div class="content">
      <Table class="table" :columns="columns" :data="data">
        <template #name="{ row }">
          <div class="inline-logo-box">
            <table-image :src="row.avatar" fit="cover" />
            <span class="link" @click="toPlayerDetail(row)">{{ row.name }}</span>
            <Icon type="ios-arrow-forward" size="13" color="#2d8cf0" />
          </div>
        </template>
      </Table>
    </div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';

defineProps({
  title: {
    type: String,
    default: ''
  },
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
const toPlayerDetail = row => {
  router.push({ path: `/dota-data/dota-player-detail/${row.account_id}` });
};
</script>
