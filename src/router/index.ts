import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import BookView from '@/views/BookView.vue'
import NewBookView from '@/views/NewBookView.vue'
import EditBook from '@/views/EditBook.vue'
import WishlistView from '@/views/WishlistView.vue'
import NewWishlistView from '@/views/NewWishlistView.vue'
import AboutView from '@/views/AboutView.vue'


import { AuthService } from '@/services/auth.service'
import RegisterView from '@/views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path:'/book',
      name:'book',
      component: BookView,
    },
    {
      path:'/book/new',
      name:'new-book',
      component: NewBookView,
      beforeEnter: (to, from, next) => {
        
        try {
          const name = AuthService.getUser()
          if (name === 'admin@admin.com') {
            next()
          } else {
            alert("You don't have authorization to do that")
            next('/book')
          }
        } catch {
          next('/login')
        }
      }
    },
    {
      path:'/book/:id',
      name:'edit-book',
      component: EditBook,
      beforeEnter: (to, from, next) => {
        try {
          const name = AuthService.getUser()
          if (name === 'admin@admin.com') {
            next()
          } else {
            alert("You don't have authorization to do that")
            next('/book')
          }
        } catch {
          next('/login')
        }
      }
    },
    {
      path:'/wishlist',
      name:'wishlist',
      component: WishlistView,
    },
    {
      path:'/wishlist/new',
      name:'new-wishlist',
      component:NewWishlistView,
    },
    {
      path: '/about',
      name: 'about',
      component:AboutView,
    },
    
  ],
})

export default router
