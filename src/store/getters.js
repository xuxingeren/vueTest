const getters = {
    collapsed: state => state.user.collapsed,
    menus: state => state.user.menus,
    menusOpenKeys: state => state.user.menusOpenKeys,
    tag: state => state.tags.tag
}
export default getters