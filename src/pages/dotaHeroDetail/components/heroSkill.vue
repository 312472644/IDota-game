<template>
  <div class="hero-skill-container">
    <!--技能视频介绍-->
    <div class="skill-video">
      <div class="video-box">
        <Spin :show="videoLoad" fix class="spin">
          <Icon type="ios-loading" size="18" class="spin-icon-load"></Icon>
          <div>加载中...</div>
        </Spin>
        <video
          v-show="!videoLoad"
          autoplay="autoplay"
          muted="muted"
          loop="loop"
          :src="currentAbility.ability?.video_mp4"
        ></video>
      </div>
      <div class="skill-list-box">
        <div class="skill-item talent" @click="toggleVisible"></div>
        <div
          v-for="(item, index) in abilityList"
          :key="item"
          :class="{
            'skill-item': true,
            shard: item.ability_type === 'shard',
            scepter: item.ability_type === 'scepter'
          }"
          @click="changeEvent(item, index)"
        >
          <Image
            :class="{ 'skill-logo': true, selected: currentAbility.index === index }"
            width="60px"
            height="60px"
            lazy
            :src="item.img"
          >
            <template #placeholder> <Spin size="small" fix /> </template>
          </Image>
        </div>
      </div>
    </div>
    <!--技能描述-->
    <div class="skill-desc-box">
      <div class="skill-loc">
        <div class="left">
          <img :src="currentAbility.ability.img" />
        </div>
        <div class="right">
          <div class="skill-name">{{ currentAbility.ability.name_loc }}</div>
          <div v-if="currentAbility.ability.ability_type" class="special-mark">{{ getUpgradeName }}</div>
          <div class="skill-desc" v-html="formatSpecialValue()"></div>
        </div>
      </div>
      <!--技能基本信息-->
      <div class="skill-base-box">
        <!--技能数值-->
        <div v-if="skillValues.length" role="skill-number">
          <Row v-for="(item, index) in skillValues" :key="index" class="row">
            <Col :span="24">
              <label class="label not-colon" v-html="item.label"></label>
              <label class="value">{{ item.value }}</label>
            </Col>
          </Row>
        </div>
        <div v-if="showBottomValue" class="bottom-values">
          <div class="bottom-item">
            <div class="cool-down"></div>
            <div class="cool-down-value">{{ currentAbility.ability?.cooldowns?.join(' / ') }}</div>
          </div>
          <div class="bottom-item">
            <div class="cost"></div>
            <div class="cost-value">{{ currentAbility.ability?.mana_costs?.join(' / ') }}</div>
          </div>
        </div>
        <div v-if="currentAbility.ability.lore_loc" class="lore">{{ currentAbility.ability.lore_loc }}</div>
      </div>
    </div>
  </div>
  <talent-dialog ref="talentDialogRef" :data-list="talentValueList" />
</template>
<script setup>
import { ref, watch, computed } from 'vue';
import lodash from 'lodash';
import talentDialog from './talentDialog.vue';
const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  }
});

const heroInfo = ref({});
const abilityList = ref([]);
const videoLoad = ref(false);
const currentAbility = ref({
  index: 0,
  ability: {}
});
const talentValueList = ref([]);
const talentDialogRef = ref();

// 获取升级技能名称
const getUpgradeName = computed(() => {
  const { ability_is_granted_by_scepter, ability_is_granted_by_shard, ability_type } = currentAbility.value.ability;
  if (ability_is_granted_by_scepter) {
    return '神杖提供新技能';
  }
  if (ability_is_granted_by_shard) {
    return '魔晶提供新技能';
  }
  if (ability_type) {
    return ability_type === 'shard' ? '魔晶技能升级' : '神杖技能升级';
  }
  return '';
});

