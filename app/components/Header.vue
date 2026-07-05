<script setup lang="ts">
import useSections from '~/composables/useSections';

const { contentSections } = useSections();
</script>

<template>
  <header class="hidden sm:block w-full sticky top-[-180px] z-10">
    <section class="header-top w-full flex justify-between h-[180px] px-6">
      <NuxtLink to="/" class="logo-wrapper flex drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]">
        <SvgIconLogoDachniy class="h-[180px]" width="250" />
        <SvgIconLogoVrozhai class="h-[180px]" width="250" />
      </NuxtLink>

      <div class="flex items-center justify-center">
        <p class="font-primary mt-7">Вирощуй разом з нами на дачному врожаї!</p>
      </div>
    </section>

    <section class="progress-bar border-b-[3px] border-green-800">
      <HeaderReadingProgressBar />
    </section>

    <section class="header-links w-full sticky top-0 h-[52px] flex overflow-x-auto scrollbar-none">
      <HeaderSectionDropdown
        v-for="section in contentSections"
        :key="section.sectionName"
        :section="section"
      />
    </section>
  </header>
</template>

<style scoped lang="scss">
.header-top {
  background: linear-gradient(290deg, var(--color-orange-400) 20.28%, var(--color-green-500) 52.52%);
}

.header-links {
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
