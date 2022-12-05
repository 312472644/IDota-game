<template>
  <div class="overview-card">
    <div class="title">当前玩家</div>
    <div class="content">
      <Table class="table" :columns="options.columns" :data="options.tableList">
        <template #name="{ row }">
          <div class="inline-logo-box">
            <span :style="`background-image:url(${row.avatar})`" class="inline-logo"></span>
            <span class="link">{{ row.name }}</span>
            <Icon type="ios-arrow-forward" size="13" color="#2d8cf0" />
          </div>
        </template>
      </Table>
    </div>
  </div>
  <div class="overview-card">
    <div class="title">前队员</div>
    <div class="content">
      <Table class="table" :columns="options.columns" :data="getNotCurrentList">
        <template #name="{ row }">
          <div class="inline-logo-box">
            <span :style="`background-image:url(${row.avatar})`" class="inline-logo"></span>
            <span class="link">{{ row.name }}</span>
            <Icon type="ios-arrow-forward" size="13" color="#2d8cf0" />
          </div>
        </template>
      </Table>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue';
const props = defineProps({
  options: {
    type: Object,
    default: () => {
      return {
        columns: [],
        dataList: [],
        tableList: []
      };
    }
  }
});

const getNotCurrentList = computed(() => {
  return props.options.dataList.filter(item => !item.is_current_team_member);
});
</script>
