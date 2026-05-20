<script setup lang="ts">
const { getRandomArticlePath } = useContentArticles();
const goToRandomArticle = () => navigateTo(getRandomArticlePath());

const footerLinks = [
  {
    to: '/',
    label: 'Головна',
  },
  {
    to: '/test',
    label: 'Мапа сайту',
  },
];
</script>

<template>
  <footer class="flex flex-col h-40">
    <div class="footer-content h-full">
      <div class="flex gap-[18px] w-fit py-2 px-[25px] rounded-2xl bg-black/42">
        <NuxtLink v-for="link in footerLinks" :key="link.to" :to="link.to" class="link gap-2">
          <SvgIconTomato />
          <span>{{ link.label }}</span>
        </NuxtLink>
        <button class="link gap-2" @click="goToRandomArticle">
          <SvgIconTomato />
          <span>Випадкова сторінка</span>
        </button>
      </div>
    </div>
    <p class="text-sm text-center">Усі права захищені. dachiy-vrozhai.com.ua 2026</p>
  </footer>
</template>

<style scoped lang="scss">
footer {
  border-top: 6px solid $green-800;
  background: $green-600;

  .footer-content {
    @include flex-center;
    background: url('../assets/svg/logo-letters-dv.svg') no-repeat;
    background-size: contain;
  }

  .link {
    @include flex-center();
    color: $orange-150;
    font: inherit;

    &.router-link-active {
      color: $orange-300;
    }

    &:is(button) {
      appearance: none;
      background: none;
      border: none;
      padding: 0;
      cursor: pointer;
    }
  }
}
</style>
