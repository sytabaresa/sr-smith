import { basicElementsPlugins } from '../basic-elements/basicElementsPlugin';
import { basicMarksPlugins } from '../basic-marks/basicMarksPlugins';
import { createPlateUI } from '../createPlateUI';
import { createMyPlugins } from '../types';

export const basicNodesPlugins = createMyPlugins(
    [
        ...basicElementsPlugins,
        ...basicMarksPlugins
    ],
    {
        components: createPlateUI(),
    }
);
