<script setup lang="ts">
import type { PageCollectionItemBase } from '@nuxt/content';
import { SectionsEnum } from '~/utils/types/SectionsTypes';
import { transliterate } from '~/utils';

interface PageDoc extends PageCollectionItemBase {
  section?: string;
  category?: string;
  article?: string;
}

const route = useRoute();
const { data: doc } = await useAsyncData<PageDoc>(`content-${route.path}`, () =>
  queryCollection<PageDoc>('content').path(route.path).first() as Promise<PageDoc | null>,
);

// Map frontmatter section value (may be kebab-case, e.g. 'shkidnyky-i-khvoroby')
// to the SectionsEnum key that CategoryList expects (e.g. 'shkidnykyIKhvoroby').
const sectionKey = computed(() => {
  const s = doc.value?.section;
  if (!s) return undefined;
  if (s in SectionsEnum) return s as keyof typeof SectionsEnum;
  return (Object.entries(SectionsEnum).find(([, ukr]) => transliterate(ukr) === s)?.[0]) as keyof typeof SectionsEnum | undefined;
});
</script>

<template>
  <div class="content-page container mx-auto px-4 sm:px-8 md:px-16">
    <div v-if="doc">
      <ContentRenderer :value="doc" />
      <template v-if="sectionKey && !doc.article">
        <div class="my-8">
          <CategoryList
            v-if="!doc.category"
            :section-name="sectionKey"
          />
          <CategoryList
            v-else
            :section-name="sectionKey"
            :category-name="doc.category"
          />
        </div>
      </template>
      <RandomArticle />
    </div>
    <NotFoundContent v-else />
  </div>
</template>

<style lang="scss">
.content-page {
  h1,
  h2 {
    font-family: $font-family-primary;
  }
}
</style>
