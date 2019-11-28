<template>
  <a-layout class="content">
    <content-header />
    <content-view />
  </a-layout>
</template>

<script>
import ContentHeader from "./ContentHeader";
import ContentView from "./ContentView";
export default {
  name: "Content",
  components: {
    "content-header": ContentHeader,
    "content-view": ContentView
  }
};
</script>

<style lang="scss" scoped>
.content {
}
</style>