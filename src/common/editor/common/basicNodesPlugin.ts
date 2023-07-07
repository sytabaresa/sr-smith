import { basicMarksPlugins } from './basicMarksPlugins';
import { createPlateUI } from '../lib/create-plate-ui';
import { createMyPlugins } from '../types';
import { basicElementsPlugins } from './basicElementsPlugins';

export const basicNodesPlugins = createMyPlugins(
    [
        ...basicMarksPlugins,
        ...basicElementsPlugins,
        // createTrailingBlockPlugin({ options: { type: ELEMENT_CODE_BLOCK } }),
        // createNormalizeTypesPlugin({
        //     options: {
        //         rules: [
        //             { path: [0], strictType: ELEMENT_CODE_BLOCK },
        //             { path: [0, 0], strictType: ELEMENT_CODE_LINE }
        //         ],
        //     },
        // }),
        // createSoftBreakPlugin({
        //     options: {
        //         rules: [
        //             { hotkey: 'shift+enter' },
        //             {
        //                 hotkey: 'enter',
        //                 query: {
        //                     allow: [ELEMENT_CODE_BLOCK],
        //                 },
        //             },
        //         ],
        //     },
        // }),
        // createExitBreakPlugin({
        //     options: {
        //         rules: [
        //             {
        //                 hotkey: 'mod+enter',
        //             },
        //         ]
        //     }
        // }),
    ],
    {
        components: createPlateUI(),
    }
);
