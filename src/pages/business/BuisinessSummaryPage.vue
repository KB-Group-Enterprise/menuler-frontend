<template>
  <BaseContainer>
    <BaseLoading v-if="isLoading"></BaseLoading>
    <div v-else>
    <BusinessHeader title="Restaurant Summary" />
    <div>
      <div class="flex flex-col space-y-2 mt-2">
        <Datepicker class="w-full" v-model="date" range />
        <BaseButtomTW @click="fetchData()">ค้นหา</BaseButtomTW>
      </div>
      <div class="grid grid-cols-2 gap-2 my-4">
        <div class="block p-5 rounded-lg shadow-lg bg-white w-full">
          <h5 class="text-gray-900 text-lg leading-tight font-medium mb-2">จำนวนออเดอร์</h5>
          <p class="text-gray-700 text-base">{{ summaryData.total.totalOrderCount }} ออเดอร์</p>
        </div>
        <div class="block p-5 rounded-lg shadow-lg bg-white w-full">
            <h5 class="text-gray-900 text-lg leading-tight font-medium mb-2">เมนูที่สั่ง</h5>
            <p class="text-gray-700 text-base">{{ summaryData.total.totalMenuCount }} เมนู</p>
         </div>
         <div class="block p-5 rounded-lg shadow-lg bg-white w-full">
            <h5 class="text-gray-900 text-lg leading-tight font-medium mb-2">ยอดขาย</h5>
            <p class="text-gray-700 text-base">{{ summaryData.total.totalSales }} บาท</p>
         </div>
      </div>
      <div class="bg-white p-4 rounded-lg shadow-lg">
        <BarChart v-bind="barChartProps" />
      </div>
      <div class="w-full bg-inherit rounded-lg mt-4 flex flex-col space-y-2">
        <div class="grid grid-cols-4 w-full p-4 rounded-lg">
            <div>ลำดับ</div>
            <div>ชื่อ</div>
            <div>จำนวน</div>
            <div>ยอดขาย</div>
        </div>
        <div v-for="(item, index) in summaryData.leaderBoard" :key="index" class="grid grid-cols-4 bg-white w-full p-4 rounded-lg">
            <div>{{ index + 1 }}</div>
            <div>{{ item.foodName }}</div>
            <div>{{ item.sales }}</div>
            <div>{{ item.income }}</div>
        </div>
      </div>
    </div>
    </div>
  </BaseContainer>
</template>

<script setup lang="ts">
import BaseContainer from '@/components/Base/BaseContainer.vue';
import BusinessHeader from '@/components/Business/BusinessHeader.vue';
import { BarChart, useBarChart } from 'vue-chart-3';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { computed, ref, watch } from 'vue';
import BaseButtomTW from '@/components/Base/BaseButtomTW.vue';
import { useEapi } from '@/providers';
import BaseLoading from '@/components/Base/BaseLoading.vue';
import { BusinessSummaryDto } from '@/types/dto.types';
import { Swaler } from '@/utils/helper/swaler';
Chart.register(...registerables);

const startDate = new Date();
startDate.setHours(0,0,0,0)
const endDate = new Date();
endDate.setHours(23,59,59)
const date = ref([startDate, endDate]);


const dataValues = ref([30, 40, 60, 70, 5]);
const dataLabels = ref(['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre']);
const toggleLegend = ref(false);
const summaryData = ref<BusinessSummaryDto>(null as any);
const isLoading = ref(true);

const testData = computed<ChartData<'bar'>>(() => ({
  labels: dataLabels.value,
  datasets: [
    {
      data: dataValues.value,
      backgroundColor: ['#77CEFF'],
    },
  ],
}));

const options = computed<ChartOptions<'bar'>>(() => ({
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
      text: 'เมนูที่ออเดอร์ 10 อันดับแรก',
    },
  },
}));

const { barChartProps, barChartRef } = useBarChart({
  chartData: testData,
  options,
});

const eapi = useEapi();
const fetchData = async () => {
  const startDate = date.value[0];
  const endDate = date.value[1];
  if (!startDate || !endDate) {
    Swaler.warn('วันที่ไม่ถูกต้อง');
    return
  }
  const result = await eapi.business.restaurantSummary(startDate.toISOString(), endDate.toISOString());
  if (result.success && result.data) {
    summaryData.value = result.data;
    // console.log(JSON.stringify(result.data))

    const labels: string[] = [];
    const values: number[] = [];

    summaryData.value.topTen.forEach((item => {
      labels.push(item.foodName);
      values.push(item.sales);
    }))

    dataLabels.value = labels;  
    dataValues.value = values;

    isLoading.value = false;
  }
}

fetchData();
</script>

<style scoped></style>
