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
  viewport: 'article-dropdown-viewport',
  group: 'article-dropdown-group',
  item: 'article-link',
  ring: '',
};

const triggerUi = {
  strategy: 'override',
  base: 'activator-second-level',
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
.category-link {
  .activator-second-level {
    padding: 5px 18px;

    span {
      font-family: $font-family-primary;
      font-size: 20px;
    }
  }
}

.article-dropdown-container {
  width: max-content !important;
  margin-top: -5px !important;

  .article-dropdown-viewport {
    @include dropdown-style;
  }

  .article-link {
    display: block !important;
    padding: 6px 18px !important;
    font-family: $font-family-primary !important;
    font-size: 16px !important;
    @include section-category-dropdown-link;
  }
}

</style>
