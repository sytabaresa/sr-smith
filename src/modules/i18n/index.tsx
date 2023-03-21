import TypesafeI18n, { useI18nContext } from "./i18n-react";
import { ReactNode, useEffect, useState } from "react";
import { Locales } from "./i18n-types";
import { loadLocaleAsync } from "./i18n-util.async";
import { useRouter } from "@modules/router";
import { useLang } from "@hooks/useLang";
import { useConfig } from "@hooks/useConfig";
import { loadLocale } from "./i18n-util.sync";

export function useTranslation() {
    const { LL } = useI18nContext()


    // const { T } = useT();
    return {
        t: LL,
        TranslationWrapper: ({ locale, children }: { children: preact.ComponentChildren, locale: Locales }) => {//<>{props.children}</>
            const { useParams } = useRouter()
            const params = useParams();
            const [lang, setLang] = useConfig('lang', locale)
            const [_lang, _setLang] = useState(lang)
            _setLang(lang)
            // Detect locale
            // (Use as advanaced locale detection strategy as you like. 
            // More info: https://github.com/ivanhofer/typesafe-i18n/tree/main/packages/detectors)
            // const locale = detectLocale(navigatorDetector)

            // Load locales
            // (Use a data fetching solution that you prefer)
            const [localesLoaded, setLocalesLoaded] = useState(false) //replace with Suspense (React 18)
            // useEffect(() => {
            //     // setLocalesLoaded(false)
            //     console.log('load locale', _lang)
            // }, [_lang])

            useEffect(() => {
                const parLang = params?.lang?.[0]
                const finalLang = parLang ? parLang : _lang
                loadLocaleAsync(finalLang).then(() => setLocalesLoaded(true))
                setLang(finalLang)
            }, [])

            loadLocale(_lang)

            return <TypesafeI18n locale={_lang}>
                {children}
            </TypesafeI18n>
        }
    }
}

export function useLanguageQuery() {
    const [lang] = useConfig<string>('lang')
    return [{ lang }]
}