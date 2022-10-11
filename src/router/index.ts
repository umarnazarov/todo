import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Cookies from 'js-cookie'

import AppLogin from '../views/Auth/AppLogin.vue'
import TodosView from '../views/Todos/TodosView.vue'
import UsersView from '../views/UsersView/UsersView.vue'
import { useStoreTyped } from '@/store'
const isAuth = Boolean(Cookies.get('isAuth'));

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    component: AppLogin,
    beforeEnter: () => {
      if (isAuth) {
        return '/todos'
      }
    }
  },
  {
    path: "/users",
    component: UsersView,
    beforeEnter: () => {
      const store = useStoreTyped()
      if (!isAuth) {
        return '/login'
      }
    }
  },
  {
    path: "/todos",
    component: TodosView,
    beforeEnter: () => {
      if (!isAuth) {
        return '/login'
      }
    }
  },
  {
    path: "/",
    redirect: "/login"
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
