<template>
  <a-layout-header style="padding:0;">
    <div class="content-header">
      <a-button
        style="margin-left:24px;"
        @click="toggleCollapsed"
      >
        <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
      </a-button>
    </div>
  </a-layout-header>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ContentHeader",
  methods: {
    toggleCollapsed() {
      this.$store.commit("SET_COLLAPSED", !this.$store.state.user.collapsed);
    }
  },
  computed: {
    ...mapGetters(["collapsed"])
  }
};
</script>

<style lang="scss" scoped>
.content-header {
  background-color: #fff;
}
</style>