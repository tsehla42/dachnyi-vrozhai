<script setup lang="ts">
import type { SectionsEnum } from '~/utils/types/SectionsTypes';
import type { Category, Article } from '~/utils/types/CategoryTypes';
import useSections from '~/composables/useSections';
import { getImageSrc } from '~/utils';

const props = defineProps({
  sectionName: {
    type: String as PropType<keyof typeof SectionsEnum>,
    required: true,
  },
  categoryName: {
    type: String,
    default: '',
  },
});

const isArticleView = computed(() => !!props.categoryName);
const categoriesToDisplay = ref<Category[] | Article[]>([]);
const { sectionsMap } = useSections();

watchEffect(() => {
  if (props.sectionName && sectionsMap.value) {
    const categoriesBySection = sectionsMap.value[props.sectionName] as Category[] | undefined;
    const articleView = isArticleView.value;

    const articlesByCategory = articleView && categoriesBySection
      ? categoriesBySection.find((category) => category.categoryName === props.categoryName)?.articles ?? []
      : [];

    categoriesToDisplay.value = articleView ? articlesByCategory : (categoriesBySection ?? []);
  }
});
</script>

<template>
  <div
    v-if="sectionName"
    class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-y-3 sm:gap-5"
  >
    <ItemCard
      v-for="c in categoriesToDisplay"
      :key="c.label"
      :label="c.label"
      :to="c.to"
      :picture-src="getImageSrc(c)"
    />
  </div>
</template>

<style scoped lang="scss"></style>
