import { useI18nContext } from "@modules/i18n/i18n-react";
import { Locales } from "@modules/i18n/i18n-types";
import { loadLocaleAsync } from "@modules/i18n/i18n-util.async";
import { useEffect } from "react";
import { langAtom } from "@core/atoms/common";
import { useAtom } from "jotai";

export const useLang = (_lang: Locales | string = '') => {
    const { setLocale } = useI18nContext()
    const [lang, setLang] = useAtom(langAtom)

    useEffect(() => {
        loadLocaleAsync(lang).then(() => {
            // if (typeof window != 'undefined' && 'URLSearchParams' in window && lang) {
            //     var searchParams = new URLSearchParams(window.location.search);
            //     searchParams.set("lang", lang);
            //     window.location.search = searchParams.toString();
            // }
            setLocale(lang)
        })
        // loadLocale(lang)
    }, [lang])

    return [lang, setLang] as [Locales, React.Dispatch<React.SetStateAction<Locales>>]
}