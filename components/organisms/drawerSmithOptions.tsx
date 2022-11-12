import React from "react";
import DrawerMenuItem from "../molecules/drawerMenuItem";
import {
    PlusIcon,
    SaveIcon,
    FolderOpenIcon,
    ShareIcon,
    CogIcon,
    LogoutIcon,
    LoginIcon
} from "@heroicons/react/outline";
import { auth } from "../../firebase/clientApp";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useUser } from "../../providers/userContext";
import ModalContainer from "../molecules/modalContainer";
import NewProjectForm from "./newProjectForm";
import PublishProjectForm from "./publishProjectForm";
import { UserImage } from "../molecules/userImage";
import { useLanguageQuery, useTranslation } from "next-export-i18n";
import { LangMenu } from "../atoms/langMenu";
import ConfigsForm from "./configForm";
import { ThemeSwitcher } from "../molecules/themeSwitcher";

const DrawerSmithOptions = () => {
    const NEW_PROJECT_LABEL = 'new-project-modal'
    const PUBLISH_PROJECT_LABEL = 'publish-project-modal'
    const CONFIGS_LABEL = 'configs-label'

    const router = useRouter()
    const [query] = useLanguageQuery()
    const { t } = useTranslation();
    const { isAuthenticated, user } = useUser()

    const logout = async () => {
        try {
            await signOut(auth)
            // router.push('/login')
        } catch (err) {
            console.log('logout error', err)
        }
    }

    const login = () => {
        router.push({ pathname: '/login', query })
    }

    const open = () => {
        router.push({ pathname: '/saved', query })
    }

    return <>
        <div className="drawer-side overflow-x-hidden">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <div className="p-4 overflow-y-auto w-60 bg-base-100 text-base-content flex flex-col items-start">
                <div className="flex flex-col items-start flex-grow w-full">
                    {isAuthenticated ?
                        <>
                            {user && <div className="flex flex-col items-center mb-4 w-full">
                                <UserImage className="mb-2" imageClasses="w-24 h-24" />
                                <div className="w-44 text-center">
                                    <h1 className="font-bold break-words text-sm">{user?.email}</h1>
                                    {/* <h2 className="break-normal">{user?.displayName}</h2> */}
                                </div>
                            </div>}
                            <label htmlFor={NEW_PROJECT_LABEL}>
                                <DrawerMenuItem icon={<PlusIcon className="w-8 h-8" />} label={t("New")} />
                            </label>
                            {/* <DrawerMenuItem icon={<SaveIcon className="w-8 h-8" />} label="Save" /> */}

                            <DrawerMenuItem icon={<FolderOpenIcon className="w-8 h-8" />} label={t("Open")} onClick={open} />
                            <label htmlFor={PUBLISH_PROJECT_LABEL}>
                                <DrawerMenuItem icon={<ShareIcon className="w-8 h-8" />} label={t("Publish")} />
                            </label>
                            <label htmlFor={CONFIGS_LABEL}>
                                <DrawerMenuItem icon={<CogIcon className="w-8 h-8" />} label={t("Settings")} />
                            </label>
                            {/* <DrawerMenuItem icon={<ShareIcon className="w-8 h-8" />} label="Share" /> */}
                            <DrawerMenuItem icon={<LogoutIcon className="w-8 h-8" />} label={t("Logout")} onClick={logout} />
                        </> :
                        <>
                            <DrawerMenuItem icon={<LoginIcon className="w-8 h-8" />} label={t("Login")} onClick={login} />
                            <label htmlFor={CONFIGS_LABEL}>
                                <DrawerMenuItem icon={<CogIcon className="w-8 h-8" />} label={t("Settings")} />
                            </label>
                        </>
                    }
                </div>
                <div className="flex w-full">
                    <LangMenu className="dropdown-top ml-4 flex-grow" />
                    <ThemeSwitcher />
                </div>
            </div>
        </div>
        <ModalContainer
            className="w-10/12 md:w-3/12"
            modalChild={<NewProjectForm />}
            modalName={NEW_PROJECT_LABEL}
            isModal
        >
        </ModalContainer>
        <ModalContainer
            className="w-10/12 md:w-3/12"
            modalChild={<PublishProjectForm />}
            modalName={PUBLISH_PROJECT_LABEL}
            isModal
        >
        </ModalContainer>
        <ModalContainer
            className="w-10/12 md:w-3/12"
            modalChild={<ConfigsForm />}
            modalName={CONFIGS_LABEL}
            isModal
        >
        </ModalContainer>
    </>
}

export default DrawerSmithOptions