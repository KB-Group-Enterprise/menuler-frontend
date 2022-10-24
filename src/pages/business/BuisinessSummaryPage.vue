<template>
  <BaseContainer>
    <BusinessHeader title="Restaurant Summary" />
    <div>
      <Datepicker v-model="date" range />
      <div class="grid grid-cols-2 gap-2 my-4">
        <div class="block p-5 rounded-lg shadow-lg bg-white w-full">
          <h5 class="text-gray-900 text-lg leading-tight font-medium mb-2">จำนวนออเดอร์</h5>
          <p class="text-gray-700 text-base">312 ออเดอร์</p>
        </div>
        <div class="block p-5 rounded-lg shadow-lg bg-white w-full">
            <h5 class="text-gray-900 text-lg leading-tight font-medium mb-2">เมนูที่สั่ง</h5>
            <p class="text-gray-700 text-base">689 เมนู</p>
         </div>
         <div class="block p-5 rounded-lg shadow-lg bg-white w-full">
            <h5 class="text-gray-900 text-lg leading-tight font-medium mb-2">ยอดขาย</h5>
            <p class="text-gray-700 text-base">1204 บาท</p>
         </div>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-lg">
        <DoughnutChart v-bind="doughnutChartProps" />
      </div>
      <div class="w-full bg-inherit rounded-lg mt-4 flex flex-col space-y-2">
        <div class="grid grid-cols-4 w-full p-4 rounded-lg">
            <div>ลำดับ</div>
            <div>ชื่อ</div>
            <div>จำนวน</div>
            <div>ยอดขาย</div>
        </div>
        <div v-for="(item, index) in Array(10)" :key="index" class="grid grid-cols-4 bg-white w-full p-4 rounded-lg">
            <div>{{ index + 1 }}</div>
            <div>name</div>
            <div>3</div>
            <div>300</div>
        </div>
      </div>
    </div>
  </BaseContainer>
</template>

<script setup lang="ts">
import BaseContainer from '@/components/Base/BaseContainer.vue';
import BusinessHeader from '@/components/Business/BusinessHeader.vue';
import { DoughnutChart, useDoughnutChart } from 'vue-chart-3';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { computed, ref } from 'vue';
Chart.register(...registerables);

const startDate = new Date();
const endDate = new Date();
endDate.setHours(23,59,59)
const date = ref([startDate, endDate]);

const dataValues = ref([30, 40, 60, 70, 5]);
const dataLabels = ref(['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre']);
const toggleLegend = ref(true);

const testData = computed<ChartData<'doughnut'>>(() => ({
  labels: dataLabels.value,
  datasets: [
    {
      data: dataValues.value,
      backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
    },
  ],
}));

const options = computed<ChartOptions<'doughnut'>>(() => ({
  scales: {
    myScale: {
      type: 'logarithmic',
      position: toggleLegend.value ? 'left' : 'right',
    },
  },
  plugins: {
    legend: {
      position: toggleLegend.value ? 'top' : 'bottom',
    },
    title: {
      display: true,
      text: 'เมนูที่ออเดอร์',
    },
  },
}));

const { doughnutChartProps, doughnutChartRef } = useDoughnutChart({
  chartData: testData,
  options,
});
</script>

<style scoped></style>
