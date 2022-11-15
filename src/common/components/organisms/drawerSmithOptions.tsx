import React, { HTMLAttributes, useContext } from "react";
import DrawerMenuItem from "../molecules/drawerMenuItem";
import {
    PlusIcon,
    FolderOpenIcon,
    ShareIcon,
    CogIcon,
    LogoutIcon,
    LoginIcon
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { useUser } from "./userContext";
import { UserImage } from "../molecules/userImage";
import { useLanguageQuery, useTranslation } from "next-export-i18n";
import { SmithContext } from "../../../common/providers/smithContext";
import { useLogout } from "../../hooks/useLogout";

export interface DrawerSmithMenuProps extends HTMLAttributes<HTMLDivElement> {
    labels: Record<string, any>
}

const DrawerSmithMenu = (props) => {
    const { labels } = props
    const { saveService } = useContext(SmithContext)
    const router = useRouter()
    const [query] = useLanguageQuery()
    const { t } = useTranslation();
    const { isAuthenticated, user } = useUser()
    const _logout = useLogout()

    const logout = async () => {
        await _logout()
        saveService[1]('LOGOUT')
    }

    const login = () => {
        router.push({ pathname: '/login', query: { lang: query.lang } })
    }

    const open = () => {
        router.push({ pathname: '/saved', query: { lang: query.lang } })
    }

    return <div className="flex flex-col items-start flex-grow w-full">
        {isAuthenticated ?
            <>
                <label htmlFor={labels.NEW_PROJECT_LABEL}>
                    <DrawerMenuItem icon={<PlusIcon className="w-8 h-8" />} label={t("New")} />
                </label>
                {/* <DrawerMenuItem icon={<SaveIcon className="w-8 h-8" />} label="Save" /> */}

                <DrawerMenuItem icon={<FolderOpenIcon className="w-8 h-8" />} label={t("Open")} onClick={open} />
                <label htmlFor={labels.PUBLISH_PROJECT_LABEL}>
                    <DrawerMenuItem icon={<ShareIcon className="w-8 h-8" />} label={t("Publish")} />
                </label>
                <label htmlFor={labels.CONFIGS_LABEL}>
                    <DrawerMenuItem icon={<CogIcon className="w-8 h-8" />} label={t("Settings")} />
                </label>
                {/* <DrawerMenuItem icon={<ShareIcon className="w-8 h-8" />} label="Share" /> */}
                <DrawerMenuItem icon={<LogoutIcon className="w-8 h-8" />} label={t("Logout")} onClick={logout} />
            </> :
            <>
                <DrawerMenuItem icon={<LoginIcon className="w-8 h-8" />} label={t("Login")} onClick={login} />
                <label htmlFor={labels.CONFIGS_LABEL}>
                    <DrawerMenuItem icon={<CogIcon className="w-8 h-8" />} label={t("Settings")} />
                </label>
            </>
        }
    </div>
}

export default DrawerSmithMenu