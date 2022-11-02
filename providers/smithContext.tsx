import { createContext } from "react";
import { JXGDrawer } from "../components/organisms/tooltipActions";

export const SmithContext = createContext({
    code: '',
    // setCode: (code: string) => { },
    ui: new JXGDrawer(),
    boardOptions: {},
    setBoardOptions: (options: any) => { },
    editorMachine: null,
})
