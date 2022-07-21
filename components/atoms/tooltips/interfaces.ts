

export interface TooltipType {
    name: () => string,
    validation: (board: any, e: any, attributes: Record<string, any>) => boolean,
    action: (board: any, e: any, attributes: Record<string, any>) => void
}