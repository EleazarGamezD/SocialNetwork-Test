import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
    },
  {
      path: '/photosGallery',
      name: 'photosGallery',
      component: () => import('../views/PhotosGalleryView.vue')
    },
    {
      path: '/videosGallery',
      name: 'videosGallery',
      component: () => import('../views/VideoGalleryView.vue')
    },
    {
      path: '/uploadMedia',
      name: 'uploadMedia',
      component: () => import('../components/UploadMedia.vue')}
  ]
})

export default router
