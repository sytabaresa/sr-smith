import MenuAlt3Icon from "@heroicons/react/outline/MenuAlt3Icon"
// import ViewGridIcon from "@heroicons/react/outline/ViewGridIcon"
import { useUser } from "./userContext"
import { UserImage } from "@components/molecules/userImage"

export const UserMenu = () => {
    const { user } = useUser()

    return (
        <div className="flex items-center">
            {user && <UserImage className="hidden md:block mr-4" />}
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
