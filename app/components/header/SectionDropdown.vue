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

  return [section.value.categories.map((category: any) => ({
    label: category.label,
    to: category.to,
  }))];
});

const dropdownUi = {
  content: 'category-dropdown-container w-fit pt-0.5 z-[100] shadow-none ring-0',
  viewport: 'category-dropdown-viewport flex flex-col gap-2',
  group: 'category-dropdown-group flex flex-col gap-1 p-0',
  item: 'category-link-wrapper pl-2 font-primary text-base',
};


</script>

<template>
  <div class="header-section" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
    <DvDropdown :items="sectionCategories" :ui="dropdownUi" :open="isOpen" :portal="false">
      <NuxtLink :to="sectionTo" class="activator-first-level" active-class="active" exact-active-class="exact-active"><span>{{ section.sectionLabel }}</span></NuxtLink>
    </DvDropdown>
  </div>
</template>

<style lang="scss">
.header-section {
  position: relative;

  .activator-first-level {
    padding: 10px 12px 4px;
    background: $green-400;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    border: 3px solid $green-800;
    border-top: none;
    border-radius: 0 0 18px 18px;
    outline: none;
    transition: all 0.3s;

    &:hover {
      padding: 10px 12px 12px 12px;
      background: $orange-300;
      border: 3px solid $orange-900;
      border-top: none;
    }

    span {
      font-family: $font-family-primary;
      font-size: clamp(1.25rem, 1rem + 0.4vw, 1.5rem);
    }

    &.active {
      padding: 10px 12px 12px 12px;
      background: $orange-400;
      border: 3px solid $orange-focus;
      border-top: none;
    }
  }
}

.category-dropdown-container {
  &[data-state="closed"] {
    animation: none;
  }

  .category-link-wrapper {
    font-family: $font-family-primary;

    * {
      font-family: $font-family-primary;
      font-size: inherit;
    }

    @include section-category-dropdown-link;
  }
}
</style>
