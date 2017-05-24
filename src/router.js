import Vue from 'vue'
import Router from 'vue-router'


function route(path, file, name, children) {
  
  return {
    exact: true,
    path,
    name,
    children,
    component: require(`./pages/${file}.vue`) 
  }
}

Vue.use(Router)

const router = new Router({
  base: __dirname,
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    route('/login', 'Login', 'login'),
    route('/404', '404', '404'),

    //path, file(*.vue), name, children
    
    route('/', 'Main', null, [
      route('/', 'Home', 'home'),
      route('/crud/:resource', 'Grid', 'grid'),
      route('/crud/:resource/:id/edit', 'Form', 'edit'),
      route('/crud/:resource/create', 'Form', 'create'),
      route('/crud/:resource/:id/:action', 'Form', 'action'),
      route('/crud/:resource/:action', 'Form', 'indexAction'),
      route('/example', 'Example'),
      route('/chat', 'Chat'),
      route('/about', 'About'),
    ]),
    

    // Global redirect for 404
    { path: '*', redirect: '/404' }
  ]
})

router.beforeEach((to, from, next) => {
  global.store.dispatch('checkPageTitle', to.path)  
  if (typeof ga !== 'undefined') {
    ga('set', 'page', to.path)
    ga('send', 'pageview')
  }
  next()
})


export default router
