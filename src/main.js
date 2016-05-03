import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import NProgress from 'nprogress'
import { str_limit } from './filters'

Vue.use(VueRouter)
Vue.use(VueResource)

// Vue.http.headers.common['X-CSRF-TOKEN'] = document.querySelector('#token').getAttribute('value')
Vue.http.interceptors.push({
  request: function (request) {
    if (['post', 'put', 'patch', 'delete'].indexOf(request.method) !== -1) {
      NProgress.start()
    }

    return request
  },

  response: function (response) {
    if (response.ok) {
      NProgress.done()
    }

    return response
  }

})

Vue.filter('str_limit', str_limit)

export var router = new VueRouter({
  history: true,
  linkActiveClass: 'active'
})

router.beforeEach(function (transition) {
  var randomSet = Array(0.2, 0.4, 0.6)[Math.floor(Math.random() * 3)]
  NProgress.set(randomSet)
  setTimeout(function () {
    transition.next()
  }, 800)
})

router.afterEach(function (transition) {
  NProgress.done()
})

router.redirect({
  '/': '/home'
})

router.map({
  '*': {
    component: NotFound
  },
  '/home': {
    name: 'home',
    component: Home
  },
  '/note/:id': {
    name: 'note',
    component: Home
  },
  '/about': {
    name: 'about',
    component: About
  },
})

router.start(App, '#app')

// twitter bootstrap, jquery
require('bootstrap-sass')
require('./lib/scripts')()
