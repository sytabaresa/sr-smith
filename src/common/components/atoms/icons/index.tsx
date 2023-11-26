import { cn } from "@utils/styles"
import React, { cloneElement } from "react"

interface IconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
}

const IconGen = (meta: Record<string, any>) => (props: IconProps) => {
    return <img
        {...props}
        {...meta}
    />
}

export const TestIcon = IconGen({ alt: "arc-icon", src: "" })

export function GoogleIcon(props) {
    return <svg version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 210 210" {...props}>
        <path d="M0,105C0,47.103,47.103,0,105,0c23.383,0,45.515,7.523,64.004,21.756l-24.4,31.696C133.172,44.652,119.477,40,105,40
c-35.841,0-65,29.159-65,65s29.159,65,65,65c28.867,0,53.398-18.913,61.852-45H105V85h105v20c0,57.897-47.103,105-105,105
S0,162.897,0,105z"/>
    </svg>
}

export function MicrosoftIcon(props) {
    return <svg viewBox="0 0 21 21"  {...props}>
        <path d="M0 0h10v10H0z" />
        <path d="M11 0h10v10H11z" />
        <path d="M0 11h10v10H0z" />
        <path d="M11 11h10v10H11z" />
    </svg>
}

export * from "./canvas"
export * from "./external"