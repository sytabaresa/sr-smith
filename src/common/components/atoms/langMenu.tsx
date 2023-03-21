import { useTranslation } from "@modules/i18n"
import { HTMLAttributes } from "react";
import { locales } from "@modules/i18n/i18n-util";
import { useLang } from "@hooks/useLang";

export const LangMenu = (props: HTMLAttributes<HTMLDivElement>) => {
    const { className, ...rest } = props
    const [lang, setLang] = useLang()
    const { t } = useTranslation()

    // console.log("lang", locales, lang)

    return <div className={`dropdown dropdown-end uppercase ${className}`} {...rest}>
        {t.common.lang()}:
        <label tabIndex={0} className="btn btn-ghost btn-primary m-1">{lang || '--'}</label>
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box">
            {locales.map((item, i) =>
                <li key={i}>
                    <a className="uppercase" onClick={() => setLang(item)}>{item}</a>
                </li>
            )}
        </ul>
    </div>
}