<script setup lang="ts">
import type { PageCollectionItemBase } from '@nuxt/content';
import { SectionsEnum } from '~/utils/types/SectionsTypes';
import { transliterate, getSectionImageSrc, getCategoryImageSrc, getArticleImageSrc } from '~/utils';

interface PageDoc extends PageCollectionItemBase {
  section?: string;
  category?: string;
  article?: string;
}

const route = useRoute();
const { data: doc } = await useAsyncData<PageDoc | null>(`content-${route.path}`, async () => {
  const result = await queryCollection('content').path(route.path).first();
  return result as PageDoc | null;
});

// Map frontmatter section value (may be kebab-case, e.g. 'shkidnyky-i-khvoroby')
// to the SectionsEnum key that ItemList expects (e.g. 'shkidnykyIKhvoroby').
const sectionKey = computed(() => {
  const s = doc.value?.section;
  if (!s) return undefined;
  if (s in SectionsEnum) return s as keyof typeof SectionsEnum;
  return (Object.entries(SectionsEnum).find(([, ukr]) => transliterate(ukr) === s)?.[0]) as keyof typeof SectionsEnum | undefined;
});

// Hero image URL — only for article pages (ProseH1 injects it)
const heroImageSrc = computed<string | null>(() => {
  const d = doc.value;
  if (!d?.section) return null;
  if (d.article && d.category) return getArticleImageSrc(d.section, d.category, d.article);
  return null; // section/category pages handle image in template
});

// Provide to ProseH1 — only effective on article pages (null is ignored by ProseH1)
provide('heroImageSrc', heroImageSrc);

// Hero image for section/category pages (rendered explicitly in template)
const sectionCategoryImageSrc = computed<string | null>(() => {
  const d = doc.value;
  if (!d?.section) return null;
  if (d.article) return null; // handled by ProseH1
  if (d.category) return getCategoryImageSrc(d.section, d.category);
  return getSectionImageSrc(d.section);
});

const fallbackSrc = '/images/fallback/fallback-200x200.jpg';

const onHeroImageError = (e: string | Event) => {
  if (!(e instanceof Event)) return;
  const img = e.target as HTMLImageElement | null;
  if (!img || img.src.includes('fallback')) return;
  img.src = fallbackSrc;
};
</script>

<template>
  <div class="content-page container mx-auto px-4 sm:px-8 md:px-16">
    <div v-if="doc">
      <!-- Section/category pages: explicit h1 → cards → body text + hero image -->
      <template v-if="sectionKey && !doc.article">
        <h1 class="section-heading">{{ doc.title }}</h1>
        <div class="my-8">
          <ItemList
            v-if="!doc.category"
            :section-name="sectionKey"
          />
          <ItemList
            v-else
            :section-name="sectionKey"
            :category-name="doc.category"
          />
        </div>
        <div class="section-body">
          <NuxtImg
            v-if="sectionCategoryImageSrc"
            class="hero-image"
            :src="sectionCategoryImageSrc"
            width="400"
            height="300"
            loading="lazy"
            @error="onHeroImageError"
          />
          <ContentRenderer :value="doc" />
        </div>
      </template>

      <!-- Article pages: ContentRenderer renders h1 via ProseH1 (which injects hero image) -->
      <template v-else>
        <ContentRenderer :value="doc" />
      </template>

      <ClientOnly>
        <RandomArticle />
      </ClientOnly>
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

  // Section/category pages: suppress the h1 emitted by ContentRenderer
  // (we render our own explicit h1 above the item cards)
  // Note: :deep() is only valid in scoped styles — use plain descendant selector here
  .section-body h1 {
    display: none;
  }

  // Ensure floated hero image doesn't bleed past content area
  .section-body::after,
  & > div::after {
    content: '';
    display: table;
    clear: both;
  }
}
</style>

<style scoped lang="scss">
.hero-image {
  float: left;
  width: 400px;
  max-width: 100%;
  margin: 0 24px 0 0;
  border-radius: 0.5rem;
  object-fit: cover;
  aspect-ratio: 4 / 3;

  @media (max-width: 767px) {
    float: none;
    display: block;
    width: 100%;
    max-height: 300px;
    margin: 0 0 1rem 0;
  }
}
</style>
