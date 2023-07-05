import { atom } from "jotai";
import { BasePoint } from "slate";

interface LinkProps {
    anchor: BasePoint;
    focus: BasePoint;
    url: string;
}

export const linkActiveAtom = atom(false)
export const linkPropsAtom = atom<LinkProps>(null)