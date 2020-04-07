import Vue from 'vue'
import VueRouter from 'vue-router'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import routes from './routes'
import Master from './components/layouts/Master'
import Task from './components/tasks/task-list'
import { store } from './store'

window.eventBus = new Vue()

Vue.config.productionTip = false
Vue.use(VueRouter)

//components
Vue.component('task-list', Task);


const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.loggedIn) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.loggedIn) {
      next({
        name: 'task',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(Master)
})
