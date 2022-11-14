import { createContext } from "react";
import { JXGDrawer } from "../../modules/core/fsm/tooltipActionsFSM";
import { SmithProject } from "../types/smith";

export interface SmithContextType {
    code: string
    ui: JXGDrawer
    boardOptions: Record<string, any>
    setBoardOptions: (options: Record<string, any>) => void
    editorService: Array<any>
    saveService: Array<any>
    projectData: SmithProject

}

export const SmithContext = createContext<SmithContextType>(null)
