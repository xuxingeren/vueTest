<template>
  <div id="app">
    <a-locale-provider :locale="zh_CN">
      <a-config-provider>
        <router-view />
      </a-config-provider>
    </a-locale-provider>
  </div>
</template>

<script>
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
export default {
  name: "app",
  data() {
    return {
      zh_CN
    };
  }
};
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
  display: flex;
}
</style>
