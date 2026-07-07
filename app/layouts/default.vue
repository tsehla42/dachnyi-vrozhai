<script setup lang="ts">
const isBurgerOpen = ref(false);
</script>

<template>
  <div class="app-wrapper min-h-full grid grid-rows-[auto_1fr_auto]">
    <Header :is-burger-open="isBurgerOpen" @open-burger="isBurgerOpen = true" />

    <main class="bg-orange-50 my-[18px]">
      <div class="max-w-7xl mx-auto w-full">
        <slot />
      </div>
    </main>

    <Footer />

    <MobileBurgerMenu :is-open="isBurgerOpen" @close="isBurgerOpen = false" />
  </div>
</template>

