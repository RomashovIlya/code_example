/* meta -------------------------------------------------------------------------------------
...
--------------------------------------------------------------------------------------------- */

import Vue from 'vue'
import Router from 'vue-router'

/* MAIN */
import MainPage from '~/pages/main/main'

/* ... */

/* CUSTOM */
import Showcase from '~/pages/showcase/showcase'


Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: 'history',
    linkActiveClass: 'r-link-active',
    linkExactActiveClass: 'r-link-exact-active',

    scrollBehavior(to, from, savedPosition) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({ x: 0, y: 0 })
        }, 200)
      })
    },

    routes: [
      /* MAIN */
      {
        path: '/',
        name: 'main',
        component: MainPage,
        meta: {
          title: 'Главная'
        }
      },

      /* ... */

      /* CUSTOM */
      {
        path: '/:id',
        name: 'showcase',
        component: Showcase,
        meta: {
          title: 'Витрина',
        }
      }
    ]
  })
}