<template>
  <Row class="condition-wrap">
    <Col class="col-item" span="6">
      <Select v-model="queryParam.attr" @on-change="triggerQuery">
        <Option v-for="item in attrList" :key="item.value" :value="item.value">
          {{ item.label }}
        </Option>
      </Select>
    </Col>
    <Col class="col-item" span="6">
      <Select v-model="queryParam.complexity" @on-change="triggerQuery">
        <Option
          v-for="item in complexityList"
          :key="item.value"
          :value="item.value"
        >
          {{ item.label }}
        </Option>
      </Select>
    </Col>
    <Col class="col-item" span="6">
      <Input
        v-model="queryParam.heroName"
        search
        placeholder="输入英雄名称"
        @on-search="triggerQuery"
      />
    </Col>
  </Row>
</template>
<script setup>
import { reactive, ref } from 'vue';

const emits = defineEmits(['query']);
const queryParam = reactive({
  attr: -1,
  complexity: -1,
  heroName: ''
});
const attrList = ref([
  { label: '全部属性', value: -1 },
  { label: '力量', value: 0 },
  { label: '敏捷', value: 1 },
  { label: '智力', value: 2 }
]);
const complexityList = ref([
  { label: '全部难度', value: -1 },
  { label: '简单', value: 1 },
  { label: '中等', value: 2 },
  { label: '困难', value: 3 }
]);

const triggerQuery = () => {
  emits('query', queryParam);
};

defineExpose({
  queryParam
});
</script>
<style lang="scss">
.condition-wrap {
  padding: 20px;
  .col-item {
    display: flex;
    align-items: center;
    margin-right: 16px;
  }
  .col-text {
    display: inline-block;
    white-space: nowrap;
    padding-right: 8px;
  }
}
</style>
