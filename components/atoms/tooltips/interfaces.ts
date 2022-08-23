import { Machine } from "robot3"


export interface TooltipType<S = {}, C = {}> {
    name: string
    description: string
    // validation: (board: any, e: any, attributes: Record<string, any>) => boolean,
    // action: (board: any, e: any, attributes: Record<string, any>) => void
    machine: Machine<S, C, string>
}

export interface MachineCtx {
    board: any
}
