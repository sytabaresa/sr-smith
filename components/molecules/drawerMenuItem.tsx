import React from "react";

type DrawerMenuItemProps = {
    label: string
    icon: JSX.Element
    onClick?: () => void
}

const DrawerMenuItem = ({label, icon, onClick}: DrawerMenuItemProps) => {
    return(
        <div className="btn btn-ghost" onClick={onClick}>
            {icon}
            <span className="pl-3 text-xl">{label}</span>
        </div>
    )
}

export default DrawerMenuItem;