<template>
  <a-layout-sider class="sider">
    <!-- <a-button
      type="primary"
      @click="toggleCollapsed"
      style="margin-bottom: 16px"
    >
      <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button> -->
    <a-menu
      :defaultSelectedKeys="['1']"
      :defaultOpenKeys="['2']"
      mode="inline"
      theme="dark"
      @click="open"
      :inlineCollapsed="collapsed"
    >
      <template v-for="item in menus">
        <a-menu-item
          v-if="!(item.children && item.children.length > 0)"
          :key="item.path"
        >
          <a-icon :type="item.icon" />
          <span>{{item.title}}</span>
        </a-menu-item>
        <sub-menu
          v-else
          :menu-info="item"
          :key="item.key"
        />
      </template>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import { mapGetters } from "vuex";
import SubMenu from "./SubMenu";
export default {
  name: "sider",
  components: {
    "sub-menu": SubMenu
  },
  data() {
    return {
      list: [
        {
          key: "1",
          title: "Option 1"
        },
        {
          key: "2",
          title: "Navigation 2",
          children: [
            {
              key: "2.1",
              title: "Navigation 3"
            }
          ]
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["menus", "collapsed"])
  },
  methods: {
    titleClick({ item, key, keyPath }) {
      console.log(item, key, keyPath);
    },
    open() {
      console.log(arguments);
    }
  }
};
</script>

<style lang="scss" scoped>
.sider {
  flex: 0 0 256px;
  overflow: "auto";
  height: "100vh";
  position: "fixed";
  left: 0;
}
</style>