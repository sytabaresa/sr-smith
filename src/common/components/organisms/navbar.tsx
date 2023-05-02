import {ArrowLeftIcon, MenuAlt3Icon} from "@heroicons/react/outline"
import { useTranslation } from "@modules/i18n";
import { useRouter } from "@modules/router";
import { HTMLAttributes } from "react";
import { LangMenu } from "@components/atoms/langMenu";
import { ThemeSwitcher } from "@components/atoms/themeSwitcher";
import { UserImage } from "@components/molecules/userImage";
import { useUser } from "@hooks/useAuthProvider";

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
    showComplement?: boolean
}

export default function Navbar(props: NavbarProps) {
    const { className = '', showComplement, ...rest } = props

    const { t } = useTranslation()
    const { user } = useUser()
    const { useHistory } = useRouter()
    const { goBack } = useHistory();

    return <nav className={`navbar ${className}`} {...rest}>
        <div className="flex-1">
            <button className="btn btn-ghost flex" onClick={() => goBack()}>
                <ArrowLeftIcon className='h-4 w-4 mr-2' />{t.common.back()}
            </button>
            {showComplement && <>
                <LangMenu className='mx-2' />
                <ThemeSwitcher className='' />
            </>}
        </div>
        <div className="flex-none">
            {user && <label
                htmlFor="my-drawer"
            // className="btn"
            >
                <UserImage className="hidden md:block mr-4" />
                <MenuAlt3Icon className="block md:hidden h-8 w-8 mr-2" />
            </label>}
        </div>
    </nav>
}