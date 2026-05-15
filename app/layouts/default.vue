<script setup lang="ts"></script>

<template>
  <div class="app-wrapper">
    <Header />

    <main>
      <slot />
    </main>

    <Footer />
  </div>
</template>

<style scoped lang="scss">
.app-wrapper {
  min-height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;

  main {
    background: $orange-100;
    margin: 18px 0;
  }
}
</style>
