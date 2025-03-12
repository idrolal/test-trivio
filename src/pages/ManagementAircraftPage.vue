<template>
  <a-flex vertical class="management-aircraft">
    <div id="page-header">
      <h1>{{ $t('pages.managementAircraft.title') }}</h1>
    </div>
    <ManagementAircraftForm />
  </a-flex>
</template>

<script lang="ts" setup>
import ManagementAircraftForm from '@/components/ManagementAircraft/ManagementAircraftForm.vue';
</script>

<style lang="less" scoped>
#page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.management-aircraft {
  padding: 50px var(--padding-inline);
  gap: 30px;
}

h1 {
  .font-h1();
  word-wrap: break-word;
}
</style>
