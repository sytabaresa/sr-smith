import { createMyPlugins } from '../types';
// import { CodeBlockPlugin, createCodeBlockPlugin } from '@udecode/plate-code-block';
import { createCodeBlockPlugin } from "../code/createCodeBlockPlugin";

export const basicElementsPlugins = createMyPlugins(
  [
    createCodeBlockPlugin()
  ]
);
