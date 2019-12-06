<template>
  <a-layout-sider
    class="sider"
    breakpoint="lg"
    @collapse="onCollapse"
    @breakpoint="onBreakpoint"
    v-model="collapsed"
  >
    <div class="searchBox">
      <a-input-search
        v-if="!collapsed"
        placeholder="请输入"
        class="searchInput"
        :allowClear="true"
        @search="onSearch"
        @change="onChange"
        :autoFocus="true"
      />
      <a-icon
        v-else
        @click="collapsed=false"
        class="searchIcon"
        type="search"
      />
    </div>
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
          :key="item.name==='Index' ? item.children[0].path : item.path"
        >
          <a-icon :type="item.icon" />
          <span>{{item.meta.title}}</span>
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
    onSearch(val) {
      this.$store.commit("FIND_MENU", val.trim());
    },
    onChange(e) {
      if (!e.currentTarget.value.trim()) this.$store.commit("FIND_MENU", "");
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
  .searchBox {
    height: 32px;
    background: #fff;
    margin: 16px;
    border-radius: 4px;
    .searchIcon {
      vertical-align: top;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: 100%;
      height: 100%;
    }
  }
}
</style>