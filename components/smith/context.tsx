import { createContext } from "react";

export const SmithContext = createContext({
    board: null,
    boxName: 'smith-box',
    setBoard: (_board) => { },
})
