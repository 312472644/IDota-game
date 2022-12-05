<template>
  <div class="overview-box">
    <page-loading :show="loading" />
    <div v-if="!loading" class="content-box">
      <div class="left">
        <div class="overview-card">
          <div class="title">最近比赛</div>
          <div class="content">
            <Table class="table" :columns="matchOptions.columns" :data="matchOptions.tableList">
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
                <span :class="{ win: row.winResult, lose: !row.winResult }">
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
      </div>
      <div class="right">
        <div class="overview-card">
          <div class="title">当前玩家</div>
          <div class="content">
            <Table class="table" :columns="playersOptions.columns" :data="playersOptions.tableList">
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
          <div class="title">使用英雄</div>
          <div class="content">
            <Table class="table" :columns="heroOptions.columns" :data="heroOptions.tableList">
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
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue';
import dayjs from 'dayjs';
import { getTeamMatchListAPI, getTeamPlayersAPI, getTeamHeroesAPI } from '../api';
import { formatTimeStampMS, getCacheHeroInfo } from '@/utils';

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

const getTeamMatchList = async () => {
  const response = await getTeamMatchListAPI(props.teamId);
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

const getPlayerList = async () => {
  const response = await getTeamPlayersAPI(props.teamId);
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

const getHeroList = async () => {
  const response = await getTeamHeroesAPI(props.teamId);
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

const init = async () => {
  loading.value = true;
  await getTeamMatchList();
  await getPlayerList();
  await getHeroList();
  setTimeout(() => {
    loading.value = false;
  }, 1000);
};

defineExpose({
  playersOptions,
  heroOptions,
  matchOptions
});

onMounted(() => {
  init();
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
