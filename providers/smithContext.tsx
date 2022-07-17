import { createContext } from "react";

export const SmithContext = createContext({
    board: null,
    boxName: 'smith-box',
    setBoard: (_board) => { },
    code: '',
    ui: null,
    setCode: (code: string) => { },
    boardOptions: {},
    setBoardOptions: (options: any) => { },
})
