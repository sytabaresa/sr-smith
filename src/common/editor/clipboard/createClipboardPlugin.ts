import { createPluginFactory } from '@udecode/plate-common';
import { changeClipboardContent } from './changeClipboard';

export const createClipboardPlugin = createPluginFactory({
    key: 'clipboard',
    handlers: {
        onCopy: changeClipboardContent,
    }
});
