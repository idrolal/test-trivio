<template>
  <template>
    <Teleport defer to="#page-header">
      <a-button type="primary" @click="addAicraft"
        >+ {{ $t('button.add') }}</a-button
      >
    </Teleport>
  </template>
  <a-flex vertical class="management-aircraft-list">
    <TransitionGroup name="list" v-if="aircraftList?.length">
      <ManagementAircraftItem
        v-for="(aircraft, idx) in aircraftList"
        v-bind="{ ...aircraft }"
        :key="aircraft.id"
        @delete="onDelete(idx)"
        @save="(item:AircraftData)=>onSave(item,idx)"
      />
    </TransitionGroup>
    <p v-else>No data</p>
  </a-flex>
</template>

<script setup lang="ts">
import type { AircraftData } from '@/store/aircraft/types';
import ManagementAircraftItem from './ManagementAircraftItem.vue';
import { onMounted, ref } from 'vue';

const aircraftList = ref<AircraftData[]>([]);

const addAicraft = () => {
  aircraftList.value.push({
    id: +new Date(),
    description: '',
    providerKey: '',
    availableAirlines: [],
    secretKey: null,
    typeCompany: 'open',
  });
};

const saveDataToLocalStorage = () => {
  // можно было подкобчиь pinia и pinia-persist, но думаю, что это избыточно здесь
  localStorage.setItem(
    'aircraftList',
    JSON.stringify(aircraftList.value.filter((el) => el.providerKey))
  );
};

const onDelete = (idx: number) => {
  aircraftList.value.splice(idx, 1);
  saveDataToLocalStorage();
};

const onSave = (item: AircraftData, idx: number) => {
  aircraftList.value[idx] = item;
  saveDataToLocalStorage();
};

onMounted(() => {
  aircraftList.value = JSON.parse(
    localStorage.getItem('aircraftList') || '[]'
  ) as AircraftData[];
});
</script>
<style lang="less" scoped>
.management-aircraft-list {
  background: var(--secondary-bg-color);
  padding: 20px;
  gap: 20px;
  border-radius: 20px;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
