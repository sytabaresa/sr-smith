import { RenderAfterEditable, createPluginFactory } from "@udecode/plate-headless";
import { MyValue } from "../types";
import { ColorInlineLeaf } from "@components/molecules/editor/colorInline";

const MARK_COLOR = 'color'

export const createColorPlugin = createPluginFactory<MyValue>({
    key: MARK_COLOR,
    isLeaf: true,
    component: ColorInlineLeaf,
});
