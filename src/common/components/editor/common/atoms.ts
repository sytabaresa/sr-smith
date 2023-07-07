import { MyValue, createMyPlugins } from "@components/editor/types";
import { createPlateEditor } from "@udecode/plate-common";
import { WritableAtom, atom } from "jotai";

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

export const changeCodeAtom = atom<MyValue>(null) as WritableAtom<MyValue, [MyValue], void>
export const changeAtom = atom<MyValue>(null) as WritableAtom<MyValue, [MyValue], void>
export const selectionAtom = atom<object>({}) as WritableAtom<object, [object], void>
