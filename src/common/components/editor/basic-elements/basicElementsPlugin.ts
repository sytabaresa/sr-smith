import {
  createLinkPlugin,
  createParagraphPlugin
} from "@udecode/plate-headless"

import { createPlateUI } from '../createPlateUI';
import { createMyPlugins } from '../types';

export const basicElementsPlugins = createMyPlugins(
  [
    //   createBlockquotePlugin(),
    //   createCodeBlockPlugin(),
    //   createHeadingPlugin(),
    createParagraphPlugin(),
  ],
  {
    components: createPlateUI(),
  }
);
