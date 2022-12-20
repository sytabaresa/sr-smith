import React, { HTMLAttributes, useContext } from "react";
import DrawerMenuItem from "@components/molecules/drawerMenuItem";
import {
    PlusIcon,
    FolderOpenIcon,
    ShareIcon,
    CogIcon,
    LogoutIcon,
    LoginIcon
} from "@heroicons/react/outline";
import { useRouter } from '@modules/router';
import { useUser } from "./userContext";
import { useLanguageQuery, useTranslation } from "@utils/i18n";
import { SmithContext } from "@providers/smithContext";
import { useLogout } from "@hooks/useLogout";
import { qStr } from "@utils/common";

export interface DrawerSmithMenuProps extends HTMLAttributes<HTMLDivElement> {
    labels: Record<string, any>
}

const DrawerSmithMenu = (props) => {
    const { labels } = props
    const { saveService } = useContext(SmithContext)
    const { useHistory } = useRouter()
    const { push } = useHistory();
    const [query] = useLanguageQuery()
    const { t } = useTranslation();
    const { isAuthenticated, user } = useUser()
    const _logout = useLogout()

    const logout = async () => {
        await _logout()
        saveService[1]('LOGOUT')
    }

    const login = () => {
        push('/login', { lang: query.lang })
    }

    const open = () => {
        push('/saved', { lang: query.lang })
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
        <a className="btn btn-warning btn-outline mt-10 text-right " href="/event">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-1"></div> Sustentación <br /> tesis
        </a>

    </div>
}

export default DrawerSmithMenu