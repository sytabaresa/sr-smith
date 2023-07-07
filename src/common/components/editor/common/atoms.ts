import { createMyPlugins } from "@components/editor/types";
import { createPlateEditor } from "@udecode/plate-common";
import { atom } from "jotai";
import { Descendant } from "slate";

// plugins
import { basicNodesPlugins } from "./basicNodesPlugin";
import { createClipboardPlugin } from "@components/editor/clipboard/createClipboardPlugin";

export const plugins = createMyPlugins(
    [
        ...basicNodesPlugins,
        // createClipboardPlugin(),
    ]
);


export const editorAtom = atom(
    createPlateEditor({
        id: '',
        plugins: plugins
    }))

export const changeCodeAtom = atom<Descendant[]>(null)
export const changeAtom = atom<Descendant[]>(null)
export const selectionAtom = atom<object>({})
