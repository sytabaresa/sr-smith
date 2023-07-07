import { PlateEditor, createPluginFactory } from "@udecode/plate-common";
import { CodeBlockPlugin, ELEMENT_CODE_BLOCK, ELEMENT_CODE_LINE, ELEMENT_CODE_SYNTAX, } from "@udecode/plate-code-block"
import { MyValue } from "../types";
import { decorateCodeLine } from "./decoratePreview";
import withCodeNormalizer from "./withBlockCode";

export const createCodeBlockPlugin = createPluginFactory<
  CodeBlockPlugin,
  MyValue,
  PlateEditor<MyValue>
>({
  key: ELEMENT_CODE_BLOCK,
  isElement: true,
  decorate: decorateCodeLine,
  withOverrides: withCodeNormalizer,
  options: {
    hotkey: ['mod+opt+8', 'mod+shift+8'],
    syntax: true,
    syntaxPopularFirst: false,
  },
  plugins: [
    {
      key: ELEMENT_CODE_LINE,
      isElement: true,
    },
    {
      key: ELEMENT_CODE_SYNTAX,
      isLeaf: true,
    },
  ],
});