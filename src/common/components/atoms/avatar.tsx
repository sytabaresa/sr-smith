import { cn } from "@utils/styles";
import { useTranslation } from "@modules/i18n";
import { HTMLAttributes } from "react"

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
    src?: string;
    text?: string;
}
export const Avatar = (props: AvatarProps) => {
    const { t } = useTranslation()

    const { className = "", src, text } = props
    return (
        <div className={cn('avatar !flex w-14 h-14', className)}>
            <div className="rounded-full ring ring-primary !flex w-full h-full items-center justify-center bg-sky-300">
                {src && src != '' ?
                    <img src={src} alt={t.common.profile_picture()} /> :
                    <h1 className="w-full block text-center text-2xl font-bold text-white">{text}</h1>}
            </div>
        </div>
    )
}