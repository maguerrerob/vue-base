// router/router.js

import { createRouter, createWebHistory } from 'vue-router'
// Import your components
import Home from '@/components/Home.vue';
import Buscador from '@/components/Buscador.vue';
import Film from '@/components/Film.vue';
import Watchlist from '@/components/Watchlist.vue';
import Carrusel from '@/components/Carrusel.vue';
import Movie from '@/component/Movie.vue';


// Define your routes
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home/:id',
      component: Home
    },
    {
      path: '/Buscador',
      name: 'Buscador',
      component: Buscador
    },
    {
      path: '/Film',
      name: 'Film',
      component: Film
    },
    {
      path: '/Carrusel',
      name: 'Carrusel',
      component: Carrusel
    },
    {
      path: '/Watchlist',
      name: 'Watchlist',
      component: Watchlist
    },
    {
      path: '/Movie/:id?',
      name: 'Movie',
      component: Movie
    }
  ]
})
// Create the router instance

export default router;
