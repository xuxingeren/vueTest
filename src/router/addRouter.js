import router from './index'
let routerList = []
let indexKey = {}

function addRouter(list) {
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
                require([`../views${s.path}.vue`], resolve)
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
              require([`../containers/index`], resolve)
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