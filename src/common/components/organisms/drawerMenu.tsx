import { HTMLAttributes } from "react";
import DrawerMenuItem from "@components/molecules/drawerMenuItem";
import { PlusIcon, FolderOpenIcon, ShareIcon, CogIcon, LogoutIcon, LoginIcon } from "@heroicons/react/outline"
import { useRouter } from '@modules/router';
import { useUser } from "@hooks/useAuthProvider";
import { useTranslation } from "@modules/i18n";
import { useLogout } from "@hooks/useLogout";
import { Link } from "@modules/router/link";
import { useSetAtom } from "jotai";
import { savingServiceAtom } from "@core/atoms/smith";
import createModal from "@components/molecules/createModal";

//modals
import NewProjectForm from "@components/molecules/newProjectForm";
import PublishProjectForm from "@components/molecules/publishProjectForm";
import ConfigsForm from "@components/molecules/configForm";

export interface DrawerSmithMenuProps extends HTMLAttributes<HTMLDivElement> {
}

const DrawerMenu = (props) => {
    const send = useSetAtom(savingServiceAtom)
    const { t } = useTranslation();
    const { isAuthenticated } = useUser()
    const { useHistory } = useRouter()
    const { push } = useHistory();

    const _logout = useLogout()

    const logout = async () => {
        await _logout()
        send('LOGOUT')
    }
    const newProject = createModal('new-project')
    const publish = createModal('publish-project')
    const config = createModal('config-smith')

    return <nav aria-label={t.common.main_nav()} className="flex flex-col items-start flex-grow w-full">
        {isAuthenticated ?
            <>
                <DrawerMenuItem icon={<PlusIcon className="w-8 h-8" />} label={t.menu.new()} onClick={(e) => newProject.showModal(true, e.target)} />
                {/* <DrawerMenuItem icon={<SaveIcon className="w-8 h-8" />} label="Save" /> */}
                <DrawerMenuItem icon={<FolderOpenIcon className="w-8 h-8" />} label={t.menu.open()} onClick={() => push('/saved')} />
                <DrawerMenuItem icon={<ShareIcon className="w-8 h-8" />} label={t.menu.publish()} onClick={(e) => publish.showModal(true, e.target)} />
                <DrawerMenuItem icon={<CogIcon className="w-8 h-8" />} label={t.menu.settings()} aria-label={t.menu.settings_large()} onClick={(e) => config.showModal(true, e.target)} />
                <newProject.Modal>
                    <NewProjectForm />
                </newProject.Modal>
                <publish.Modal>
                    <PublishProjectForm />
                </publish.Modal>
                <config.Modal>
                    <ConfigsForm />
                </config.Modal>
                {/* <DrawerMenuItem icon={<ShareIcon className="w-8 h-8" />} label="Share" /> */}
                <DrawerMenuItem icon={<LogoutIcon className="w-8 h-8" />} label={t.menu.logout()} onClick={logout} />
            </> :
            <>
                <DrawerMenuItem icon={<LoginIcon className="w-8 h-8" />} label={t.menu.login()} onClick={() => push('/login')} />
                <DrawerMenuItem icon={<CogIcon className="w-8 h-8" />} label={t.menu.settings()} onClick={(e) => config.showModal(true, e.target)} />
                <config.Modal>
                    <ConfigsForm />
                </config.Modal>
            </>
        }
    </nav>
}

export default DrawerMenu