const getAbilities = () => {
  const { abilities } = heroInfo.value;
  // 魔晶技能
  const shard = lodash.cloneDeep(abilities.find(item => item.ability_has_shard || item.ability_is_granted_by_shard));
  shard.ability_type = 'shard';
  // 神杖技能
  const scepter = lodash.cloneDeep(
    abilities.find(item => item.ability_has_scepter || item.ability_is_granted_by_scepter)
  );
  scepter.ability_type = 'scepter';
  // 需要过滤掉魔晶或神杖生成的技能,否则导致技能重复
  const filterList = abilities.filter(item => !item.ability_is_granted_by_scepter && !item.ability_is_granted_by_shard);
  abilityList.value.push(...filterList, shard, scepter);
  currentAbility.value = {
    index: 0,
    ability: abilityList.value[0]
  };
};

const getSpecialAbility = name => {
  const { special_values = [] } = currentAbility.value.ability || {};
  const result = special_values.find(item => item.name === name);
  return (result?.values_float || []).map(item => parseFloat(item).toFixed(1)).join();
};

// 转换文本中的动态参数
const formatSpecialValue = () => {
  const reg = /(%)(.*?)(%)/g;
  const ability = currentAbility.value.ability;
  const abilityType = ability.ability_type;
  let result = null;
  // 魔晶描述
  if (abilityType === 'shard') {
    result = ability.shard_loc;
  }
  // 神杖描述
  else if (abilityType === 'scepter') {
    result = ability.scepter_loc;
  }
  // 兜底
  if (!result) {
    result = ability.desc_loc;
  }
  if (result && reg.test(result)) {
    const dynamicNameList = result.match(reg);
    dynamicNameList.forEach(item => {
      const replaceName = item;
      const dynamicName = item.replaceAll('%', '');
      const dynamicValue = getSpecialAbility(dynamicName);
      result = result.replace(replaceName, dynamicValue);
    });
  }
  return result;
};

// 获取天赋技能中参数值
const getTalentValue = (data, dynamicName) => {
  let value = '';
  const { abilities } = heroInfo.value;
  // 从talent数组中去查找
  if (dynamicName === 'value') {
    value = data.special_values.find(item => item.name === 'value')?.values_float.join('');
  } else {
    // 从abilities技能列表去查找
    abilities.forEach(item => {
      item.special_values.forEach(subItem => {
        if (`bonus_${subItem.name}` === dynamicName && subItem.bonuses.length > 0) {
          value = subItem?.bonuses[0]?.value;
        }
      });
    });
  }
  return value?.toString()?.indexOf('.') > -1 ? parseFloat(value).toFixed(1) : value;
};

// 获取天赋中文本动态参数
const getTalentText = (data, text, dynamicNameList = []) => {
  const reg = /({s:)(.*?)(})/;
  let result = text;
  dynamicNameList.forEach(item => {
    const regResult = item.match(reg);
    const replaceName = regResult[0];
    const dynamicName = regResult[2];
    const dynamicValue = getTalentValue(data, dynamicName);
    result = result.replace(replaceName, dynamicValue);
  });
  return result;
};

const getTalentGroup = talentList => {
  const dataList = [];
  let groupIndex = 10;
  for (let i = 0; i < talentList.length; i++) {
    if (i % 2 === 0) {
      dataList.push({
        level: groupIndex,
        dataList: talentList.slice(i, i + 2)
      });
      groupIndex += 5;
    }
  }
  talentValueList.value.push(...dataList.reverse());
};

const getTalentList = data => {
  const { talents = [] } = data;
  const talentList = talents.map(item => {
    const { name_loc } = item;
    const dynamicNameList = name_loc.match(/({).*?(})/g);
    if (dynamicNameList) {
      item.talentText = getTalentText(item, name_loc, dynamicNameList);
    } else {
      item.talentText = name_loc;
    }
    return item;
  });
  getTalentGroup(talentList);
};

// 获取技能数值
const skillValues = computed(() => {
  const {
    special_values = [],
    ability_has_shard,
    ability_has_scepter,
    ability_type
  } = currentAbility.value?.ability || {};
  // 神杖、魔晶升级技能不需要技能数值
  if (ability_type && (ability_has_shard || ability_has_scepter)) {
    return [];
  }
  const dataList = [];
  special_values.forEach(item => {
    const { heading_loc, values_float = [], is_percentage } = item;
    if (heading_loc) {
      const floatValues = values_float.map(item => parseFloat(item).toFixed(1));
      dataList.push({
        label: heading_loc,
        value: is_percentage ? floatValues.map(item => `${item}%`).join(' / ') : floatValues.join(' / ')
      });
    }
  });
  return dataList;
});

