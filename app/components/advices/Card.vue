<script setup lang="ts"></script>

<template>
  <NuxtLink
    to="/test"
    class="group relative grid grid-cols-12 gap-2 p-2.5 bg-orange-100 border border-green-900 rounded-2xl hover:border-green-600 hover:bg-orange-200 transition-colors duration-200"
  >
    <NuxtImg
      src="/images/categories/tsybulevi.jpg"
      width="80"
      height="80"
      :placeholder="[8, 8]"
      class="col-start-1 col-end-3 rounded-xl border-2 border-black"
    />

    <div class="col-start-3 col-end-13">
      <h4 class="font-secondary text-2xl line-clamp-1">Як посадити цибулю на городі</h4>
      <p class="line-clamp-2">Покрокова інструкція з висадки цибулевих</p>
    </div>

    <p class="col-span-12 text-xs text-gray-500 group-hover:text-gray-800">25.07.2024, час на прочитання: 8 хв.</p>
    <SvgIconHorizontalCarrotBig
      class="absolute z-[1] w-1/6 h-1/6 opacity-0 group-hover:opacity-100 bottom-2.5 right-5 transition duration-200 group-hover:animate-horizontal-bounce"
    />
  </NuxtLink>
</template>

<style scoped lang="scss"></style>
