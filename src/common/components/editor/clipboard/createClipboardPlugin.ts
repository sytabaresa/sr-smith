import { createPluginFactory } from '@udecode/plate-headless';
import { changeClipboardContent } from './changeClipboard';
import { MyValue } from '../types';

export const createClipboardPlugin = createPluginFactory({
    key: 'clipboard',
    handlers: {
        // onCopy: changeClipboardContent,
    }
});
