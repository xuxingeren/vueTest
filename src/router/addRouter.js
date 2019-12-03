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
  children: [{
    path: '/test',
    name: 'Test',
    isAdd: true,
    component: () =>
      import('../views/Test'),
    meta: {
      title: 'test'
    }
  }, {
    path: '/403',
    name: '403',
    component: () => import('@/components/errorPage/403'),
    meta: {
      title: '403'
    }
  }, {
    path: '/404',
    name: '404',
    component: () => import('@/components/errorPage/404'),
    meta: {
      title: '404'
    }
  }, {
    path: '/500',
    name: '500',
    component: () => import('@/components/errorPage/500'),
    meta: {
      title: '500'
    }
  }]
}]
let indexKey = {}

function addRouter(list) {
  // import(`../views/workbench`).then(module => {
  //   console.log(module)
  // }).catch(err => {
  //   console.log(err)
  // })
  return new Promise((resolve, reject) => {
    try {
      list.map(s => {
        let comName = s.path.replace(/\/\w{1}/g, function (val) {
          return val.substring(1, 2).toUpperCase();
        })
        if (s.isLast) {
          let key = s.levelId.replace(/-\w+(?!.*-\w+)/, "")
          if (indexKey[key] !== undefined) {
            routerList[indexKey[key]].children.push({
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
              title: s.title,
              icon: s.icon,
              children: []
            })
          } else {
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
              title: s.title,
              icon: s.icon,
              children: []
            })
          }
        } else {
          let index = routerList.push({
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
            title: s.title,
            icon: s.icon,
            children: []
          })
          indexKey[s.levelId] = index - 1
        }
      })
      router.addRoutes([...routerList, {
        path: '*',
        redirect: '/404'
      }])
      console.log(routerList)
      // router.onReady(() => {
      //   resolve(routerList)
      // }, (err) => {
      //   console.log(err)
      //   reject(err)
      // })
      setTimeout(() => {
        resolve(routerList)
      }, 100);
    } catch (error) {
      console.log(error)
      reject(error)
    }
  })
}

export default addRouter