<template>
  <div class="dota-team-box main-container">
    <div class="filter-box">
      <Input v-model="teamName" search placeholder="请输入队名" style="width: 300px" @on-search="searchEvent" />
    </div>
    <Table :loading="loading" :columns="columns" :data="teamList">
      <template #name="{ row }">
        <div class="team">
          <div class="team-logo">
            <table-image :src="row.logo_url || logoURL" />
          </div>
          <div class="team-detail">
            <div class="team-name">
              <span @click="toDetail(row)">{{ row.name }}</span>
              <Icon type="ios-arrow-forward" size="13" color="#2d8cf0" />
            </div>
            <div class="team-date">{{ row.lastMatchDate }}</div>
          </div>
        </div>
      </template>
    </Table>
    <div class="page-container">
      <Page v-model="pageVo.index" :total="pageVo.total" :page-size="pageVo.size" show-total @on-change="pageChange" />
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import dayjs from 'dayjs';
import lodash from 'lodash';
import { getTeamListAPI } from '@/service/common';

import defaultLogo from '@/assets/logo/dota.png';

const loading = ref(false);
const router = useRouter();
const teamName = ref(null);
const teamList = reactive([]);
const logoURL = ref(defaultLogo);
const columns = reactive([
  { title: '排名', key: 'rankNo', width: 80 },
  { title: '名称', key: 'name', slot: 'name' },
  { title: '等级分', key: 'rating' },
  { title: '胜', key: 'wins' },
  { title: '败', key: 'losses' }
]);
const pageVo = reactive({
  index: 1,
  size: 10,
  total: 0
});
let initDataList = [];
let searchList = [];

const getTeamList = async () => {
  loading.value = true;
  const response = await getTeamListAPI();
  const dataList = (response.data || []).map((item, index) => {
    const { rating } = item;
    return {
      ...item,
      rating: parseInt(rating),
      rankNo: index + 1,
      lastMatchDate: dayjs(item.last_match_time * 1000).format('YYYY-MM-DD')
    };
  });
  initDataList = lodash.cloneDeep(dataList);
  teamList.push(...initDataList.slice(0, pageVo.size));
  pageVo.total = dataList.length;
  loading.value = false;
};

const searchEvent = value => {
  pageVo.index = 1;
  const filterValue = value.trim();
  if (!filterValue.trim()) {
    searchList = [];
    pageVo.total = initDataList.length;
    pageChange(1);
    return;
  }
  const resultList = initDataList.filter(item => item.name.indexOf(filterValue) > -1);
  teamList.length = 0;
  teamList.push(...resultList.slice(0, pageVo.size));
  searchList.push(...resultList);
  pageVo.total = resultList.length;
};

const pageChange = pageIndex => {
  teamList.length = 0;
  // 从过滤条件分页或从总数据中分页
  const dataList = searchList.length > 0 ? searchList : initDataList;
  teamList.push(...dataList.slice((pageIndex - 1) * 10, pageIndex * pageVo.size));
};

const toDetail = row => {
  router.push({ path: `/dota-team/dota-team-detail/${row.team_id}` });
};

onMounted(() => {
  getTeamList();
});
</script>
<style lang="scss">
.dota-team-box {
  padding: 20px;
  .filter-box {
    padding-bottom: 10px;
  }
  .team {
    display: flex;
    align-items: center;
  }
  .team-logo {
    .logo {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #333;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
  .team-detail {
    font-size: 12px;
    margin-left: 8px;
    .team-name {
      color: #2d8cf0;
      cursor: pointer;
    }
    .team-date {
      color: #808695;
    }
  }
  .ivu-image-img {
    border-radius: 50%;
    background: #333;
    vertical-align: middle;
    margin-right: 10px;
  }
}
</style>
