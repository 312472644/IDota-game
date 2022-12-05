<template>
  <div class="overview-box">
    <page-loading :show="loading" />
    <div v-if="!loading" class="content-box">
      <div class="left">
        <record-table :columns="matchOptions.columns" :data="matchOptions.tableList" />
      </div>
      <div class="right">
        <players-table title="当前玩家" :columns="playersOptions.columns" :data="playersOptions.tableList" />
        <heroes-table :columns="heroOptions.columns" :data="heroOptions.tableList" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue';
import dayjs from 'dayjs';
import { getTeamMatchListAPI, getTeamPlayersAPI, getTeamHeroesAPI } from '../api';
import { formatTimeStampMS, getCacheHeroInfo } from '@/utils';

import recordTable from './recordTable.vue';
import heroesTable from './heroesTable.vue';
import playersTable from './playersTable.vue';

const props = defineProps({
  teamId: {
    type: String,
    default: ''
  }
});

const loading = ref(false);
const matchOptions = reactive({
  dataList: [],
  tableList: [],
  columns: [
    { title: '比赛ID', key: 'matchId', slot: 'matchId' },
    { title: '时长', key: 'duration', slot: 'duration', width: '80px' },
    { title: '胜败', key: 'radiant_win', slot: 'radiant_win', width: '120px' },
    { title: '敌方', key: 'opposing', slot: 'opposing', width: '300px' }
  ]
});

const playersOptions = reactive({
  dataList: [],
  tableList: [],
  columns: [
    { title: '名称', key: 'name', slot: 'name' },
    { title: '游戏次数', key: 'games_played', width: '100px' },
    { title: '胜率', key: 'winRate', width: '70px' }
  ]
});

const heroOptions = reactive({
  dataList: [],
  tableList: [],
  columns: [
    { title: '击杀英雄', key: 'hero_id', slot: 'hero_id' },
    { title: '游戏次数', key: 'games_played', width: '100px' },
    { title: '胜率', key: 'winRate', width: '70px' }
  ]
});

const computedWin = data => {
  const { radiant, radiant_win } = data;
  if (radiant) {
    return radiant_win;
  }
  return !radiant_win;
};

const getTeamMatchList = async teamId => {
  const response = await getTeamMatchListAPI(teamId);
  const dataList = (response.data || []).map(item => {
    const { start_time, duration } = item;
    return {
      ...item,
      start_time: dayjs(start_time * 1000).format('YYYY-MM-DD'),
      winResult: computedWin(item),
      duration: formatTimeStampMS(duration)
    };
  });
  matchOptions.tableList.push(...dataList.slice(0, 20));
  matchOptions.dataList.push(...dataList);
};

const getPlayerList = async teamId => {
  const response = await getTeamPlayersAPI(teamId);
  const dataList = (response.data || []).map(item => {
    const { account_id, wins, games_played } = item;
    return {
      ...item,
      avatar: `https://www.opendota.com/assets/images/dota2/players/${account_id}.png`,
      winRate: `${((wins / games_played) * 100).toFixed(0)}%`
    };
  });
  playersOptions.tableList.push(...dataList.filter(item => item.is_current_team_member));
  playersOptions.dataList.push(...dataList);
};

const getHeroList = async teamId => {
  const response = await getTeamHeroesAPI(teamId);
  const dataList = (response.data || []).map(item => {
    const { wins, games_played } = item;
    const heroCN = getCacheHeroInfo(item.hero_id);
    return {
      ...item,
      heroCnName: heroCN.name_loc,
      avatar: heroCN.index_img,
      winRate: `${((wins / games_played) * 100).toFixed(0)}%`
    };
  });
  heroOptions.tableList.push(...dataList.slice(0, 10));
  heroOptions.dataList.push(...dataList);
};

const reset = () => {
  matchOptions.tableList = [];
  matchOptions.dataList = [];
  heroOptions.tableList = [];
  heroOptions.dataList = [];
  playersOptions.tableList = [];
  playersOptions.dataList = [];
};

const init = async teamId => {
  loading.value = true;
  reset();
  await getTeamMatchList(teamId);
  await getPlayerList(teamId);
  await getHeroList(teamId);
  setTimeout(() => {
    loading.value = false;
  }, 1000);
};

defineExpose({
  init,
  playersOptions,
  heroOptions,
  matchOptions
});

onMounted(() => {
  init(props.teamId);
});
</script>
<style lang="scss">
.overview-box {
  min-height: 40px;
  .content-box {
    display: flex;
  }
  .left {
    margin-right: 15px;
    width: calc(100% - 365px);
  }
  .right {
    display: flex;
    flex-direction: column;
    width: 350px;
  }
}
</style>
