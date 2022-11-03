import { createContext } from "react";
import { JXGDrawer } from "../components/organisms/tooltipActions";
import { SmithProject } from "../interfaces";

export const SmithContext = createContext({
    code: '',
    // setCode: (code: string) => { },
    ui: new JXGDrawer(),
    boardOptions: {},
    setBoardOptions: (options: any) => { },
    editorMachine: null,
    projectData: {} as SmithProject,
})
