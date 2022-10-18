//packages
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Cookies from 'js-cookie'

// views
import AppLogin from '../views/Auth/AppLogin.vue'
import TodosView from '../views/Todos/TodosView.vue'
import UsersView from '../views/UsersView/UsersView.vue'

// stores
import { useUserStore } from '@/store/models/model.user'

const isAuth = Boolean(Cookies.get('isAuth'));

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    component: AppLogin,
    beforeEnter: () => isAuth ? '/todos' : true
  },
  {
    path: "/users",
    component: UsersView,
    beforeEnter: () => {
      const store = useUserStore()
      if (!isAuth || !store.isAuthorized) return '/login'
    }
  },
  {
    path: "/todos",
    component: TodosView,
    beforeEnter: () => !isAuth ? '/login' : true
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
