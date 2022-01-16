import React from "react";

type DrawerMenuItemProps = {
    label: string
    icon: JSX.Element
    onClick?: () => void
}

const DrawerMenuItem = ({label, icon, onClick}: DrawerMenuItemProps) => {
    return(
        <button className="flex items-center my-2" onClick={onClick}>
            {icon}
            <span className="pl-3 text-xl">{label}</span>
        </button>
    )
}

export default DrawerMenuItem;