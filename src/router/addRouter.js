import router from './index'
import Layout from "@/containers/index"
let routerList = [{
  path: '/',
  name: 'Index',
  redirect: '/workbench',
  component: Layout,
  meta: {
    title: '首页'
  },
  children: []
}]

function addRouter(list) {
  let obj = {}
  let levelObj = {}
  return new Promise((resolve, reject) => {
    try {
      list = list.filter(s => {
        let comName = s.path.replace(/\/\w{1}/g, function (val) {
          return val.substring(1, 2).toUpperCase();
        })
        s.name = comName;
        s.meta = {
          title: s.title
        }
        routerList[0].children.push({
          path: s.path,
          name: comName,
          component(resolve) {
            import(`../views${s.path}`).then(module => {
              resolve(module)
            }).catch(err => {
              import('../components/errorPage/404').then(module => {
                resolve(module)
              })
              console.log(err)
            })
          },
          meta: {
            title: s.title,
            level: s.level,
            icon: s.icon,
            id: s.id
          }
        })
        if (!levelObj[s.level]) {
          levelObj[s.level] = {};
        }
        levelObj[s.level][s.id] = s;
        obj[s.id] = s;
        if (!s.isLast) {
          obj[s.id].children = []
        }
        if (s.parentId) {
          s.menus && obj[s.parentId].children.push(s)
          return false;
        } else {
          return true;
        }
      })
      console.log(list)

      // routerList[0].children.push({
      //   path: '/test',
      //   name: 'Test',
      //   component: () =>
      //     import('../views/Test'),
      //   meta: {
      //     title: 'test'
      //   },
      //   levelId: "",
      //   icon: "experiment",
      //   children: []
      // })
      console.log(router)
      router.addRoutes([...routerList, {
        path: '*',
        redirect: '/404'
      }])
      setTimeout(() => {
        resolve({
          list,
          levelObj
        })
      }, 100);
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

export default addRouter