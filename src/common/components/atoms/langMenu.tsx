import { useTranslation } from "@modules/i18n"
import { HTMLAttributes } from "react";
import { locales } from "@modules/i18n/i18n-util";
import { useLang } from "@hooks/useLang";
import { cn } from "@utils/styles";

export const LangMenu = (props: HTMLAttributes<HTMLDivElement>) => {
    const { className, ...rest } = props
    const [lang, setLang] = useLang()
    const { t } = useTranslation()

    // console.log("lang", locales, lang)

    return <div className={cn('dropdown dropdown-end uppercase text-sm', className)} {...rest}>
        {t.common.lang()}:
        <label tabIndex={0} aria-label={t.common.lang()} className="btn btn-ghost btn-square mx-1" role="button">{lang || '--'}</label>
        <div className="dropdown-content text-base-content p-2 shadow bg-base-100 rounded-box">
            <ul tabIndex={0} className=" menu" role="menu">
                {locales.map((item, i) =>
                    <li key={i}>
                        <button className={item == lang ? 'active' : ''} role="menuitem" onClick={() => setLang(item)}>{t.lang[item]()}</button>
                    </li>
                )}
            </ul>
        </div>
    </div>
}