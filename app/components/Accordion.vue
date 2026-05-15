<script setup lang="ts">
import type { PropType } from 'vue';
import type { SectionsEnum } from '~/utils/types/SectionsTypes';
import { SVG_ICON_COMPONENTS_MAP } from '~/constants/SvgIconComponentsMap';
import useSections from '~/composables/useSections';

const { activeSections } = defineProps({
  activeSections: {
    type: Array as PropType<Array<keyof typeof SectionsEnum>>,
    default: () => [],
  },
});

const { contentSections } = useSections();
const sectionsToDisplay = contentSections.value.filter(
  (section) => activeSections.includes(section.sectionName) || !activeSections.length,
);

const items = sectionsToDisplay.map(({ sectionName, sectionLabel }) => {
  return {
    label: sectionLabel,
    sectionName: sectionName,
    svgIconComponent: SVG_ICON_COMPONENTS_MAP[sectionName],
  };
});

const accordionUi = {
  root: 'flex flex-col w-full gap-y-2',
  item: 'border-0 mb-0',
  trigger: 'flex-1 flex items-center gap-3 text-black bg-green-400 hover:bg-green-500 rounded-2xl px-3 py-2 w-full group cursor-pointer transition-colors duration-200',
  label: 'font-primary text-2xl leading-none truncate',
  leadingIcon: 'hidden',
  content: 'overflow-hidden data-[state=open]:animate-[accordion-down_200ms_ease-out] data-[state=closed]:animate-[accordion-up_200ms_ease-out]',
  body: 'pt-3 pb-1',
};
</script>

<template>
  <div>
    <ClientOnly>
      <UAccordion :items="items" :ui="accordionUi" type="multiple">
        <template #leading="{ item, open }">
          <div
            class="w-11 h-11 p-1 rounded-full bg-primary-500 group-hover:bg-green-500 flex items-center justify-center -my-1 transition-colors duration-200 shrink-0"
          >
            <component :is="item.svgIconComponent" :class="[open && 'animate-bounce']" />
          </div>
        </template>

        <template #trailing="{ open }">
          <UIcon
            name="i-heroicons-chevron-down-20-solid"
            class="w-8 h-8 ms-auto scale-[1.2] transform transition-transform duration-200"
            :class="[open && 'rotate-180']"
          />
        </template>

        <template #body="{ item }">
          <CategoryList :section-name="item.sectionName" />
        </template>
      </UAccordion>
      <template #fallback>
        <div class="flex flex-col w-full gap-y-2">
          <div v-for="n in 5" :key="n" class="h-14 rounded-2xl bg-gray-100 animate-pulse" />
        </div>
      </template>
    </ClientOnly>
  </div>
</template>

<style scoped lang="scss"></style>
