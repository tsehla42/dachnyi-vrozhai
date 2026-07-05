<script setup lang="ts">
const { category } = defineProps({
  category: {
    type: Object,
    required: true,
  },
});

const categoryArticles = computed(() => {
  return category.articles ? [category.articles] : [[]];
});

const dropdownUi = {
  content: 'article-dropdown-container',
  viewport: 'article-dropdown-viewport flex flex-col gap-1',
  group: 'article-dropdown-group',
  item: 'article-link bg-green-400 border-3 border-green-800 transition-all duration-100 first-of-type:rounded-tr-[18px] last-of-type:rounded-b-[18px] hover:bg-orange-300 hover:border-orange-900 has-[.active]:bg-orange-400 has-[.active]:border-orange-700',
  ring: '',
};

const triggerUi = {
  strategy: 'override',
  base: 'activator-second-level px-[18px] py-[5px] [&_span]:font-primary [&_span]:text-xl',
  rounded: '',
  inline: '',
  color: {
    black: 'color',
  },
  variant: {
    solid: '',
    link: '',
  },
  padding: {
    sm: '',
  },
};
</script>

<template>
  <div class="category-link">
    <DvDropdown :items="categoryArticles" :ui="dropdownUi" placement="right-start">
      <DvButton class="activator-second-level" :ui="triggerUi" :label="category.label" :to="category.to" />

      <template #item="{ item }">
        {{ item.label }}
      </template>
    </DvDropdown>
  </div>
</template>

<style lang="scss">
.article-dropdown-container {
  width: max-content !important;
  margin-top: -5px !important;
}
</style>
