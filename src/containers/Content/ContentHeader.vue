<template>
  <a-layout-header style="padding:0;">
    <div class="content-header">
      <a-button @click="toggleCollapsed">
        <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
      </a-button>
      <div class="userInfo">
        <a-dropdown :overlayStyle="{minWidth:'120px'}">
          <div class="ant-dropdown-link">
            <a-avatar
              :src="userInfo.avatar"
              icon="user"
            />
            <span class="avatar-name">{{userInfo.name}}</span>
          </div>
          <a-menu slot="overlay">
            <a-menu-item>
              <a-icon type="setting" /><span>个人设置</span>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item @click="logoutClick">
              <a-icon type="logout" /><span>退出登录</span>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
  </a-layout-header>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ContentHeader",
  created() {
    this.$store.dispatch("getUserInfo");
  },
  methods: {
    toggleCollapsed() {
      this.$store.commit("SET_COLLAPSED", !this.$store.state.user.collapsed);
    },
    logoutClick() {
      this.$confirm({
        title: "退出登录",
        content: "是否退出登录",
        okText: "确认",
        cancelText: "取消",
        onCancel: () => {
          console.log(false);
        },
        onOk: () => {
          this.$router.replace("/login");
        }
      });
    }
  },
  computed: {
    ...mapGetters(["collapsed", "userInfo"])
  }
};
</script>

<style lang="scss" scoped>
.content-header {
  background-color: #fff;
  display: flex;
  height: 100%;
  align-items: center;
  padding: 0 24px;
  justify-content: space-between;
  .ant-dropdown-link {
    padding: 0 12px;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
    .avatar-name {
      margin-left: 8px;
      color: rgba(0, 0, 0, 0.65);
    }
  }
}
</style>