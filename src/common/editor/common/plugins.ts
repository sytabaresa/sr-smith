import { createMyPlugins } from "@editor/types";
import { basicNodesPlugins } from "./basicNodesPlugin";
import { createClipboardPlugin } from "@editor/clipboard/createClipboardPlugin";

export const plugins = createMyPlugins(
    [
        ...basicNodesPlugins,
        createClipboardPlugin(),
    ]
);