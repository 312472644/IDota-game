<template>
  <div class="hero-base-container">
    <div class="hero-base-content">
      <div class="avatar">
        <Image :src="heroInfo.index_img" fit="contain"></Image>
      </div>
      <div class="hero-info">
        <div class="hero-name">
          <Tooltip content="点击查看英雄详情" placement="top">
            <span class="link" @click="toHeroDetail">{{ heroInfo.name_loc }}</span>
            <Icon type="ios-arrow-forward" size="18" color="#2d8cf0" />
          </Tooltip>
        </div>
        <div class="hero-tag">
          <Tag v-for="(item, index) in roleLevelList" :key="index" type="border">{{ item }}</Tag>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { getCacheHeroInfo } from '@/utils';
import { getHeroDetailAPI } from '../api';

const props = defineProps({
  heroId: {
    type: String,
    default: ''
  }
});

const router = useRouter();
const heroInfo = ref({});
const heroDetail = ref({});
const roleLevelList = reactive([]);

const toHeroDetail = () => {
  router.push({ path: `/dota-hero/dota-hero-detail/${props.heroId}` });
};

const getHeroInfo = () => {
  const result = getCacheHeroInfo(props.heroId);
  heroInfo.value = result;
};

const getRoleLevelList = hero => {
  const { role_levels = [], attack_capability } = hero;
  const roleCN = ['核心', '辅助', '爆发', '控制', '打野', '耐久', '逃生', '推进', '先手'];
  const dataList = [];
  role_levels.forEach((item, index) => {
    if (item) {
      dataList.push(roleCN[index]);
    }
  });
  roleLevelList.push(attack_capability === 1 ? '近战' : '远程', ...dataList);
};

const getHeroDetail = async () => {
  const response = await getHeroDetailAPI(props.heroId);
  heroDetail.value = response.data?.result?.heroes;
  getRoleLevelList(heroDetail.value);
};

onMounted(() => {
  getHeroDetail();
  getHeroInfo();
});
</script>
<style lang="scss">
.hero-base-container {
  padding: 20px;
  min-height: 50px;
  .hero-base-content {
    display: flex;
    align-items: center;
    .avatar {
      width: 180px;
      height: 100px;
      .ivu-image-img {
        border-radius: 3px;
      }
    }
    .hero-info {
      margin-left: 20px;
      .hero-name {
        margin-bottom: 5px;
        font-size: 18px;
        cursor: pointer;
      }
    }
    .link {
      color: #2d8cf0;
    }
  }
}
</style>
