<script setup lang="ts">
import { transliterate } from '~/utils';

const props = defineProps({
  section: {
    type: Object,
    required: true,
  },
});

const { section } = toRefs(props);

const isOpen = ref(false);

function onMouseEnter() {
  isOpen.value = true;
}

function onMouseLeave() {
  isOpen.value = false;
}

const sectionTo = computed(() => `/${transliterate(section.value.sectionLabel)}`);

const sectionCategories = computed(() => {
  if (!section.value.categories || !Array.isArray(section.value.categories)) {
    return [[]];
  }

  if (section.value.categories.length === 0) {
    return [[]];
  }

  return [
    section.value.categories.map((category: any) => ({
      label: category.label,
      to: category.to,
      children:
        category.articles?.length > 0
          ? [
              category.articles.map((article: any) => ({
                label: article.label,
                to: article.to,
              })),
            ]
          : undefined,
    })),
  ];
});

const dropdownUi = {
  content:
    'category-dropdown-container w-fit min-w-(--reka-dropdown-menu-trigger-width) pt-3 pr-3 z-[100] shadow-none ring-0 bg-transparent data-[state=closed]:animate-none data-[side=right]:pt-[3px]',
  viewport: 'category-dropdown-viewport flex flex-col gap-2',
  group: 'category-dropdown-group flex flex-col gap-1 p-0',
  item: 'category-link-wrapper pl-2 font-primary text-left text-lg bg-green-400 border-3 border-green-800 transition-all duration-100 first-of-type:rounded-tr-[18px] last-of-type:rounded-b-[18px] hover:bg-orange-300 hover:border-orange-900 has-[.active]:bg-orange-400 has-[.active]:border-orange-700 [&_a]:w-full',
  itemWrapper: 'justify-start',
};
</script>

<template>
  <div
    class="header-section relative"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <DvDropdown
      :items="sectionCategories"
      :ui="dropdownUi"
      :open="isOpen"
      :portal="false"
      :content="{ side: 'bottom', align: 'start', sideOffset: 0 }"
    >
      <NuxtLink
        :to="sectionTo"
        class="activator-first-level flex items-center justify-center leading-none outline-none transition-all duration-300 rounded-b-[18px] px-3 pt-[10px] pb-1 bg-green-400 border-3 border-green-800 border-t-0"
        :class="{ 'is-open': isOpen }"
        active-class="active"
        exact-active-class="exact-active"
      >
        <span>{{ section.sectionLabel }}</span>
      </NuxtLink>

      <template #item="{ item }">
        <NuxtLink
          v-if="item.children"
          :to="item.to"
          class="block text-inherit no-underline"
          active-class="active"
          >{{ item.label }}</NuxtLink
        >
        <span v-else>{{ item.label }}</span>
      </template>
    </DvDropdown>
  </div>
</template>

<style lang="scss">
.activator-first-level {
  &:hover,
  &.is-open {
    padding-bottom: 10px;
    background: $orange-300;
    border-color: $orange-900;
  }

  &.active {
    padding-bottom: 12px;
    background: $orange-400;
    border-color: $orange-focus;
  }

  span {
    font-family: $font-family-primary;
    font-size: clamp(1.375rem, 1.15rem + 0.4vw, 1.625rem);
  }
}

.category-dropdown-container {
  .category-link-wrapper * {
    font-family: $font-family-primary;
  }
}
</style>
