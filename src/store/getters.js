const getters = {
    userInfo: state => state.user.userInfo,
    collapsed: state => state.role.collapsed,
    menus: state => state.role.menus,
    menusOpenKeys: state => state.role.menusOpenKeys,
    breadcrumb: state => state.role.breadcrumb,
    tag: state => state.tags.tag
}
export default getters