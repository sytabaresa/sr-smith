import { HTMLAttributes, Suspense } from "react";
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
import NewProjectForm from "./newProjectForm";
import PublishProjectForm from "./publishProjectForm";
import ConfigsForm from "./configForm";

export interface DrawerSmithMenuProps extends HTMLAttributes<HTMLDivElement> {
}

const DrawerMenu = (props) => {
    const send = useSetAtom(savingServiceAtom)
    const { useHistory } = useRouter()
    const { push } = useHistory();
    const { t } = useTranslation();
    const { isAuthenticated } = useUser()
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
                <newProject.Label>
                    <DrawerMenuItem icon={<PlusIcon className="w-8 h-8" />} label={t.menu.new()} />
                </newProject.Label>
                <newProject.Modal>
                    <Suspense fallback={<></>}>
                        <NewProjectForm />
                    </Suspense>
                </newProject.Modal>
                {/* <DrawerMenuItem icon={<SaveIcon className="w-8 h-8" />} label="Save" /> */}
                <Link href="/saved">
                    <DrawerMenuItem icon={<FolderOpenIcon className="w-8 h-8" />} label={t.menu.open()} />
                </Link>
                <publish.Label>
                    <DrawerMenuItem icon={<ShareIcon className="w-8 h-8" />} label={t.menu.publish()} />
                </publish.Label>
                <publish.Modal>
                    <PublishProjectForm />
                </publish.Modal>
                <config.Label>
                    <DrawerMenuItem icon={<CogIcon className="w-8 h-8" />} label={t.menu.settings()} aria-label={t.menu.settings_large()} />
                </config.Label>
                <config.Modal>
                    <ConfigsForm />
                </config.Modal>
                {/* <DrawerMenuItem icon={<ShareIcon className="w-8 h-8" />} label="Share" /> */}
                <a href="#">
                    <DrawerMenuItem icon={<LogoutIcon className="w-8 h-8" />} label={t.menu.logout()} onClick={logout} />
                </a>
            </> :
            <>
                <Link href="/login">
                    <DrawerMenuItem icon={<LoginIcon className="w-8 h-8" />} label={t.menu.login()} />
                </Link>
                <config.Label>
                    <DrawerMenuItem icon={<CogIcon className="w-8 h-8" />} label={t.menu.settings()} />
                </config.Label>
                <config.Modal>
                    <ConfigsForm />
                </config.Modal>
            </>
        }
    </nav>
}

export default DrawerMenu