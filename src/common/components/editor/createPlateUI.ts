import {
  PlatePluginComponent,
  withProps,
} from '@udecode/plate-common';
import {
  MARK_BOLD,
  MARK_CODE,
} from "@udecode/plate-basic-marks"

import {
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE
} from "@udecode/plate-code-block"

import { DefaultPlatePluginKey } from './DefaultPlatePluginKey';
import BaseElement from './components/BaseElement';
import BaseLeaf from './components/BaseLeaf';

export const createPlateUI = <T extends string = string>(
  overrideByKey?: Partial<
    Record<DefaultPlatePluginKey | T, PlatePluginComponent>
  >
) => {
  const components = {
    [ELEMENT_CODE_BLOCK]: withProps(BaseElement, {
      as: 'div',
      className: `border-base-300 border-t first:border-t-0` //${element.error ? 'border-error border-r-4' : ''}`} 
    }),
    [ELEMENT_CODE_LINE]: withProps(BaseLeaf, { as: 'div' }),
    [MARK_BOLD]: withProps(BaseLeaf, { as: 'strong' }),
    [MARK_CODE]: withProps(BaseLeaf, {
      as: 'code',
      className: `whitespace-pre-wrap text-sm font-mono bg-neutral-200 rounded-sm px-2 py-1`
    }),
  };

  if (overrideByKey) {
    Object.keys(overrideByKey).forEach((key) => {
      (components as any)[key] = (overrideByKey as any)[key];
    });
  }

  return components as Record<DefaultPlatePluginKey | T, PlatePluginComponent>;
};