import {
  getOnlyCookit,
} from '@/utils/cookie';
import {
  SgetItem
} from '@/utils/storage'
import api from "@/api";

// function findMenuId(arr, parentId, key) {
//   arr.map(s => {
//     if (s.id === parentId) {
//       if (s.key) {
//         return s.id
//       } else {
//         findMenuId(arr, s.parentId, key)
//       }
//     }
//   })
// }

function filterMenu(list, item) {
  let obj = {}
  list = list.filter(s => {
    let comName = s.path.replace(/\/\w{1}/g, function (val) {
      return val.substring(1, 2).toUpperCase();
    })
    s.name = comName;
    s.meta = {
      title: s.title
    }
    obj[s.id] = s;
    if (!s.isLast) {
      obj[s.id].children = []
    }
    if (s.parentId) {
      obj[s.parentId].children.push(s)
      return false;
    } else {
      if (item.id === s.id) {
        return true;
      } else {
        return false
      }
    }
  })
  return list
}

const user = {
  state: {
    userInfo: {
      user: '',
      uid: '',
      avatar: ''
    },
    menus: [],
    menusAll: [],
    collapsed: false,
    menusOpenKeys: ['/system']
  },
  actions: {
    getUserInfo({
      commit
    }) {
      api('getUserInfo').then(res => {
        commit('SET_USER_INFO', res.data)
      })
    },
    logOut({
      commit
    }) {
      commit('SET_MENU_ALL', [])
      let menus = SgetItem('menus')
      if (menus && menus.length > 0) {
        // window.location.reload()
        sessionStorage.clear()
        return
      }
      if (getOnlyCookit()) {
        return api('logout').then(() => {
          return Promise.resolve({
            success: true
          })
        }).catch(err => {
          console.log(err)
          return Promise.resolve({
            success: true
          })
        })
      } else {
        return Promise.resolve({
          success: true
        })
      }
    }
  },
  mutations: {
    FIND_MENU: (state, val) => {
      let menus = SgetItem('menus')
      let arr = menus.filter(s => {
        return s.title.indexOf(val) !== -1;
      })
      if (val) {
        state.menus = filterMenu(menus, ...arr)
      } else {
        state.menus = state.menusAll
      }
    },
    SET_MENU_ALL: (state, menus) => {
      state.menusAll = menus
      state.menus = menus
      console.log('菜单:', menus)
    },
    SET_COLLAPSED: (state, flag) => {
      state.collapsed = flag
    },
    SET_USER_INFO: (state, data) => {
      state.userInfo = data
    }
  }

}
export default user