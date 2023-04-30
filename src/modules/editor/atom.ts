import { atom } from "jotai";
import { Descendant } from "slate";

export const keyDownAtom = atom<React.KeyboardEvent<HTMLDivElement>>(null)
export const keyUpAtom = atom<React.KeyboardEvent<HTMLDivElement>>(null)
export const keyAtom = atom<React.KeyboardEvent<HTMLDivElement>>(null)

export const changeCodeAtom = atom<Descendant[]>(null)
export const changeAtom = atom<Descendant[]>(null)
