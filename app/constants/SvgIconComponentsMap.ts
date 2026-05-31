import {
  SvgIconTomato,
  SvgIconFlower,
  SvgIconBug,
  SvgIconBag,
  SvgIconPickaxe,
  SvgIconStrawberry,
} from '~/components/svg';

import type { SectionsMapEN } from '~/utils/types/SectionsTypes';
import type { Component } from 'vue';
import { markRaw } from 'vue';

export const SVG_ICON_COMPONENTS_MAP: SectionsMapEN<Component> = {
  ovochi: markRaw(SvgIconTomato),
  yahidniRoslyny: markRaw(SvgIconStrawberry),
  kvity: markRaw(SvgIconFlower),
  shkidnykyIKhvoroby: markRaw(SvgIconBug),
  dobryva: markRaw(SvgIconBag),
  inventar: markRaw(SvgIconPickaxe),
};
