import {
  getOnlyCookit,
} from '@/utils/cookie';
import {
  SgetItem
} from '@/utils/storage'
import api from "@/api";

// function filterMenu(list, item) {
//   let obj = {}
//   list = list.filter(s => {
//     let comName = s.path.replace(/\/\w{1}/g, function (val) {
//       return val.substring(1, 2).toUpperCase();
//     })
// s.name = comName;
// s.meta = {
//   title: s.title
// }
//     obj[s.id] = s;
//     if (!s.isLast) {
//       obj[s.id].children = []
//     }
//     if (s.parentId) {
//       obj[s.parentId].children.push(s)
//       return false;
//     } else {
//       if (item.id === s.id) {
//         return true;
//       } else {
//         return false
//       }
//     }
//   })
//   return list
// }

const role = {
  state: {
    menus: [],
    menusAll: [],
    collapsed: false,
    menusOpenKeys: ['/system'],
    levelObj: {},
    breadcrumb: []
  },
  actions: {
    logOut({
      commit
    }) {
      commit('SET_MENU_ALL', [])
      let menus = SgetItem('menus')
      if (menus && menus.length > 0) {
        window.location.reload()
        sessionStorage.clear()
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
        let comName = s.path.replace(/\/\w{1}/g, function (val) {
          return val.substring(1, 2).toUpperCase();
        })
        s.name = comName;
        s.meta = {
          title: s.title
        }
        return s.title.indexOf(val) !== -1 && s.isLast && s.menus;
      })
      if (val) {
        state.menus = arr
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
    SET_LEVEL_OBJ: (state, data) => {
      state.levelObj = data
    },
    SET_BREADCRUMB: (state, data) => {
      let arr = new Array(data.level).fill("");
      let id = data.id;
      if (!id) {
        return
      }
      let level = data.level;
      let completeArr = [];
      console.log(state.levelObj)
      arr.map(() => {
        completeArr.unshift(state.levelObj[level][id])
        id = state.levelObj[level][id]['parentId']
        level--;
      })
      state.breadcrumb = completeArr;
      console.log(completeArr)
    }
  }

}
export default role