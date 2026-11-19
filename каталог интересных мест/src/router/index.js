import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PlaceDetailView from '@/views/PlaceDetailView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { getDestinationById } from '@/data/destinations'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Travel Places — Curated World Destinations' },
    },
    {
      path: '/place/:id',
      name: 'place-detail',
      component: PlaceDetailView,
      props: true,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: { title: 'Page Not Found — Travel Places' },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, behavior: 'smooth' }
  },
})

router.afterEach((to) => {
  if (to.name === 'place-detail') {
    const place = getDestinationById(String(to.params.id || ''))
    document.title = place
      ? `${place.name}, ${place.country} — Travel Places`
      : 'Destination Not Found — Travel Places'
  } else if (to.meta?.title) {
    document.title = to.meta.title
  }
})

export default router
