import { createRouter, createWebHistory } from 'vue-router'
import ContactList from '../views/ContactList.vue'
import ContactDetails from '../views/ContactDetails.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'contacts',
      component: ContactList,
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: ContactList,
    },
    {
      path: '/contacts/:id',
      name: 'contact',
      component: ContactDetails,
    },
    {
      path: '/:pathMatch(.*)',
      name: 'NotFound',
      component: NotFound,
    },
  ],
})

export default router
