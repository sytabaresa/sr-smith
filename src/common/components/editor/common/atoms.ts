import { createMyPlugins } from "@components/editor/types";
import { createPlateEditor } from "@udecode/plate-headless";
import { atom } from "jotai";
import { Descendant } from "slate";
import { createPlateUI } from "@components/editor/createPlateUI";

// plugins
import { basicNodesPlugins } from "@components/editor/basic-nodes/basicNodesPlugin";
import { createClipboardPlugin } from "@components/editor/clipboard/createClipboardPlugin";
import { createPreviewPlugin } from "@components/editor/preview/createPreviewPlugin";
import { createCodeNormalizePlugin } from "@components/editor/normalize/createCodeNormalizePlugin";
import { createColorPlugin } from "@components/editor/color/createColorPlugin";

const plugins = createMyPlugins(
    [
        ...basicNodesPlugins,
        createClipboardPlugin(),
        createPreviewPlugin(),
        createCodeNormalizePlugin(),
        createColorPlugin(),
    ],
    {
        components: createPlateUI(),
    });


export const editorAtom = atom(
    createPlateEditor({
        id: '',
        plugins: plugins
    }))

export const changeCodeAtom = atom<Descendant[]>(null)
export const changeAtom = atom<Descendant[]>(null)
export const selectionAtom = atom<object>({})
