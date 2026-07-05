<script setup lang="ts"></script>

<template>
  <div class="app-wrapper min-h-full grid grid-rows-[auto_1fr_auto]">
    <Header />

      <main class="bg-orange-50 my-[18px]">
        <div class="max-w-7xl mx-auto w-full">
          <slot />
        </div>
      </main>

    <Footer />
  </div>
</template>

