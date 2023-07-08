import { MenuAlt3Icon } from "@heroicons/react/outline"
// import {ViewGridIcon} from "@heroicons/react/outline"
import { useUser } from "@hooks/useAuthProvider";
import { UserImage } from "@components/molecules/userImage"
import { useTranslation } from "@modules/i18n";

export const UserMenu = () => {
    const { user } = useUser()
    const { t } = useTranslation()

    return (
        <div className="flex items-center">
            {user && <UserImage className="hidden md:block mr-4" />}
            <div className="md:btn-group z-10">
                {/* <Link href="/">
                    <button className="btn btn-lg btn-active hidden md:block">
                        <ViewGridIcon className="h-5 w-5" />
                    </button>
                </Link> */}
                <label
                    htmlFor="my-drawer"
                    className="btn md:btn-lg btn-outline bg-base-100 btn-circle drawer-button"
                    aria-label={t.canvas.nav_menu()}
                >
                    <MenuAlt3Icon className="h-5 w-5" />
                </label>
            </div>
        </div>
    )
}
