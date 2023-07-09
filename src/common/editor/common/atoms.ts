import { MyValue, } from "@editor/types";
import { WritableAtom, atom } from "jotai";


export const changeAtom = atom<MyValue>(null) as WritableAtom<MyValue, [MyValue], void>
export const selectionAtom = atom<object>({}) as WritableAtom<object, [object], void>
