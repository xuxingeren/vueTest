<template>
  <a-layout
    class="content"
    :style="{ marginLeft: collapsed ? '80px':'200px' }"
  >
    <content-header />
    <content-view />
  </a-layout>
</template>

<script>
import { mapGetters } from "vuex";
import ContentHeader from "./ContentHeader";
import ContentView from "./ContentView";
export default {
  name: "Content",
  components: {
    "content-header": ContentHeader,
    "content-view": ContentView
  },
  computed: {
    ...mapGetters(["collapsed"])
  }
};
</script>

<style lang="scss" scoped>
.content {
  transition: all 0.2s;
}
</style>