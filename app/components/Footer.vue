<script setup lang="ts">
const { getRandomArticlePath } = useContentArticles();
const goToRandomArticle = () => navigateTo(getRandomArticlePath());

const footerLinks = [
  {
    to: '/',
    label: 'Головна',
  },
  {
    to: '/sitemap',
    label: 'Мапа сайту',
  },
];
</script>

<template>
  <footer class="mobile-footer sm:hidden flex flex-col h-[146px] bg-green-600 border-t-[6px] border-green-800">
    <div class="flex items-center justify-between px-4 flex-1">
      <NuxtLink to="/" class="shrink-0">
        <SvgIconLogoLettersOverlappedDV class="h-[80px] w-auto" />
      </NuxtLink>

      <div class="flex flex-col gap-1 bg-black/42 rounded-lg py-2 px-3">
        <NuxtLink
          v-for="link in footerLinks"
          :key="link.to"
          :to="link.to"
          class="flex items-center gap-2 text-orange-100 text-sm font-[inherit] no-underline text-left [&.router-link-active]:text-orange-300"
        >
          <SvgIconTomato class="w-5 h-5 shrink-0" />
          <span>{{ link.label }}</span>
        </NuxtLink>
        <button
          class="flex items-center gap-2 text-orange-100 text-sm font-[inherit] appearance-none bg-transparent border-none p-0 cursor-pointer text-left [&.router-link-active]:text-orange-300"
          @click="goToRandomArticle"
        >
          <SvgIconTomato class="w-5 h-5 shrink-0" />
          <span>Випадкова сторінка</span>
        </button>
      </div>
    </div>

    <p class="text-xs text-center pb-1">Усі права захищені. dachiy-vrozhai.com.ua 2026</p>
  </footer>

  <footer class="desktop-footer hidden sm:flex flex-col h-40 bg-green-600 border-t-[6px] border-green-800">
    <div class="footer-content flex items-center justify-center h-full">
      <div class="flex gap-[18px] w-fit py-2 px-[25px] rounded-2xl bg-black/42">
        <NuxtLink v-for="link in footerLinks" :key="link.to" :to="link.to" class="link flex items-center justify-center gap-2 text-orange-100 font-[inherit] [&.router-link-active]:text-orange-300">
          <SvgIconTomato />
          <span>{{ link.label }}</span>
        </NuxtLink>
        <button class="link flex items-center justify-center gap-2 text-orange-100 font-[inherit] appearance-none bg-transparent border-none p-0 cursor-pointer [&.router-link-active]:text-orange-300" @click="goToRandomArticle">
          <SvgIconTomato />
          <span>Випадкова сторінка</span>
        </button>
      </div>
    </div>
    <p class="text-sm text-center">Усі права захищені. dachiy-vrozhai.com.ua 2026</p>
  </footer>
</template>

<style scoped lang="scss">
.footer-content {
  background: url('../assets/svg/logo-letters-dv.svg') no-repeat;
  background-size: contain;
}
</style>

