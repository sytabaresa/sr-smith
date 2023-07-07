import { createMyPlugins } from '../types';
// import { createAutolinkPlugin } from '../autolinker/createAutolinkPlugin';
import { createColorPlugin } from '../color/createColorPlugin';

export const basicMarksPlugins = createMyPlugins(
    [
        // createAutolinkPlugin(),
        createColorPlugin(),
    ]
);