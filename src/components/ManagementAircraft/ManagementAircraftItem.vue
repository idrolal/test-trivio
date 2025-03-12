<template>
  <a-form layout="inline" labelAlign="left">
    <!-- <a-space > -->
    <a-row :gutter="[15, 20]" class="aircraft-form" :wrap="true">
      <a-col class="gutter-row" :span="5">
        <a-form-item
          class="form-item"
          :label="$t('aircraftItem.description')"
          v-bind="{ ...validateInfos.description }"
        >
          <a-input
            v-model:value="form.description"
            :maxLength="100"
            :placeholder="$t('aircraftItem.description')"
          />
        </a-form-item>
      </a-col>

      <a-col class="gutter-row" :span="5">
        <a-form-item
          class="form-item"
          :label="$t('aircraftItem.availableAirlines')"
          v-bind="{ ...validateInfos.availableAirlines }"
        >
          <a-input
            v-model:value="form.availableAirlines"
            :placeholder="$t('aircraftItem.availableAirlines')"
          />
        </a-form-item>
      </a-col>

      <a-col class="gutter-row" :span="2">
        <a-form-item
          class="form-item"
          :label="$t('aircraftItem.providerKey')"
          v-bind="{ ...validateInfos.providerKey }"
        >
          <a-input
            v-model:value="form.providerKey"
            :maxLength="50"
            :placeholder="$t('aircraftItem.providerKey')"
          />
        </a-form-item>
      </a-col>

      <a-col class="gutter-row" :span="checkIsCloseCompany ? 4 : 8">
        <a-form-item
          class="form-item"
          :label="$t('aircraftItem.typeCompany')"
          v-bind="{ ...validateInfos.typeCompany }"
        >
          <a-select
            v-model:value="form.typeCompany"
            class="select"
            :placeholder="$t('aircraftItem.typeCompany')"
          >
            <a-select-option value="open">Открытый</a-select-option>
            <a-select-option value="close">Закрытый</a-select-option>
          </a-select>
        </a-form-item>
      </a-col>

      <Transition mode="out-in">
        <a-col class="gutter-row" :span="4" v-if="checkIsCloseCompany">
          <a-form-item
            class="form-item form-item-big"
            :label="$t('aircraftItem.secretKey')"
            v-bind="{ ...validateInfos.secretKey }"
          >
            <a-input-password
              v-model:value="form.secretKey"
              :maxLength="50"
              :placeholder="$t('aircraftItem.secretKey')"
            />
          </a-form-item>
        </a-col>
      </Transition>

      <a-col class="gutter-row form-item-button" :span="3">
        <a-button type="primary" html-type="submit" @click.prevent="submitForm">
          {{ $t('button.save') }}
        </a-button>
        <a-button
          type="primary"
          html-type="submit"
          danger
          @click="$emit('delete')"
          class="delete-button square"
        >
          <CustomIcon icon="trash" :size="[20, 20]" />
        </a-button>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { message } from 'ant-design-vue';
import type { Rule } from 'ant-design-vue/es/form';
import { Form } from 'ant-design-vue';
import { type AircraftData } from '@/store/aircraft/types';
import { useLoadLocale } from '@/shared/i18/useLocale';
import { useI18n } from 'vue-i18n';
import CustomIcon from '@/shared/CustomIcon/CustomIcon.vue';
const useForm = Form.useForm;
const { t } = useI18n();

useLoadLocale('aircraftItem');

interface FormData extends Omit<AircraftData, 'availableAirlines'> {
  availableAirlines: string;
}

const props = defineProps<AircraftData>();
const emits = defineEmits(['delete', 'save']);

const form = ref<FormData>({
  ...props,
  availableAirlines: props.availableAirlines
    ?.reduce((acc: string[], cur) => {
      acc.push(cur.text);
      return acc;
    }, [])
    .join(';'),
});

const checkIsCloseCompany = computed(() => form.value.typeCompany === 'close');
const rules = computed<Record<string, Rule[]>>(() => ({
  description: [
    { required: true, message: t('aircraftItem.errors.description.required') },
    {
      max: 100,
      message: t('aircraftItem.errors.description.max', { max: 100 }),
    },
  ],
  providerKey: [
    { required: true, message: t('aircraftItem.errors.providerKey.required') },
    {
      max: 50,
      message: t('aircraftItem.errors.providerKey.max', { max: 50 }),
    },
  ],
  availableAirlines: [
    {
      required: true,
      message: t('aircraftItem.errors.availableAirlines.required'),
    },
    {
      pattern: /^[a-zA-Z0-9]+(;[a-zA-Z0-9]+)*$/,
      message: t('aircraftItem.errors.availableAirlines.pattern'),
    },
  ],
  typeCompany: [
    { required: true, message: t('aircraftItem.errors.typeCompany.required') },
  ],
  secretKey: [
    {
      required: checkIsCloseCompany.value,
      message: t('aircraftItem.errors.secretKey.required'),
    },
    { max: 50, message: t('aircraftItem.errors.secretKey.max', { max: 50 }) },
    {
      pattern: /^[a-zA-Z0-9]+$/,
      message: t('aircraftItem.errors.secretKey.pattern'),
    },
  ],
}));

const { validate, validateInfos } = useForm(form, rules);

const submitForm = () => {
  validate()
    .then(() => {
      emits('save', {
        ...form.value,
        secretKey: checkIsCloseCompany ? form.value.secretKey : null,
        availableAirlines: form.value.availableAirlines
          .split(';')
          .map((text) => ({ text })),
      });
    })
    .catch(() => {
      message.error('Error');
    });
};
</script>

<style lang="less" scoped>
.aircraft-form {
  width: 100%;
  .form-item {
    margin-inline: 0;

    :deep(.ant-form-item-row) {
      align-items: start;
      flex-direction: column;
    }
  }

  .form-item-button {
    display: flex;
    margin-top: 32px;
    gap: 8px;
  }

  .delete-button {
    & > svg {
      fill: transparent;
      stroke: white;
    }
  }
}

.select {
  width: 100%;
  transition: width 0.3s ease;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

@media (max-width: @desktops) {
  .aircraft-form {
    flex-direction: column;
    .form-item {
      width: 100%;
    }
    .form-item-button {
      margin-top: 16px;
      justify-content: flex-end;
    }

    .gutter-row {
      flex: 1;
      max-width: 100%;
    }
  }
}
</style>
