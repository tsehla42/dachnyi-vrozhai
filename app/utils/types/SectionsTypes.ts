import type { Category } from '~/utils/types/CategoryTypes';

type SectionNamesMapKeys = keyof typeof SectionsNamesMap;
type SectionNamesMapValues = (typeof SectionsNamesMap)[SectionNamesMapKeys];

export interface SectionsMapEN<T> extends Record<SectionNamesMapKeys, T> {}
export interface SectionsMapUA<T> extends Record<SectionNamesMapValues, T> {}

export enum SectionsEnum {
  ovochi = 'Овочі',
  kvity = 'Квіти',
  shkidnykyIKhvoroby = 'Шкідники і хвороби',
  dobryva = 'Добрива',
  inventar = 'Інвентар',
}

export const SectionsNamesMap = {
  ovochi: SectionsEnum.ovochi,
  kvity: SectionsEnum.kvity,
  shkidnykyIKhvoroby: SectionsEnum.shkidnykyIKhvoroby,
  dobryva: SectionsEnum.dobryva,
  inventar: SectionsEnum.inventar,
};

export interface ContentSection {
  sectionName: keyof typeof SectionsEnum;
  sectionLabel: SectionsEnum;
  categories: Category[];
}
