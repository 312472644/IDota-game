<template>
  <record-table :columns="options.columns" :data="hooksValue.tableList" />
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
import recordTable from './recordTable.vue';
const props = defineProps({
  options: {
    type: Object,
    default: () => {
      return {
        dataList: [],
        columns: [],
        tableList: []
      };
    }
  }
});

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
