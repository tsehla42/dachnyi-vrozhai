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
  <footer class="flex flex-col h-40 bg-green-600 border-t-[6px] border-green-800">
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

