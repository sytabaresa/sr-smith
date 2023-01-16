import { HTMLAttributes, useContext } from "react";
import DrawerMenuItem from "@components/molecules/drawerMenuItem";
import { PlusIcon, FolderOpenIcon, ShareIcon, CogIcon, LogoutIcon, LoginIcon } from "@heroicons/react/outline"
import { useRouter } from '@modules/router';
import { useUser } from "./userContext";
import { useLanguageQuery, useTranslation } from "@modules/i18n";
import { SmithContext } from "@providers/smithContext";
import { useLogout } from "@hooks/useLogout";

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
                    <DrawerMenuItem icon={<PlusIcon className="w-8 h-8" />} label={t.menu.new()} />
                </label>
                {/* <DrawerMenuItem icon={<SaveIcon className="w-8 h-8" />} label="Save" /> */}

                <DrawerMenuItem icon={<FolderOpenIcon className="w-8 h-8" />} label={t.menu.open()} onClick={open} />
                <label htmlFor={labels.PUBLISH_PROJECT_LABEL}>
                    <DrawerMenuItem icon={<ShareIcon className="w-8 h-8" />} label={t.menu.publish()} />
                </label>
                <label htmlFor={labels.CONFIGS_LABEL}>
                    <DrawerMenuItem icon={<CogIcon className="w-8 h-8" />} label={t.menu.settings()} />
                </label>
                {/* <DrawerMenuItem icon={<ShareIcon className="w-8 h-8" />} label="Share" /> */}
                <DrawerMenuItem icon={<LogoutIcon className="w-8 h-8" />} label={t.menu.logout()} onClick={logout} />
            </> :
            <>
                <DrawerMenuItem icon={<LoginIcon className="w-8 h-8" />} label={t.menu.login()} onClick={login} />
                <label htmlFor={labels.CONFIGS_LABEL}>
                    <DrawerMenuItem icon={<CogIcon className="w-8 h-8" />} label={t.menu.settings()} />
                </label>
            </>
        }
        <a className="btn btn-warning btn-outline mt-10 text-right " href="/event">
            <div className="w-4 h-4 bg-red-500 rounded-full mr-1"></div> Sustentación <br /> tesis
        </a>

    </div>
}

export default DrawerSmithMenu