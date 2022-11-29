<template>
  <div id="container" style="height: 180px"></div>
</template>
<script setup>
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import { onMounted, watch } from 'vue';
HighchartsMore(Highcharts);

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  }
});

const loadChart = data => {
  Highcharts.chart('container', {
    chart: {
      polar: true,
      type: 'area'
    },
    plotOptions: {
      area: {
        lineWidth: 1,
        color: '#e6f5ff',
        lineColor: '#0c9dfc',
        marker: {
          enabled: false,
          radius: 0
        }
      }
    },
    title: {
      style: { display: 'none' }
    },
    pane: {
      size: '85%'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      categories: ['核心', '辅助', '爆发', '控制', '打野', '耐久', '逃生', '推进', '先手'],
      tickmarkPlacement: 'on',
      lineWidth: 0
    },
    yAxis: {
      gridLineInterpolation: 'polygon',
      lineWidth: 0,
      min: 0,
      labels: {
        enabled: false
      }
    },
    tooltip: {
      enabled: false
    },
    legend: {
      enabled: false
    },
    series: [
      {
        data,
        pointPlacement: 'on'
      }
    ]
  });
};

watch(props, newValue => {
  loadChart(newValue.data);
});
</script>
