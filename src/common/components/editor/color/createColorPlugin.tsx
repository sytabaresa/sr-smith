import { RenderAfterEditable, createPluginFactory } from "@udecode/plate-common";
import { MyValue } from "../types";
import { ColorInlineLeaf } from "./colorInline";

const MARK_COLOR = 'color'

export const createColorPlugin = createPluginFactory<MyValue>({
    key: MARK_COLOR,
    isLeaf: true,
    component: ColorInlineLeaf,
});
