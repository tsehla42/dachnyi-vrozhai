<script setup lang="ts">
const footerLinks = [
  {
    to: '/',
    label: 'Головна',
  },
  {
    to: '/test',
    label: 'Випадкова сторінка',
  },
  {
    to: '/test',
    label: 'Мапа сайту',
  },
];
</script>

<template>
  <footer>
    <div class="footer-content">
      <div class="footer-links">
        <NuxtLink v-for="link in footerLinks" :key="link.to" :to="link.to" class="link">
          <SvgIconTomato />
          <span>{{ link.label }}</span>
        </NuxtLink>
      </div>
    </div>
    <p class="copyright">Усі права захищені. dachiy-vrozhai.com.ua 2026</p>
  </footer>
</template>

<style scoped lang="scss">
footer {
  display: flex;
  flex-flow: column;
  height: 160px;
  border-top: 6px solid $green-800;
  background: $green-600;

  .footer-content {
    @include flex-center;
    height: 100%;
    background: url('../assets/svg/logo-letters-dv.svg') no-repeat;
    background-size: contain;

    .footer-links {
      display: flex;
      gap: 18px;
      width: fit-content;
      padding: 8px 25px;
      border-radius: 16px;
      background-color: rgba($black, 0.42);

      .link {
        @include flex-center();
        gap: 8px;
        color: $orange-150;

        &.router-link-active {
          color: $orange-300;
        }
      }
    }
  }

  .copyright {
    font-size: 14px;
    text-align: center;
  }
}
</style>
