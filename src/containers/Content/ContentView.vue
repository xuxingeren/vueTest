<template>
  <a-layout-content class="content-view">
    <div class="navigation">
      <a-breadcrumb>
        <a-breadcrumb-item
          v-for="(item, index) in breadcrumb"
          :key="index"
        >
          <router-link
            v-if="item.isLast && index!==breadcrumb.length-1"
            :to="item.path"
          >{{item.title}}</router-link>
          <template v-else>
            {{item.title}}
          </template>
        </a-breadcrumb-item>
      </a-breadcrumb>
      <div class="page-header">
        <span class="ant-page-title">{{breadcrumb[breadcrumb.length-1].title}}</span>
      </div>
    </div>
    <main class="main">
      <router-view />
    </main>
  </a-layout-content>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ContentView",
  computed: {
    ...mapGetters(["breadcrumb"])
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.content-view {
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  .navigation {
    padding: 16px 24px;
    background-color: #fff;
    .page-header {
      margin-top: 8px;
      .ant-page-title {
        display: block;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.85);
        font-size: 20px;
        line-height: 32px;
      }
    }
  }
  .main {
    margin: 24px;
    flex: 1;
    background-color: #fff;
  }
}
</style>