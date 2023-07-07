import {
  PlatePluginComponent,
  withProps,
  PlateElement,
  PlateLeaf,
} from '@udecode/plate-common';
import {
  MARK_BOLD,
  MARK_CODE,
} from "@udecode/plate-basic-marks"

import {
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE
} from "@udecode/plate-code-block"

import { DefaultPlatePluginKey } from '../DefaultPlatePluginKey';
import { CodeBlockElement } from '../components/code-block-element';


export const createPlateUI = <T extends string = string>(
  overrideByKey?: Partial<
    Record<DefaultPlatePluginKey | T, PlatePluginComponent>
  >
) => {
  const components = {
    [ELEMENT_CODE_BLOCK]: CodeBlockElement,
    [ELEMENT_CODE_LINE]: withProps(PlateLeaf, { as: 'div' }),
    [MARK_BOLD]: withProps(PlateLeaf, { as: 'strong' }),
    [MARK_CODE]: withProps(PlateLeaf, {
      as: 'code',
      className: `whitespace - pre - wrap text - sm font - mono bg - neutral - 200 rounded - sm px - 2 py - 1`
    }),
  };

  if (overrideByKey) {
    Object.keys(overrideByKey).forEach((key) => {
      (components as any)[key] = (overrideByKey as any)[key];
    });
  }

  return components as Record<DefaultPlatePluginKey | T, PlatePluginComponent>;
};