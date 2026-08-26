import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import { staticSitePaths } from './src/data/routes'

// Project-page GitHub Pages deploys need "/<repo-name>/"; the Ionos
// production domain serves from the root. Set at build time — see the
// GitHub Actions workflow and project/vue/README.md.
const basePath = process.env.VITE_BASE_PATH || '/'

export default defineConfig({
  base: basePath,
  plugins: [vue()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  css: {
    preprocessorOptions: {
      scss: { additionalData: '@use "@/styles/_tokens.scss" as t;' },
    },
  },
  // vite-ssg reads this block; every route below is emitted as static HTML.
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    includedRoutes: () => staticSitePaths(),
    dirStyle: 'nested',        // /index.html
    crittersOptions: false,    // keep the Google Fonts link untouched
    onFinished: () => {
      // eslint-disable-next-line no-console
      console.log('[ssg] prerender done:', staticSitePaths().join(', '))
    },
  },
})
