<template>
  <div class="overview-card">
    <div class="title">最近比赛</div>
    <div class="content">
      <Table class="table" :columns="options.columns" :data="hooksValue.tableList">
        <template #matchId="{ row }">
          <div class="link">
            <span>{{ row.match_id }}</span>
            <Icon type="ios-arrow-forward" size="13" color="#2d8cf0" />
          </div>
          <div class="date">
            <span>{{ row.start_time }}</span>
            <span class="symbol">/</span>
            <span>{{ row.league_name }}</span>
          </div>
        </template>
        <template #duration="{ row }">
          <div class="row-wrap">
            <span>{{ row.duration }}</span>
            <span>{{ row.radiant ? '天辉' : '夜魇' }}</span>
          </div>
        </template>
        <template #radiant_win="{ row }">
          <span :class="{ 'win-result': true, win: row.winResult, lose: !row.winResult }">
            {{ row.winResult ? '比赛胜利' : '比赛失败' }}
          </span>
        </template>
        <template #opposing="{ row }">
          <div class="inline-logo-box">
            <span :style="`background-image:url(${row.opposing_team_logo})`" class="inline-logo"></span>
            <span class="link">{{ row.opposing_team_name }}</span>
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
