import { MyValue, createMyPlugins } from "@editor/types";
import { PlateEditor, createPlateEditor } from "@udecode/plate-common";
import { WritableAtom, atom } from "jotai";

// plugins
import { basicNodesPlugins } from "./basicNodesPlugin";
import { createClipboardPlugin } from "@editor/clipboard/createClipboardPlugin";

export const plugins = createMyPlugins(
    [
        ...basicNodesPlugins,
        createClipboardPlugin(),
    ]
);

export const editorAtom = atom<PlateEditor<MyValue>>(
    createPlateEditor({
        id: '',
        plugins: plugins
    }))

export const changeAtom = atom<MyValue>(null) as WritableAtom<MyValue, [MyValue], void>
export const selectionAtom = atom<object>({}) as WritableAtom<object, [object], void>
