import MenuAlt3Icon from "@heroicons/react/outline/MenuAlt3Icon"
import ViewGridIcon from "@heroicons/react/outline/ViewGridIcon"
import Link from "next/link"
import { Avartar } from "../atoms/avatar"

export const UserMenu = () => {

    return (
        <div className="flex items-center">
            <Avartar />
            <div className="btn-group drawer-content">
                <Link href="/">
                    <button className="btn btn-lg btn-active">
                        <ViewGridIcon className="h-5 w-5" />
                    </button>
                </Link>
                <label
                    htmlFor="my-drawer"
                    className="btn btn-lg drawer-button"
                >
                    <MenuAlt3Icon className="h-5 w-5" />
                </label>
            </div>
        </div>
    )
}