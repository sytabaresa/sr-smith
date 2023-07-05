import { createPluginFactory } from "@udecode/plate-headless";
import withParagraphs from "./withParagraph";

export const createCodeNormalizePlugin = createPluginFactory({
    key: 'jc-normalize',
    withOverrides: withParagraphs
});
