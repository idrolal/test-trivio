import { ComponentCustomProperties } from 'vue';

declare module 'vue' {
  interface ComponentCustomProperties {
    $isLoadingApp: {
      value: boolean;
    };
  }
}

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
