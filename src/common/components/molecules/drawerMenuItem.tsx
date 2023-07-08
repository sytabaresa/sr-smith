import React, { HTMLAttributes } from "react";

interface DrawerMenuItemProps extends HTMLAttributes<HTMLButtonElement> {
    label: string;
    icon: JSX.Element
    onClick?: () => void
}

const DrawerMenuItem = ({ label, icon, onClick, ...rest }: DrawerMenuItemProps) => {
    return (
        <button className="btn btn-ghost" onClick={onClick} {...rest}>
            {icon}
            <span className="pl-3 text-xl">{label}</span>
        </button>
    )
}

export default DrawerMenuItem;