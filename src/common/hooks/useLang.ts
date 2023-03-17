import { useI18nContext } from "@modules/i18n/i18n-react";
import { Locales } from "@modules/i18n/i18n-types";
import { loadLocaleAsync } from "@modules/i18n/i18n-util.async";
import { loadLocale } from "@modules/i18n/i18n-util.sync";
import { useEffect } from "react";
import { useConfig } from "./useConfig";

export const useLang = (_lang: Locales = null) => {
    const { setLocale } = useI18nContext()
    const [lang, setLang] = useConfig<Locales>('lang', _lang)
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

    return [lang, setLang]
}