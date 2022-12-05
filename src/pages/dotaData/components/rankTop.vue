<template>
  <Card class="rank-box" title="天梯排名Top10" :bordered="false" :dis-hover="true">
    <template #extra>
      <span class="href">更多</span>
    </template>
    <page-loading :show="loading" />
    <div v-if="!loading">
      <div class="sub-title">Elo等级分排名 k = 32, init = 1000</div>
      <div class="rank">
        <div v-for="(item, index) in rankList" :key="index" class="rank-item" @click="toDetail(item)">
          <div class="rank-no">{{ item.rank }}</div>
          <Image class="avatar" width="60px" height="60px" :src="item?.steam_id_info?.avatar_url">
            <template #error>
              <img src="../../../assets/logo/dota.png" />
            </template>
          </Image>
          <div class="name">{{ item.name }}</div>
        </div>
      </div>
    </div>
  </Card>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue';
import { Message } from 'view-ui-plus';
import { getRankListAPI } from '@/service/proxy-request';

const loading = ref(false);
const rankList = reactive([]);

const getRankList = async () => {
  loading.value = true;
  const response = await getRankListAPI();
  const dataList = response.data?.result || [];
  rankList.push(...dataList.slice(0, 10));
  setTimeout(() => {
    loading.value = false;
  }, 1000);
};

const toDetail = data => {
  const { steam_id_info } = data;
  if (!steam_id_info?.avatar_url) {
    Message.info({
      content: '暂时无该玩家信息',
      duration: 3
    });
  }

  console.log(data);
};

onMounted(() => {
  getRankList();
});
</script>
<style lang="scss">
.rank-box {
  .rank {
    display: flex;
    justify-content: space-between;
    .rank-item {
      text-align: center;
      width: 110px;
      background-color: #f8f8f9;
      border: 1px solid #ebedf2;
      border-radius: 4px;
      transition: transform 0.2s ease-in-out;
      &:hover {
        cursor: pointer;
        transform: scale(1.1);
      }
    }
    .avatar {
      margin-top: 10px;
      .ivu-image-img {
        border-radius: 50%;
      }
    }
    .name {
      font-size: 12px !important;
      margin-bottom: 5px;
    }
    .ivu-image-error {
      position: relative;
    }
  }
}
</style>