// 是否展示技能CD和蓝耗
const showBottomValue = computed(() => {
  const { cooldowns = [], mana_costs = [], ability_has_shard } = currentAbility.value?.ability || {};
  if (ability_has_shard) {
    return false;
  }
  return cooldowns.some(item => item > 0) || mana_costs.some(item => item > 0);
});

const watchCallback = newValue => {
  heroInfo.value = lodash.cloneDeep(newValue.data);
  getAbilities();
  getTalentList(heroInfo.value);
};

const changeEvent = (item, index) => {
  videoLoad.value = true;
  currentAbility.value = {
    index,
    ability: item
  };
  setTimeout(() => {
    videoLoad.value = false;
  }, 500);
};

const toggleVisible = () => {
  talentDialogRef.value.visible = true;
};

watch(props, newValue => {
  watchCallback(newValue);
});
</script>
<style lang="scss">
@mixin upgradeLogo($url) {
  content: '';
  background-image: url($url);
  position: absolute;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
}
.hero-skill-container {
  display: flex;
  .skill-video {
    flex: 1;
    .ivu-spin-fix {
      width: 100%;
      background: #fff;
    }
    .video-box {
      position: relative;
      height: 345px;
    }
    video {
      width: 100%;
      border-radius: 3px;
    }
    .skill-list-box {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      margin-top: 8px;
      .skill-item {
        position: relative;
        width: 60px;
        height: 60px;
        border-radius: 3px;
        margin: 0 4px 8px 4px;
        transition: transform 0.2s ease-in-out;
        .ivu-image-img {
          border-radius: 3px;
        }
        .skill-logo {
          filter: saturate(0) brightness(0.6);
          &.selected {
            filter: none;
          }
        }
        &:hover {
          cursor: pointer;
          transform: scale(1.1);
        }
        &.shard {
          .skill-logo::after {
            @include upgradeLogo('../../../assets/images/aghs_shard.png');
          }
        }
        &.scepter {
          .skill-logo::after {
            @include upgradeLogo('../../../assets/images/aghs_scepter.png');
          }
        }
      }
    }
  }
  .skill-desc-box {
    flex: 1;
    margin-left: 16px;
    .skill-loc {
      display: flex;
      background: #f8f8f9;
      padding: 10px;
      .left {
        > img {
          width: 80px;
          height: 80px;
          border-radius: 3px;
        }
      }
      .right {
        margin-left: 12px;
        .skill-name {
          font-size: 18px;
          font-weight: bold;
        }
        .skill-desc {
          font-size: 14px;
        }
      }
    }
    .skill-base-box {
      padding: 0 10px 10px 10px;
      background: #f8f8f9;
      .row {
        margin-bottom: 2px;
      }
      .label {
        font-size: 13px;
        vertical-align: middle;
        &:not(.not-colon)::after {
          padding: 0 2px;
          content: ':';
        }
      }
      .value {
        font-size: 13px;
        vertical-align: middle;
      }
    }
    .bottom-values {
      display: flex;
      justify-content: space-between;
      padding-top: 10px;
    }
    .bottom-item {
      display: flex;
      align-content: center;
      .cool-down-value,
      .cost-value {
        padding-left: 5px;
      }
    }
    .lore {
      margin: 10px 0;
      padding: 10px;
      background: #ededed;
      border-radius: 3px;
      font-style: italic;
    }
  }
  .special-mark {
    display: inline-block;
    color: #fff;
    background: #808695;
    margin: 5px 0;
    padding: 3px 6px;
    border-radius: 3px;
  }
  .talent {
    background: #2d2e2f;
    background-image: url(/src/assets/images/talent.svg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 100% 100%;
  }
}
</style>
