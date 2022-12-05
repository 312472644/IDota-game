<template>
  <div class="overview-card">
    <div class="title">最近比赛</div>
    <div class="content">
      <Table class="table" :columns="columns" :data="data">
        <template #matchId="{ row }">
          <div class="link" @click="toMatchDetail(row)">
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
          <span :class="{ win: row.winResult, lose: !row.winResult }">
            {{ row.winResult ? '比赛胜利' : '比赛失败' }}
          </span>
        </template>
        <template #opposing="{ row }">
          <div class="inline-logo-box">
            <span :style="`background-image:url(${row.opposing_team_logo})`" class="inline-logo"></span>
            <span class="link" @click="toTeamDetail(row)">{{ row.opposing_team_name }}</span>
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
const toMatchDetail = row => {
  router.push({ path: `/dota-data/dota-match-detail/${row.match_id}` });
  console.log(row);
};

const toTeamDetail = row => {
  router.push({ path: `/dota-team/dota-team-detail/${row.opposing_team_id}` });
};
</script>
