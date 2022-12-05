<template>
  <div class="overview-card">
    <div class="title">使用英雄</div>
    <div class="content">
      <Table class="table" :columns="options.columns" :data="hooksValue.tableList">
        <template #hero_id="{ row }">
          <div class="inline-logo-box">
            <img :src="row.avatar" class="inline-logo" />
            <span class="link">{{ row.heroCnName }}</span>
            <Icon type="ios-arrow-forward" size="13" color="#2d8cf0" />
          </div>
        </template>
      </Table>
    </div>
  </div>
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

const hooksValue = reactive({
  pageVO: {},
  tableList: [],
  sizeChange: () => {},
  pageChange: () => {}
});

const callback = (dataList = []) => {
  const { pageVO, tableList, pageChange } = usePageQuery(dataList, 10);
  hooksValue.pageVO = pageVO;
  hooksValue.tableList = tableList;
  hooksValue.pageChange = pageChange;
};

watch(props, newValue => {
  if (newValue.options.dataList.length > 0) {
    callback(newValue.options.dataList);
  }
});
</script>
