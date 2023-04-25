import React, { HTMLAttributes } from "react";

interface DrawerMenuItemProps extends HTMLAttributes<HTMLDivElement> {
    label: string;
    icon: JSX.Element
    onClick?: () => void
}

const DrawerMenuItem = ({ label, icon, onClick, ...rest }: DrawerMenuItemProps) => {
    return (
        <div className="btn btn-ghost" role="button" onClick={onClick} {...rest}>
            {icon}
            <span className="pl-3 text-xl">{label}</span>
        </div>
    )
}

export default DrawerMenuItem;