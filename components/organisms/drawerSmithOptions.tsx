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


const DrawerSmithOptions = () => {
    const NEW_PROJECT_LABEL = 'new-project-modal'

    const router = useRouter()
    const { isAuthenticated } = useUser()

    const logout = async () => {
        try {
            await signOut(auth)
            router.push('/login')
        } catch (err) {
            console.log('logout error', err)
        }
    }

    const login = () => {
        router.push('/login')
    }

    const open = () => {
        router.push('/saved')
    }

    return <>
        <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <div className="p-4 overflow-y-auto w-52 bg-base-100 text-base-content flex flex-col items-start">
                <label htmlFor={NEW_PROJECT_LABEL}>
                    <DrawerMenuItem icon={<PlusIcon className="w-8 h-8" />} label="New" />
                </label>
                {/* <DrawerMenuItem icon={<SaveIcon className="w-8 h-8" />} label="Save" /> */}

                <DrawerMenuItem icon={<FolderOpenIcon className="w-8 h-8" />} label="Open" onClick={open} />
                <DrawerMenuItem icon={<ShareIcon className="w-8 h-8" />} label="Share" />
                <DrawerMenuItem icon={<ShareIcon className="w-8 h-8" />} label="Publish" />
                <DrawerMenuItem icon={<CogIcon className="w-8 h-8" />} label="Settings" />
                {isAuthenticated ?
                    <DrawerMenuItem icon={<LogoutIcon className="w-8 h-8" />} label="Logout" onClick={logout} />
                    :
                    <DrawerMenuItem icon={<LoginIcon className="w-8 h-8" />} label="Login" onClick={login} />
                }
            </div>
        </div>
        <ModalContainer
            className="w-10/12 md:w-3/12"
            modalChild={<NewProjectForm />}
            modalName={NEW_PROJECT_LABEL}
            isModal
        >
        </ModalContainer>
    </>
}

export default DrawerSmithOptions