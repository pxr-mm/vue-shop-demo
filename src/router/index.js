import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/components/login.vue'
import Welcome from '@/components/Welcome.vue'
// import Users from '@/views/Users/user.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue'),
    redirect: '/Welcome',
    children: [
      { path: '/Welcome', component: Welcome },
      {
        path: '/users',
        component: () => import('../views/Users/user.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 挂载路由导航守卫-控制访问权限
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
