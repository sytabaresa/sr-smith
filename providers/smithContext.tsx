import { createContext } from "react";
import { JXGDrawer } from "../components/atoms/tooltipActions";

export const SmithContext = createContext({
    board: null,
    boxName: 'smith-box',
    setBoard: (_board) => { },
    code: '',
    ui: null as JXGDrawer,
    setCode: (code: string) => { },
    boardOptions: {},
    setBoardOptions: (options: any) => { },
})
