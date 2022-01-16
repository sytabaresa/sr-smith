import React from "react";
import DrawerMenuItem from "../molecules/drawerMenuItem";
import {
    PlusIcon,
    SaveIcon,
    FolderOpenIcon,
    ShareIcon,
    CogIcon,
    LogoutIcon
  } from "@heroicons/react/outline";


const DrawerSmithOptions =() => {
    return(
        <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <div className="p-4 overflow-y-auto w-52 bg-base-100 text-base-content flex flex-col items-start">
                <DrawerMenuItem icon={<PlusIcon className="w-8 h-8" />} label="New" />
                <DrawerMenuItem icon={<SaveIcon className="w-8 h-8" />} label="Save" />
                <DrawerMenuItem icon={<FolderOpenIcon className="w-8 h-8" />} label="Open" />
                <DrawerMenuItem icon={<ShareIcon className="w-8 h-8" />} label="Share" />
                <DrawerMenuItem icon={<ShareIcon className="w-8 h-8" />} label="Publish" />
                <DrawerMenuItem icon={<CogIcon className="w-8 h-8" />} label="Settings" />
                <DrawerMenuItem icon={<LogoutIcon className="w-8 h-8" />} label="Logout" />
            </div>
          </div>
    )
}

export default DrawerSmithOptions