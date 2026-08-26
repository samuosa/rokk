import { ViteSSG } from 'vite-ssg'
import App from '@/App.vue'
import EventPage from '@/views/EventPage.vue'
import BandDetail from '@/views/BandDetail.vue'
import LightsPage from '@/views/LightsPage.vue'
import TemplatePage from '@/views/TemplatePage.vue'
import NotFound from '@/views/NotFound.vue'
import '@/styles/main.scss'

export const createApp = ViteSSG(
  App,
  {
    routes: [
      { path: '/', name: 'home', component: EventPage },
      { path: '/lineup/:slug', name: 'act-detail', component: BandDetail },
      { path: '/lights', name: 'lights', component: LightsPage },
      { path: '/template', name: 'template', component: TemplatePage },
      { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
    ],
    // Must match vite.config.ts's `base` (GitHub Pages project sites serve
    // from "/<repo>/", Ionos from "/"). Without this, vue-router matches
    // against the un-prefixed path and every route 404s on the client.
    base: import.meta.env.BASE_URL,
    scrollBehavior(to) {
      if (to.hash) return { el: to.hash, behavior: 'smooth' }
      return { top: 0 }
    },
  },
)
