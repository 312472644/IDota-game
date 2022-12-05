import { reactive, toRefs } from 'vue';
import lodash from 'lodash';

/**
 * 前端表格分页
 *
 * @param {*} [dataList=[]] 数据列表总数
 * @param {*} [size=10] 分页大小
 * @return {*}
 */
const usePageQuery = (dataList = [], size = 10) => {
  const pageVO = reactive({
    index: 1,
    size,
    total: dataList.length
  });

  // 前端过滤总列表
  const initDataList = reactive(lodash.cloneDeep(dataList));
  // 前端表格展示列表
  const tableList = reactive(initDataList.slice(0, pageVO.size));

  const pageChange = index => {
    const start = (index - 1) * pageVO.size;
    const end = index * pageVO.size;
    const list = initDataList.slice(start, end);
    tableList.length = 0;
    tableList.push(...list);
  };

  const sizeChange = size => {
    pageVO.size = size;
    const list = initDataList.slice(0, size);
    tableList.length = 0;
    tableList.push(...list);
  };

  return {
    pageVO,
    tableList,
    pageChange,
    sizeChange
  };
};

export { usePageQuery };
