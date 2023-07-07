import { RenderAfterEditable, createPluginFactory } from "@udecode/plate-common";
import { MyValue } from "../types";
import { FloatingLink } from "./floatingLink";
import { AutolinkerLeaf } from "./autolinker";

const MARK_AUTOLINK = 'link'

export const createAutolinkPlugin = createPluginFactory({
    key: MARK_AUTOLINK,
    isLeaf: true,
    component: AutolinkerLeaf,
    renderAfterEditable: FloatingLink as RenderAfterEditable<MyValue>,
    options: {
        defaultLinkAttributes: {
            target: '_blank',
            rel: 'noopener noreferrer',
        },
    },
});
