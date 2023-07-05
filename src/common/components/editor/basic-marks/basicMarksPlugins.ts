import { createPlateUI } from '../createPlateUI';
import { createMyPlugins } from '../types';
import { createAutolinkPlugin } from '../autolinker/createAutolinkPlugin';

export const basicMarksPlugins = createMyPlugins(
    [
        //   createBoldPlugin(),
        //   createCodePlugin(),
        //   createItalicPlugin(),
        //   createStrikethroughPlugin(),
        //   createSubscriptPlugin(),
        //   createSuperscriptPlugin(),
        //   createUnderlinePlugin(),
        createAutolinkPlugin()
    ],
    {
        components: createPlateUI(),
    }
);