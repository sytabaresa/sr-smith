import { themeAtom } from "@core/atoms/common";
import { MoonIcon, SunIcon } from "@heroicons/react/outline";
import { useTranslation } from "@modules/i18n";
import { useAtom } from "jotai";
import { ChangeEvent, LabelHTMLAttributes } from "react";


export function ThemeSwitcher(props: LabelHTMLAttributes<HTMLLabelElement>) {
    const { className = "", ...rest } = props
    const { t } = useTranslation()

    const [theme, setTheme] = useAtom(themeAtom)

    const set = (e: ChangeEvent<HTMLInputElement>) => {
        // console.log('set', e.target.checked)
        setTheme(e.target.checked ? "dark" : "light")
    }
    return <label className={`swap swap-rotate`} {...rest}>
        <input
            // aria-label={t.common.theme()}
            type="checkbox"
            checked={theme == 'dark'}
            onChange={set}
            aria-label={`${t.common.theme()} - ${t.theme[theme]()}`}
        />
        <MoonIcon className={`swap-on w-8 h-8 ${className}`} tabIndex={-1} />
        <SunIcon className={`swap-off w-8 h-8 ${className}`} tabIndex={-1} />
        <span className="hidden" aria-hidden="false">
            {t.common.theme()}
        </span>
    </label>
}