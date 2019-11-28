import router from './index'
let routerList = []
let indexKey = {}

function addRouter(list) {
  return new Promise((resolve, reject) => {
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
    console.log(routerList)
    router.addRoutes(routerList)
    router.onReady(() => {
      resolve(routerList)
    }, (err) => {
      console.log(err)
      reject(err)
    })
  })
}

export default addRouter