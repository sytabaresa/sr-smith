import { ArrowLeftIcon, MenuAlt2Icon } from "@heroicons/react/outline";
import { useTranslation } from "next-export-i18n";
import { useRouter } from "next/router";
import { HTMLAttributes } from "react";
import { LangMenu } from "../atoms/langMenu";
import { ThemeSwitcher } from "../molecules/themeSwitcher";
import { UserImage } from "../molecules/userImage";
import { useUser } from "./userContext";

export interface NavbarProps extends HTMLAttributes<HTMLElement> {
    showComplement?: boolean
}

export default function Navbar(props: NavbarProps) {
    const { className = '', showComplement, ...rest } = props

    const router = useRouter()
    const { t } = useTranslation()
    const { user } = useUser()

    return <nav className={`navbar ${className}`} {...rest}>
        <div className="flex-1">
            <button className="btn btn-ghost flex" onClick={() => router.back()}>
                <ArrowLeftIcon className='h-4 w-4 mr-2' />{t('back')}
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
                <MenuAlt2Icon className="block md:hidden h-8 w-8 mr-2" />
            </label>}
        </div>
    </nav>
}