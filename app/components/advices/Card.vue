<script setup lang="ts"></script>

<template>
  <NuxtLink
    to="/test"
    class="group relative flex flex-col p-2.5 bg-orange-100 border border-green-900 rounded-2xl hover:border-green-600 hover:bg-orange-200 transition-colors duration-200"
  >
    <div class="flex gap-3">
      <NuxtImg
        src="/images/ovochi/tsybulevi/tsybulevi.jpg"
        width="80"
        height="80"
        :placeholder="[8, 8]"
        class="w-20 h-20 flex-shrink-0 rounded-xl border-2 border-black object-cover"
      />

      <div class="min-w-0 flex-1">
        <h4 class="font-secondary text-xl md:text-2xl line-clamp-1">Як посадити цибулю на городі</h4>
        <p class="line-clamp-2">Покрокова інструкція з висадки цибулевих</p>
      </div>
    </div>

    <p class="mt-2 text-xs text-gray-500 group-hover:text-gray-800">25.07.2024, час на прочитання: 8 хв.</p>
    <SvgIconHorizontalCarrotBig
      class="absolute z-[1] w-1/6 h-1/6 opacity-0 group-hover:opacity-100 bottom-2.5 right-5 transition duration-200 group-hover:animate-horizontal-bounce"
    />
  </NuxtLink>
</template>

<style scoped lang="scss"></style>
