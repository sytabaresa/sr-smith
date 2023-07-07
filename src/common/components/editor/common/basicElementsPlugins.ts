import { createPluginFactory } from '@udecode/plate-core';
import { createMyPlugins } from '../types';
import withCodeNormalizer from '../code/withBlockCode';
import { decorateCodeLine } from '../code/decoratePreview';
import { createCodeBlockPlugin } from '@udecode/plate-code-block';
// import { createCodeBlockPlugin } from "../code/createCodeBlockPlugin";

export const basicElementsPlugins = createMyPlugins(
  [
    createCodeBlockPlugin({
    }),
    createPluginFactory({
      key: 'test',
      decorate: decorateCodeLine,
      withOverrides: withCodeNormalizer,
    })()
  ]
);
