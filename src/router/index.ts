import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '@/views/ProductList.vue'
import OrderList from '@/views/OrderList.vue'
import Account from '@/views/Account.vue'
import LoginOrRegister from '@/views/auth/LoginOrRegister.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: ProductList,
      meta: { layout: true },
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginOrRegister,
      meta: { layout: false },
    },
    {
      path: '/orders',
      name: 'orders',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: OrderList,
      meta: { layout: true },
    },
    {
      path: '/account',
      name: 'Account',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Account,
      meta: { layout: true },
    },
  ],
})

router.beforeEach((to, from) => {
  const authToken = localStorage.getItem("authToken")
  const isAuthenticated = !!authToken
  if (!isAuthenticated && to.name !== 'Login') {
    // Redirect unauthenticated user to the login page
    return { name: 'Login' };
  } else if (isAuthenticated && to.name === 'Login') {
    // Redirect authenticated user from login/register to the home page
    return { name: 'Home' };
  }
})
export default router
