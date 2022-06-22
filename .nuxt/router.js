import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _53bc8550 = () => interopDefault(import('..\\pages\\all.vue' /* webpackChunkName: "pages/all" */))
const _27621de0 = () => interopDefault(import('..\\pages\\AllUsers.vue' /* webpackChunkName: "pages/AllUsers" */))
const _168715b4 = () => interopDefault(import('..\\pages\\CreateUserLog.vue' /* webpackChunkName: "pages/CreateUserLog" */))
const _688c0a38 = () => interopDefault(import('..\\pages\\home.vue' /* webpackChunkName: "pages/home" */))
const _13bf493a = () => interopDefault(import('..\\pages\\Loghome.vue' /* webpackChunkName: "pages/Loghome" */))
const _09f40656 = () => interopDefault(import('..\\pages\\SuperUserLoghome.vue' /* webpackChunkName: "pages/SuperUserLoghome" */))
const _8be30b42 = () => interopDefault(import('..\\pages\\Users.vue' /* webpackChunkName: "pages/Users" */))
const _059aff6e = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _66c600f1 = () => interopDefault(import('..\\pages\\_id.vue' /* webpackChunkName: "pages/_id" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/all",
    component: _53bc8550,
    name: "all"
  }, {
    path: "/AllUsers",
    component: _27621de0,
    name: "AllUsers"
  }, {
    path: "/CreateUserLog",
    component: _168715b4,
    name: "CreateUserLog"
  }, {
    path: "/home",
    component: _688c0a38,
    name: "home"
  }, {
    path: "/Loghome",
    component: _13bf493a,
    name: "Loghome"
  }, {
    path: "/SuperUserLoghome",
    component: _09f40656,
    name: "SuperUserLoghome"
  }, {
    path: "/Users",
    component: _8be30b42,
    name: "Users"
  }, {
    path: "/",
    component: _059aff6e,
    name: "index"
  }, {
    path: "/:id",
    component: _66c600f1,
    name: "id"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
