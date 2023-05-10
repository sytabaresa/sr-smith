import { atom } from "jotai";
import { BaseEditor, Descendant, createEditor } from "slate";
import withParagraphs from "./withParagraph";
import { ReactEditor, withReact } from "slate-react";
import { HistoryEditor, withHistory } from "slate-history";

export const editorAtom = atom<BaseEditor & ReactEditor & HistoryEditor>(withParagraphs(withReact(withHistory(createEditor()))))
export const keyDownAtom = atom<React.KeyboardEvent<HTMLDivElement>>(null)
export const keyUpAtom = atom<React.KeyboardEvent<HTMLDivElement>>(null)
export const keyAtom = atom<React.KeyboardEvent<HTMLDivElement>>(null)

export const changeCodeAtom = atom<Descendant[]>(null)
export const changeAtom = atom<Descendant[]>(null)
