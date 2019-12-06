<template>
  <a-layout-content class="content-view">
    <router-view />
  </a-layout-content>
</template>

<script>
export default {
  name: "ContentView"
};
</script>

<style lang="scss" scoped>
.content-view {
  margin: 24px;
  border-radius: 4px;
  background-color: #fff;
}
</style>