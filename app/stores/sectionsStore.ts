import { defineStore } from 'pinia';
import type { ContentSection, SectionsMapEN } from '~/utils/types/SectionsTypes';
import { SectionsEnum } from '~/utils/types/SectionsTypes';
import type { Category } from '~/utils/types/CategoryTypes';
import type { Entries } from 'type-fest';

export const useSectionsStore = defineStore('sections', () => {
  const sectionsMap = ref<SectionsMapEN<Category[]> | null>(null);

  const setSectionsMap = (sectionCategoriesMap: SectionsMapEN<Category[]>) => {
    sectionsMap.value = sectionCategoriesMap;
  };

  const contentSections = ref<ContentSection[]>([]);

  const setContentSections = (sectionsMap: SectionsMapEN<Category[]>) => {
    contentSections.value = (Object.entries(SectionsEnum) as Entries<typeof SectionsEnum>).map(
      ([sectionName, sectionLabel]) => {
        return {
          sectionName,
          sectionLabel,
          categories: sectionsMap[sectionName] as Category[],
        };
      },
    );
  };

  return { sectionsMap, contentSections, setSectionsMap, setContentSections };
});
