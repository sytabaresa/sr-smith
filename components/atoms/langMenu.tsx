import i18n from "../../i18n"
import { useTranslation, useSelectedLanguage } from "next-export-i18n";
import { HTMLAttributes } from "react";

export const LangMenu = (props: HTMLAttributes<HTMLDivElement>) => {
    const { className, ...rest } = props
    const { lang, setLang } = useSelectedLanguage()
    const { t } = useTranslation()

    return <div className={`dropdown dropdown-end ${className}`} {...rest}>
        {t('Lang')}:
        <label tabIndex={0} className="btn btn-ghost btn-primary m-1">{lang}</label>
        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box">
            {Object.keys(i18n.translations).map((item, i) =>
                <li key={i}><a onClick={() => setLang(item)}>{item}</a></li>
            )}
        </ul>
    </div>
}