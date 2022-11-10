import { HTMLAttributes } from "react"

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
    src?: string;
    text?: string;
}
export const Avartar = (props: AvatarProps) => {

    const { className, src, text } = props
    return (
        <div className={`avatar mr-4 ${className}`}>
            <div className="rounded-full ring ring-primary w-14 h-14 !flex items-center justify-center bg-sky-300">
                {src && src != '' ? <img src={src} /> : <h1 className="w-full block text-center text-2xl font-bold text-white">{text}</h1>}
            </div>
        </div>
    )
}