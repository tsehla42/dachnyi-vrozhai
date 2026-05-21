<script setup lang="ts">
import { SVG_ICON_COMPONENTS_MAP } from '~/constants/SvgIconComponentsMap';
import { transliterate } from '~/utils';

const { contentSections } = useSections();

const openCategories = reactive<Record<string, boolean>>({});

function toggleCategory(key: string) {
  openCategories[key] = !openCategories[key];
}

function categoryKey(sectionName: string, categoryName: string): string {
  return `${sectionName}__${categoryName}`;
}

function sectionTo(sectionLabel: string): string {
  return '/' + transliterate(sectionLabel);
}
</script>

<template>
  <div class="page container mx-auto px-4 sm:px-8 md:px-16 py-8">
    <div class="flex justify-center items-center gap-2 mb-12">
      <SvgIconLogoDachniy class="w-44 h-auto" />
      <SvgIconLogoVrozhai class="w-44 h-auto" />
    </div>

    <nav class="flex flex-col gap-8 max-w-[720px] mx-auto" aria-label="Карта сайту">
      <div v-for="section in contentSections" :key="section.sectionName" class="section-node flex flex-col">
        <NuxtLink
          :to="sectionTo(section.sectionLabel)"
          class="section-header flex items-center gap-3 bg-green-400 rounded-2xl px-4 py-2 mb-1 text-xl font-semibold no-underline text-inherit transition-colors duration-150 hover:bg-green-500"
        >
          <div class="section-icon-wrap w-10 h-10 p-1 rounded-full bg-green-500 flex items-center justify-center shrink-0">
            <component :is="SVG_ICON_COMPONENTS_MAP[section.sectionName]" />
          </div>
          <span class="section-label">{{ section.sectionLabel }}</span>
        </NuxtLink>

        <div class="categories-list">
          <div
            v-for="category in section.categories"
            :key="category.categoryName"
            class="category-node"
          >
            <div
              class="category-header flex items-center rounded-lg transition-colors duration-150 hover:bg-green-200 cursor-pointer"
              role="button"
              tabindex="0"
              :aria-expanded="openCategories[categoryKey(section.sectionName, category.categoryName)] ? 'true' : 'false'"
              @click="toggleCategory(categoryKey(section.sectionName, category.categoryName))"
              @keydown.enter.prevent="toggleCategory(categoryKey(section.sectionName, category.categoryName))"
              @keydown.space.prevent="toggleCategory(categoryKey(section.sectionName, category.categoryName))"
            >
              <UIcon
                name="i-heroicons-chevron-right-20-solid"
                class="category-chevron w-5 h-5 shrink-0 mx-2 transition-transform duration-200"
                :class="{ 'rotate-90': openCategories[categoryKey(section.sectionName, category.categoryName)] }"
              />
              <NuxtLink
                :to="category.to"
                class="category-label-link py-1.5 pr-3 text-lg text-gray-900 no-underline hover:underline"
                @click.stop
              >{{ category.label }}</NuxtLink>
            </div>

            <div
              class="articles-list overflow-hidden border-l-2 border-orange-300 ml-10"
              :class="{ open: openCategories[categoryKey(section.sectionName, category.categoryName)] }"
            >
              <NuxtLink
                v-for="article in category.articles"
                :key="article.to"
                :to="article.to"
                class="article-link block py-0.5 px-3 text-base text-orange-700 rounded hover:text-orange-500 hover:underline transition-colors duration-150"
              >
                {{ article.label }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped lang="scss">
.categories-list {
  border-left: 2px solid $green-600;
  margin-left: 1.5rem;
}

.category-node {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 1.1rem;
    left: 0;
    width: 0.75rem;
    height: 2px;
    background: $green-600;
    transform: translateX(-100%);
  }
}

.articles-list {
  max-height: 0;
  transition: max-height 0.3s ease;

  &.open {
    max-height: 2000px;
  }
}
</style>
