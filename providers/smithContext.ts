import { createContext } from "react";
import { JXGDrawer } from "../components/organisms/tooltipActions";
import { SmithProject } from "../interfaces";

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
