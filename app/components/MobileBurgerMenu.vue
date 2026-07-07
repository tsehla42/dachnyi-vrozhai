<script setup lang="ts">
import useSections from '~/composables/useSections';
import { SVG_ICON_COMPONENTS_MAP } from '~/constants/SvgIconComponentsMap';
import { transliterate } from '~/utils';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

const { contentSections } = useSections();
const { getRandomArticlePath } = useContentArticles();
const route = useRoute();

const expandedSections = reactive<Record<string, boolean>>({});
const expandedCategories = reactive<Record<string, boolean>>({});

watch(() => props.isOpen, (open) => {
  if (open) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
    Object.keys(expandedSections).forEach((k) => (expandedSections[k] = false));
    Object.keys(expandedCategories).forEach((k) => (expandedCategories[k] = false));
  }
});

function toggleSection(sectionName: string) {
  const willOpen = !expandedSections[sectionName];
  Object.keys(expandedSections).forEach((k) => (expandedSections[k] = false));
  Object.keys(expandedCategories).forEach((k) => (expandedCategories[k] = false));
  if (willOpen) {
    expandedSections[sectionName] = true;
  }
}

function toggleCategory(categoryKey: string) {
  const willOpen = !expandedCategories[categoryKey];
  Object.keys(expandedCategories).forEach((k) => (expandedCategories[k] = false));
  if (willOpen) {
    expandedCategories[categoryKey] = true;
  }
}

function goToRandomArticle() {
  emit('close');
  navigateTo(getRandomArticlePath());
}

function closeAndNavigate() {
  emit('close');
}

function isHomeActive(): boolean {
  return route.path === '/';
}

function isSectionActive(sectionName: string): boolean {
  const section = contentSections.value?.find((s) => s.sectionName === sectionName);
  if (!section) return false;
  const sectionPath = '/' + transliterate(section.sectionLabel);
  return route.path === sectionPath || route.path.startsWith(sectionPath + '/');
}

function isCategoryActive(categoryTo: string): boolean {
  return route.path === categoryTo || route.path.startsWith(categoryTo + '/');
}

function isArticleActive(articleTo: string): boolean {
  return route.path === articleTo;
}
</script>

<template>
  <Teleport to="body">
    <Transition name="burger-menu">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-30 overflow-y-auto bg-[#FFF9F3] sm:hidden"
      >
        <!-- Gradient top strip -->
        <div
          class="h-[18px] w-full"
          :style="{ background: 'linear-gradient(290deg, var(--color-orange-400) 20.28%, var(--color-green-500) 52.52%)' }"
        />

        <!-- Header bar -->
        <div class="flex items-center justify-between pl-7 pt-[38px] pb-4">
          <h2 class="font-primary text-[32px] leading-none">меню</h2>
          <button
            class="px-4 text-black"
            aria-label="Закрити меню"
            @click="emit('close')"
          >
            <SvgIconClose />
          </button>
        </div>

        <!-- Navigation -->
        <nav class="burger-nav px-7 pb-8">
          <!-- Home -->
          <NuxtLink
            to="/"
            class="flex items-center gap-4 py-2.5"
            @click="closeAndNavigate"
          >
            <SvgIconLogoLetterD class="w-7 h-7 shrink-0" />
            <span class="font-primary text-xl" :class="{ 'glow-active': isHomeActive() }">Головна</span>
          </NuxtLink>

          <!-- Random article -->
          <button
            class="flex items-center gap-4 py-2.5 w-full text-left bg-transparent border-none p-0 cursor-pointer"
            @click="goToRandomArticle"
          >
            <SvgIconLogoLetterV class="w-7 h-7 shrink-0" />
            <span class="font-primary text-xl">Випадкова стаття</span>
          </button>

          <!-- Divider -->
          <div class="my-2 h-1 rounded bg-[#E8943A]" />

          <!-- Sections -->
          <div v-for="section in contentSections" :key="section.sectionName">
            <!-- Section header with split click areas -->
            <div class="flex items-center gap-4 py-2.5">
              <component :is="SVG_ICON_COMPONENTS_MAP[section.sectionName]" class="w-7 h-7 shrink-0 cursor-pointer" @click="toggleSection(section.sectionName)" />
              <NuxtLink
                :to="'/' + transliterate(section.sectionLabel)"
                class="font-primary text-xl"
                @click="closeAndNavigate"
              ><span :class="{ 'glow-active': isSectionActive(section.sectionName) }">{{ section.sectionLabel }}</span></NuxtLink>
              <UIcon
                name="i-heroicons-chevron-down-20-solid"
                class="ml-auto w-5 h-5 cursor-pointer transition-transform duration-200"
                :class="{ 'rotate-180': expandedSections[section.sectionName] }"
                @click="toggleSection(section.sectionName)"
              />
            </div>

            <!-- Categories (expandable, no icons) -->
            <div
              v-if="expandedSections[section.sectionName]"
              class="pl-12 pb-2"
            >
              <div
                v-for="category in section.categories"
                :key="category.to"
                class="category-item"
              >
                <div class="flex items-center gap-3 py-1.5">
                  <NuxtLink
                    :to="category.to"
                    class="font-primary"
                    style="font-size: 17px"
                    @click="closeAndNavigate"
                  ><span :class="{ 'glow-active': isCategoryActive(category.to) }">{{ category.label }}</span></NuxtLink>
                  <UIcon
                    v-if="category.articles && category.articles.length > 0"
                    name="i-heroicons-chevron-down-20-solid"
                    class="ml-auto w-4 h-4 cursor-pointer transition-transform duration-200"
                    :class="{ 'rotate-180': expandedCategories[category.to] }"
                    @click="toggleCategory(category.to)"
                  />
                </div>

                <!-- Articles (second level dropdown) -->
                <div
                  v-if="category.articles && category.articles.length > 0 && expandedCategories[category.to]"
                  class="pl-6 pb-1"
                >
                  <NuxtLink
                    v-for="article in category.articles"
                    :key="article.to"
                    :to="article.to"
                    class="block py-1 font-primary"
                    style="font-size: 14px"
                    @click="closeAndNavigate"
                  ><span :class="{ 'glow-active': isArticleActive(article.to) }">{{ article.label }}</span></NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped lang="scss">
.burger-menu-enter-active,
.burger-menu-leave-active {
  transition: transform 300ms ease-out;
}

.burger-menu-enter-from,
.burger-menu-leave-to {
  transform: translateX(100%);
}

.burger-nav :deep(a),
.burger-nav :deep(span) {
  font-family: var(--font-primary);
}

.glow-active {
  color: var(--color-orange-600);
  text-shadow: 0 0 20px var(--color-green-500);
}
</style>
