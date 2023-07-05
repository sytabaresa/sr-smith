import {
  ELEMENT_LINK,
    ELEMENT_PARAGRAPH,
    MARK_BOLD,
    MARK_CODE,
    MARK_COLOR,
    MARK_HIGHLIGHT,
    MARK_SEARCH_HIGHLIGHT,
    PlatePluginComponent,
    withProps,
  } from '@udecode/plate-headless';
  import tw from 'tailwind-styled-components';
  import { DefaultPlatePluginKey } from './DefaultPlatePluginKey';
  import BaseElement from './components/BaseElement';
  import BaseLeaf from './components/BaseLeaf';
  
  export const createPlateUI = <T extends string = string>(
    overrideByKey?: Partial<
      Record<DefaultPlatePluginKey | T, PlatePluginComponent>
    >
  ) => {
    const components = {
      [ELEMENT_PARAGRAPH]: withProps(BaseElement, {
        as: 'p',
        className: `border-base-300 border-t first:border-t-0` //${element.error ? 'border-error border-r-4' : ''}`} 
      }),
      [MARK_BOLD]: withProps(BaseLeaf, { as: 'strong' }),
      [MARK_CODE]: withProps(BaseLeaf, {
        as: 'code',
        className: tw`whitespace-pre-wrap text-sm font-mono bg-neutral-200 rounded-sm px-2 py-1`
      }),
      [MARK_HIGHLIGHT]: withProps(BaseLeaf, {
        as: 'mark',
        className: "bg-yellow-100"
      }),
      [MARK_SEARCH_HIGHLIGHT]: withProps(BaseLeaf, {
        as: 'span',
        className: "bg-yellow-200"
      }),
    };
    
    if (overrideByKey) {
      Object.keys(overrideByKey).forEach((key) => {
        (components as any)[key] = (overrideByKey as any)[key];
      });
    }
  
    return components as Record<DefaultPlatePluginKey | T, PlatePluginComponent>;
  };