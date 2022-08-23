import { HTMLAttributes } from "react"


export const Avartar = (props: HTMLAttributes<HTMLDivElement>) => {

    return (
        <div className={`avatar mr-4 ${props.className}`}>
            <div className="rounded-full ring ring-primary w-14 h-14">
                <img src="https://s.gravatar.com/avatar/718ba64442e4dc180aa0be6b0a9617b1?s=80 " />
            </div>
        </div>
    )
}