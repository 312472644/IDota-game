<template>
  <div class="hero-background-container">
    <div class="left">
      <div class="hero-name">{{ heroInfo.name_loc }}</div>
      <div class="hero-desc-loc">{{ heroInfo.npe_desc_loc }}</div>
      <div v-if="!showBioLoc" class="hero-hype-loc" v-html="heroInfo.hype_loc"></div>
      <div v-else class="hero-bio-loc" v-html="heroInfo.bio_loc"></div>
      <a class="hero-link" @click="toggle">
        {{ showBioLoc ? '关闭背景故事' : '阅读完整背景故事' }}
      </a>
      <div class="hero-label">
        <Tag type="border" :color="attackValue.color">{{ attackValue.label }}</Tag>
        <Tag type="border" :color="primaryValue.color">{{ primaryValue.label }}</Tag>
        <Tag type="border" :color="complexityValue.color">{{ complexityValue.label }}</Tag>
      </div>
    </div>
    <div class="right">
      <video
        :poster="heroInfo.top_video"
        :src="heroInfo.top_video"
        autoplay="autoplay"
        preload="auto"
        muted="muted"
        loop="loop"
        class="hero-video"
      ></video>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue';
import lodash from 'lodash';
const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  }
});

const showBioLoc = ref(false);
const heroInfo = ref({});
const primaryValue = ref({});
const complexityValue = ref({});
const attackValue = ref({});

const toggle = () => {
  showBioLoc.value = !showBioLoc.value;
};

const getLabelColor = (type, typeValue) => {
  const typeMap = {
    attack_capability: {
      1: { label: '近战', color: 'default' },
      2: { label: '远程', color: 'default' }
    },
    complexity: {
      1: { label: '简单', color: 'default' },
      2: { label: '中等', color: 'default' },
      3: { label: '困难', color: 'default' }
    },
    primary_attr: {
      0: { label: '力量', color: 'default' },
      1: { label: '敏捷', color: 'default' },
      2: { label: '智力', color: 'default' }
    }
  };
  return typeMap[type][typeValue] || {};
};

const watchCallback = newValue => {
  heroInfo.value = lodash.cloneDeep(newValue.data);
  const { primary_attr, complexity, attack_capability, hype_loc } = heroInfo.value;
  heroInfo.value.hype_loc = hype_loc.replaceAll(/[<b>]|[</b>]/g, '');
  primaryValue.value = getLabelColor('primary_attr', primary_attr);
  complexityValue.value = getLabelColor('complexity', complexity);
  attackValue.value = getLabelColor('attack_capability', attack_capability);
};

watch(props, newValue => {
  watchCallback(newValue);
});
</script>
<style lang="scss">
.hero-background-container {
  display: flex;
  position: relative;
  .left {
    width: calc(100% - 200px);
  }
  .right {
    position: absolute;
    top: 0;
    right: 0;
    transform: translateY(-30px);
  }
  .hero-name {
    color: #17233d;
    font-size: 20px;
  }
  .hero-desc-loc {
    color: #808695;
    padding: 8px 0;
  }
  .hero-bio-loc {
    font-size: 13px;
  }
  .hero-hype-loc {
    font-size: 13px;
    font-weight: normal;
  }
  .hero-video {
    width: 200px;
  }
  .hero-link {
    padding-bottom: 8px;
    display: block;
  }
}
</style>
