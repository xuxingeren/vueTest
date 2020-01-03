<template>
  <a-layout-header class="layout-header">
    <div class="content-header">
      <div class="header-left">
        <a-button @click="toggleCollapsed">
          <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
        </a-button>
      </div>
      <div class="header-right userInfo">
        <a-dropdown :overlayStyle="{minWidth:'120px'}">
          <div class="ant-dropdown-link">
            <!-- <a-skeleton
              :avatar="true"
              :paragraph="false"
              :loading="!!userInfo.user"
            > -->
            <a-avatar
              :src="userInfo.avatar"
              icon="user"
            />
            <span class="avatar-name">{{userInfo.user}}</span>
            <!-- </a-skeleton> -->
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
      this.$store.commit("SET_COLLAPSED", !this.$store.state.role.collapsed);
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
.layout-header {
  padding: 0;
  z-index: 9;
  position: sticky;
  top: 0;
  right: 0;
  .content-header {
    background-color: #fff;
    display: flex;
    height: 100%;
    align-items: center;
    padding: 0 24px;
    justify-content: space-between;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    .header-right,
    .header-left {
      display: flex;
      align-items: center;
    }
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
}
</style>