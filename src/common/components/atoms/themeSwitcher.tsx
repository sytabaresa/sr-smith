import { themeAtom } from "@fsm/atoms";
import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import { useAtom } from "jotai";
import { ChangeEvent, LabelHTMLAttributes } from "react";


export function ThemeSwitcher(props: LabelHTMLAttributes<HTMLLabelElement>) {
    const { className = "", ...rest } = props

    const [theme, setTheme] = useAtom(themeAtom)

    const set = (e: ChangeEvent<HTMLInputElement>) => {
        // console.log('set', e.target.checked)
        setTheme(e.target.checked ? "dark" : "light")
    }
    return <label className={`swap swap-rotate`}  {...rest}>
        <input type="checkbox" aria-hidden="true" checked={theme == 'dark'} onChange={set} />
        <MoonIcon className={`swap-on w-8 h-8 ${className}`} role="button" tabIndex={0} />
        <SunIcon className={`swap-off w-8 h-8 ${className}`} role="button" tabIndex={0} />
    </label>
}