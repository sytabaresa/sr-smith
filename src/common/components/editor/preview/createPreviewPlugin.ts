import { createPluginFactory } from '@udecode/plate-core';
import { decoratePreview } from './decoratePreview';

export const createPreviewPlugin = createPluginFactory({
  key: 'preview-jc',
  decorate: decoratePreview,
});
