import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import { useConfig } from "@hooks/useConfig";
import { LabelHTMLAttributes, useEffect, useState } from "react";


export function ThemeSwitcher(props: LabelHTMLAttributes<HTMLLabelElement>) {
    const { className = "", ...rest } = props

    const [theme, setTheme] = useConfig<string>('theme')

    return <label className={`swap swap-rotate`}  {...rest}>
        <input type="checkbox" aria-hidden="true" checked={theme == 'dark'} onChange={() => null} />
        <MoonIcon className={`swap-on w-8 h-8 ${className}`} role="button" tabIndex={0} onClick={() => setTheme('dark')} />
        <SunIcon className={`swap-off w-8 h-8 ${className}`} role="button" tabIndex={0} onClick={() => setTheme('light')} />
    </label>
}