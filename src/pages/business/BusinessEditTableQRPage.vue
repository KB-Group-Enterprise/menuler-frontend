<template>
  <LayoutContainer>
    <BusinessHeader title="Table Manager" />
    <div
      class="flex justify-center text-gray-600 cursor-pointer transition-all hover:scale-105 mt-8"
      @click="createTable"
    >
      <div class="flex flex-col justify-center">
        <IconifyIcon icon="carbon:add-alt" class="mx-1"></IconifyIcon>
      </div>
      เพิ่มโต๊ะ
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 mt-5 w-10/12 md:w-full">
      <div v-for="table in tables" :key="table.id" class="border p-4">
        <div>
          <img class="w-full" :src="table.qrcodeImageUrl" />
        </div>
        <div class="text-center font-bold text-2xl mt-2">{{ table.tableName }}</div>
        <div class="text-xs text-center">{{ table.tableToken }}</div>
        <div class="flex justify-center my-2">
          <div class="form-check form-switch">
            <input
              class="form-check-input appearance-none w-16 -ml-10 rounded-full float-left h-8 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              :checked="table.isActivate"
              @change="toggleTable(table)"
            />
          </div>
        </div>
        <div class="text-center" :class="[table.isActivate ? 'text-green-500' : 'text-red-500']">
          {{ table.isActivate ? 'เปิดใช้งาน' : 'ปิดใช่งาน' }}
        </div>
        <div class="flex flex-col items-center mt-2">
          <div
            icon="fluent:delete-dismiss-24-filled"
            class="mx-1 text-red-600"
            @click="deleteTable(table)"
          >ลบ</div>
          <a :href="table.qrcodeImageUrl" :download="`${table.tableName}.png`">
            <div icon="eva:download-fill" class="mx-1">ดาวน์โหลด</div>
          </a>
          <div icon="charm:refresh" class="mx-1" @click="clearTable(table)">เคลียร์โต๊ะ</div>
          <div icon="charm:refresh" class="mx-1" @click="refreshTable(table)">รีเฟรช</div>
          <div icon="bxs:edit" class="mx-1" @click="editTableName(table)">แก้ไข</div>
        </div>
      </div>
    </div>
  </LayoutContainer>
</template>

<script setup lang="ts">
import LayoutContainer from '@/components/Layout/LayoutContainer.vue';
import BusinessHeader from '@/components/Business/BusinessHeader.vue';
import { useAuth } from '@/providers/auth';
import { computed, ref } from 'vue';
import { useEapi } from '@/providers';
import Swal from 'sweetalert2';
import { Swaler } from '@/utils/helper/swaler';
import { EapiKey } from '@/symbols/symbol';
import { ta } from 'date-fns/locale';

const auth = useAuth();
const eapi = useEapi();
const profile = computed(() => auth.state.user);
const hostname = window.location.hostname;

const tables = ref<any[]>([]);
const fetchData = async () => {
  const result = await eapi.table.getTablesByRestaurantId(profile.value?.restaurant.id);
  if (result.success && result.data) {
    tables.value = result.data.allTables.sort((a: any, b: any) => {
      // console.log(b.tableName,a.tableName)
      return a.tableName.localeCompare(b.tableName);
    });
  }
};

const selectUploadInput = () => {
  const imageInput = document.getElementById('image-input');
  imageInput?.click();
}

const createTable = async () => {
  const ans = await Swal.fire({
    text: 'กรุณากรอกชื่อโต๊ะ',
    input: 'text',
    inputLabel: 'ชื่อโต๊ะ',
    inputValue: '',
    showCancelButton: true,
  });
  if (ans.isConfirmed) {
    if (!ans.value) {
      Swaler.warn('กรุณากรอกชื่อโต๊ะ');
    }
    const paylaod = [
      {
        tableName: ans.value,
        qrcodeSize: {
          width: 400,
          height: 400,
        },
      },
    ];
    const result = await eapi.table.postCreateTable(paylaod);
    if (result.success) {
      Swaler.success(`สร้างโต๊ะ ${ans.value} สำเร็จ`);
      fetchData();
    }
  }
};

const toggleTable = async (table: any) => {
  const result = await eapi.table.updateTableById(table.id, {
    isActivate: !table.isActivate,
    tableName: table.tableName,
  });
  if (result.success) {
    fetchData();
  }
};

const editTableName = async (table: any) => {
  const ans = await Swal.fire({
    text: 'กรุณากรอกชื่อโต๊ะ',
    input: 'text',
    inputLabel: 'ชื่อโต๊ะ',
    inputValue: '',
    showCancelButton: true,
  });
  if (ans.isConfirmed) {
    const result = await eapi.table.updateTableById(table.id, {
      isActivate: table.isActivate,
      tableName: ans.value,
    });
    if (result.success) {
      fetchData();
    }
  }
};

const refreshTable = async (table: any) => {
  const ans = await Swaler.question(`ที่จะออก QR CODE ใหม่ให้กับ ${table.tableName}`)
  if (ans.isConfirmed) {
    const result = await eapi.table.updateTableById(table.id, {
      isActivate: table.isActivate,
      tableName: table.tableName,
      isRenewQrcode: true,
    });
    if (result.success) {
      fetchData();
    }
  }
}

const deleteTable = async (table: any) => {
  const ans = await Swaler.question(`ที่จะลบโต๊ะ ${table.tableName}`)
  if (!ans.isConfirmed) return;
  const result = await eapi.table.deleteTableById(table.id, { noticeSuccess: true });
  if (result.success) {
    fetchData();
  }
}

const clearTable = async (table: any) => {
  const token = table.tableToken;
  const ans = await Swaler.question(`ที่จะเคลียโต๊ะ ${table.tableName}`);
  if (!ans.isConfirmed) return;
  const result = await eapi.table.clearTableByTableToken(token, { noticeSuccess: true });
  if (result.success) {
    fetchData();
  }
}

fetchData();
</script>
