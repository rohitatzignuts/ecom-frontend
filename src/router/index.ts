import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '@/views/ProductList.vue'
import OrderList from '@/views/OrderList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProductList,
    },
    {
      path: '/orders',
      name: 'orders',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: OrderList,
    },
  ],
})

export default router
