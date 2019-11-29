<template functional>
  <a-sub-menu :key="props.menuInfo.path">
    <span slot="title">
      <a-icon :type="props.menuInfo.icon" /><span>{{ props.menuInfo.title }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item
        v-if="!(item.children && item.children.length > 0)"
        :key="item.path"
      >
        <a-icon :type="item.icon" />
        <span>{{ item.title }}</span>
      </a-menu-item>
      <sub-menu
        v-else
        :key="item.key"
        :menu-info="item"
      />
    </template>
  </a-sub-menu>
</template>
<script>
export default {
  name: "SubMenu",
  props: {
    menuInfo: {
      type: Object,
      default: () => {}
    }
  }
};
</script>