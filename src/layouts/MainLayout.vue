<template>
  <a-layout id="main-layout">
    <a-layout-header class="main-layout-header">
      <Navigation :links="links" class="header-link" justify="end" />

      <div class="header-content">
        <div class="content-logo">
          <img src="/image/trivio_logo.png" width="40" height="40" />
        </div>

        <a-flex
          horizontal
          type="flex-column"
          justify="space-between"
          class="content-info"
        >
          <!-- на макетах есть это, но я не поняла, к чему это относится -->
          <!-- <div class="content-actions">
            <p>Создать поездку</p>
          </div> -->
          <span class="content-user">
            <!-- здесь бы использовать глобальный стор -->
            AA
          </span>
        </a-flex>
      </div>
    </a-layout-header>

    <a-layout-content>
      <RouterView />
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts" setup>
import { RouterName } from '@/router/types.ts';
import { useLoadLocale } from '@/shared/i18/useLocale.ts';
import Navigation from '@/components/Navigation/Navigation.vue';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

// Подгрузка переводов
useLoadLocale('router');

const links = computed(() => {
  // Здесь можно проверять на наличие прав к какому-то роуту

  return [
    {
      title: t('routes.desktop'),
      to: { name: RouterName.DESKTOP },
    },
    {
      title: t('routes.trips'),
      to: { name: RouterName.TRIPS },
    },
    {
      title: t('routes.reports'),
      to: { name: RouterName.REPORTS },
    },
    {
      title: t('routes.myCompany'),
      to: { name: RouterName.MY_COMPANY },
    },
    {
      title: t('routes.finance'),
      to: { name: RouterName.FINANCE },
    },
  ];
});
</script>

<style scoped lang="less">
#main-layout {
  min-height: 100vh;
  background: var(--primary-bg-color);
  .main-layout-header {
    height: auto;
    background: var(--header-bg-color);
    padding: 0;
  }

  .header-link,
  .header-content {
    padding: 0 var(--padding-inline);
  }

  .header-link {
    padding-top: 11px;
    padding-bottom: 11px;
    gap: 30px;
  }

  .header-content {
    display: flex;
    border-top: 1px solid var(--separator-color);
    align-items: center;

    .content-logo {
      border-right: 1px solid var(--separator-color);
      padding-right: 15px;

      img {
        vertical-align: middle;
      }
    }

    .content-info {
      flex: 1;
      padding-left: 20px;
    }

    .content-user {
      .font-b();
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      align-self: center;
      height: 36px;
      width: 36px;
      background-color: var(--primary-button-bg-color);
      color: var(--primary-button-color);
      margin-left: auto;
    }
  }
}

@media (max-width: @phones) {
  .header-link {
    flex-wrap: wrap;
  }
}
</style>
