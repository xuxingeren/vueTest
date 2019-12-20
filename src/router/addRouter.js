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
  let menus = []
  let indexKey = {}
  return new Promise((resolve, reject) => {
    try {
      list.map(s => {
        let comName = s.path.replace(/\/\w{1}/g, function (val) {
          return val.substring(1, 2).toUpperCase();
        })
        if (s.isLast) {
          let key = s.levelId.replace(/-\w+(?!.*-\w+)/, "")
          if (indexKey[key] !== undefined) {
            menus[indexKey[key]].children.push({
              path: s.path,
              name: comName,
              meta: {
                title: s.title
              },
              levelId: s.levelId,
              icon: s.icon,
              children: []
            })
          } else {
            menus.push({
              path: s.path,
              name: comName,
              meta: {
                title: s.title
              },
              levelId: s.levelId,
              icon: s.icon,
              children: []
            })
          }
          routerList[0].children.push({
            path: s.path,
            name: comName,
            component(resolve) {
              import(`../views${s.path}`).then(module => {
                resolve(module)
              }).catch(err => {
                console.log(err)
              })
            },
            meta: {
              title: s.title
            },
            levelId: s.levelId,
            icon: s.icon,
            children: []
          })
        } else {
          let index = menus.push({
            path: s.path,
            name: comName,
            meta: {
              title: s.title
            },
            levelId: s.levelId,
            icon: s.icon,
            children: []
          })
          indexKey[s.levelId] = index - 1
        }
      })
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
      // router.onReady(() => {
      //   resolve(routerList)
      // }, (err) => {
      //   console.log(err)
      //   reject(err)
      // })
      setTimeout(() => {
        resolve(menus)
      }, 100);
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

export default addRouter