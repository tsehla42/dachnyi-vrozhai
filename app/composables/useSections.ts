import { SectionsEnum } from '~/utils/types/SectionsTypes';
import type { SectionsMapEN } from '~/utils/types/SectionsTypes';
import type { Category } from '~/utils/types/CategoryTypes';
import { transliterate } from '~/utils';
import { storeToRefs } from 'pinia';

import dobryvaData from '~/constants/content/dobryva.json';
import inventarData from '~/constants/content/inventar.json';
import kvityData from '~/constants/content/kvity.json';
import ovochiData from '~/constants/content/ovochi.json';
import shkidnykyData from '~/constants/content/shkidnyky-i-khvoroby.json';
import yahidniRoslynyData from '~/constants/content/yahidni-roslyny.json';

const sectionsDataMap: Record<string, any[]> = {
  dobryva: dobryvaData,
  inventar: inventarData,
  kvity: kvityData,
  ovochi: ovochiData,
  'shkidnyky-i-khvoroby': shkidnykyData,
  'yahidni-roslyny': yahidniRoslynyData,
};

export default function useSections() {
  const store = useSectionsStore();

  if (!store.sectionsMap) {
    const sectionCategoriesMap = (Object.entries(SectionsEnum) as [keyof typeof SectionsEnum, string][]).reduce(
      (acc, [enumKey, sectionNameUkr]) => {
        const sectionFilename = transliterate(sectionNameUkr);
        const categories = sectionsDataMap[sectionFilename] || [];

        return {
          ...acc,
          [enumKey]: categories,
        };
      },
      {} as SectionsMapEN<Category[]>,
    );

    store.setSectionsMap(sectionCategoriesMap);
    store.setContentSections(sectionCategoriesMap);
  }

  const { sectionsMap, contentSections } = storeToRefs(store);

  return {
    sectionsMap,
    contentSections,
  };
}

