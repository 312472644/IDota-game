<template>
  <players-table title="当前玩家" :columns="tableColumns" :data="options.tableList" />
  <players-table title="前队友" :columns="tableColumns" :data="getNotCurrentList" />
</template>
<script setup>
import { computed, reactive } from 'vue';
import playersTable from './playersTable.vue';

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

const tableColumns = reactive([
  { title: '名称', key: 'name', slot: 'name' },
  { title: '游戏次数', key: 'games_played', width: '200px' },
  { title: '胜率', key: 'winRate', width: '200px' }
]);
const getNotCurrentList = computed(() => {
  return props.options.dataList.filter(item => !item.is_current_team_member);
});
</script>
