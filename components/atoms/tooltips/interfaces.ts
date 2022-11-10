import React from "react"
import { Machine } from "robot3"


export interface TooltipType<S = {}, C = {}, G = any> {
    name: string
    description: string
    // validation: (board: any, e: any, attributes: Record<string, any>) => boolean,
    // action: (board: any, e: any, attributes: Record<string, any>) => void
    machine: Machine<S, C, string>
    tooltip: string
    icon: React.ReactNode
    paramsStr: (ob: G) => string
}

export interface MachineCtx {
    board: any
}
