// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [{ name: 'description', content: 'My amazing site' }],
      link: [
        { rel: 'icon', href: '/favicon.svg' },
        { rel: 'stylesheet', href: '/fonts/fonts.css' },
      ],
    },
  },

  nitro: {
    preset: 'static',
    static: true,
    prerender: {
      // Seed the crawler with the section index pages.
      // From each section page the item cards link onwards to category and article pages.
      routes: ['/ovochi', '/yahidni-roslyny', '/kvity', '/dobryva', '/inventar', '/shkidnyky-i-khvoroby'],
    },
  },

  image: {
    provider: 'none',
  },

  devtools: { enabled: true },

  // base styles
  css: ['@/assets/css/tailwind.css', '@/assets/scss/styles.scss', '@/assets/scss/main.scss'],

  // variables, fonts, mixins, etc.
  vite: {
    plugins: [tailwindcss()],
    build: {
      sourcemap: false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/assets/scss/abstracts/mixins" as *;`,
        },
      },
    },
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
      ],
    },
  },

  modules: [
    '@nuxt/ui',
    '@nuxt/image',
    '@nuxt/content',
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@nuxtjs/sitemap',
  ],

  experimental: {
    defaults: {
      nuxtLink: {
        prefetch: false,
      },
    },
  },

  site: {
    url: 'https://dachnyi-vrozhai.com.ua',
  },

  compatibilityDate: '2025-05-24',
});
