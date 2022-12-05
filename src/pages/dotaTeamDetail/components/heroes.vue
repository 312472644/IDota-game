<template>
  <heroes-table :columns="tableColumns" :data="hooksValue.tableList" />
  <div class="page-container">
    <Page
      v-model="hooksValue.pageVO.index"
      :total="hooksValue.pageVO.total"
      :page-size="hooksValue.pageVO.size"
      show-sizer
      show-total
      @on-page-size-change="hooksValue.sizeChange"
      @on-change="hooksValue.pageChange"
    />
  </div>
</template>
<script setup>
import { reactive, watch } from 'vue';
import { usePageQuery } from '@/hooks';
import heroesTable from './heroesTable.vue';

const props = defineProps({
  options: {
    type: Object,
    default: () => {
      return {
        columns: [],
        tableList: []
      };
    }
  }
});

const tableColumns = reactive([
  { title: '击杀英雄', key: 'hero_id', slot: 'hero_id' },
  { title: '游戏次数', key: 'games_played', width: '200px' },
  { title: '胜率', key: 'winRate', width: '200px' }
]);
const hooksValue = reactive({
  pageVO: {},
  tableList: [],
  sizeChange: () => {},
  pageChange: () => {}
});

const callback = (dataList = []) => {
  const { pageVO, tableList, pageChange, sizeChange } = usePageQuery(dataList, 10);
  hooksValue.pageVO = pageVO;
  hooksValue.tableList = tableList;
  hooksValue.pageChange = pageChange;
  hooksValue.sizeChange = sizeChange;
};

watch(props, newValue => {
  if (newValue.options.dataList.length > 0) {
    callback(newValue.options.dataList);
  }
});
</script>
