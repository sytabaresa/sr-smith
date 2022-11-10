import MenuAlt3Icon from "@heroicons/react/outline/MenuAlt3Icon"
import ViewGridIcon from "@heroicons/react/outline/ViewGridIcon"
import Link from "next/link"
import { Avartar } from "../atoms/avatar"

export const UserMenu = () => {

    return (
        <div className="flex items-center">
            <Avartar className="hidden md:block" src="https://s.gravatar.com/avatar/718ba64442e4dc180aa0be6b0a9617b1?s=80" text="ST" />
            <div className="md:btn-group">
                {/* <Link href="/">
                    <button className="btn btn-lg btn-active hidden md:block">
                        <ViewGridIcon className="h-5 w-5" />
                    </button>
                </Link> */}
                <label
                    htmlFor="my-drawer"
                    className="btn md:btn-lg drawer-button"
                >
                    <MenuAlt3Icon className="h-5 w-5" />
                </label>
            </div>
        </div>
    )
}