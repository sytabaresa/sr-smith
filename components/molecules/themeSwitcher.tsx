import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import { LabelHTMLAttributes, useEffect, useState } from "react";
import { useTheme } from "../atoms/useTheme";


export function ThemeSwitcher(props: LabelHTMLAttributes<HTMLLabelElement>) {
    const { className = "", ...rest } = props

    const [theme, setTheme] = useTheme()

    return <label className={`swap swap-rotate`} {...rest}>
        <input type="checkbox" checked={theme == 'dark'} />
        <MoonIcon className={`swap-on w-8 h-8 ${className}`} onClick={() => setTheme('dark')} />
        <SunIcon className={`swap-off w-8 h-8 ${className}`} onClick={() => setTheme('light')} />
    </label>
}