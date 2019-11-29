<template>
  <a-layout-sider
    class="sider"
    breakpoint="lg"
    @collapse="onCollapse"
    @breakpoint="onBreakpoint"
    v-model="collapsed"
  >
    <a-menu
      :defaultSelectedKeys="[$route.path]"
      :defaultOpenKeys="menusOpenKeys"
      mode="inline"
      theme="dark"
      @click="open"
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
      defaultSelectedKeys: []
    };
  },
  computed: {
    ...mapGetters(["menus", "menusOpenKeys"]),
    collapsed: {
      get: function() {
        return this.$store.state.user.collapsed;
      },
      set: function(newValue) {
        this.$store.commit("SET_COLLAPSED", newValue);
      }
    }
  },
  methods: {
    open({ key }) {
      this.$router.push({
        path: key
      });
    },
    onCollapse(collapsed, type) {
      console.log(collapsed, type);
    },
    onBreakpoint(broken) {
      console.log(broken);
    }
  }
};
</script>

<style lang="scss" scoped>
.sider {
  height: 100vh;
  position: fixed;
  left: 0;
}
</style>