<template>
  <div class="overview-card">
    <div class="title">排名</div>
    <div class="content">
      <Table class="table" :columns="columns" :data="tableList">
        <template #personaname="{ row }">
          <div class="inline-logo-box">
            <table-image :src="row.avatar" />
            <div class="rank-tier-box">
              <div>
                <span class="link" @click="toHeroDetail(row)">{{ row.personaname }}</span>
                <Icon type="ios-arrow-forward" size="13" color="#2d8cf0" />
              </div>
              <div class="rank-tier">{{ row.rankTier }}</div>
            </div>
          </div>
        </template>
      </Table>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive } from 'vue';
import { getRankListAPI } from '../api';

const props = defineProps({
  heroId: {
    type: String,
    default: ''
  }
});

const columns = reactive([
  { title: '排名', type: 'index', width: 200 },
  { title: '名称', key: 'personaname', slot: 'personaname' },
  { title: '分数', key: 'score', width: 200 }
]);
const tableList = reactive([]);

const getRankTier = data => {
  if (data === 80) {
    return '冠绝一世';
  } else if (data > 70 && data < 80) {
    return `超凡入圣[${data - 70}]`;
  }
};

const getRankList = async () => {
  const response = await getRankListAPI(props.heroId);
  const dataList = (response.data.rankings || []).map(item => {
    return {
      ...item,
      rankTier: getRankTier(item.rank_tier),
      score: parseInt(item.score)
    };
  });
  tableList.push(...dataList);
  console.log(response);
};

onMounted(() => {
  getRankList();
});
</script>
<style lang="scss">
.inline-logo-box {
  display: flex;
  .rank-tier-box {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    .rank-tier {
      font-size: 12px;
    }
  }
  .ivu-image-img {
    border-radius: 50%;
  }
}
</style>
