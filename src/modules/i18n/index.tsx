import { useConfig } from "@hooks/useConfig";
import TypesafeI18n, { useI18nContext } from "./i18n-react";
import { ReactNode, useEffect, useState } from "react";
import { Locales } from "./i18n-types";
import { loadLocaleAsync } from "./i18n-util.async";

export function useTranslation() {
    const { LL } = useI18nContext()


    // const { T } = useT();
    return {
        t: LL,
        TranslationWrapper: ({locale, children}: { children: ReactNode, locale: Locales }) => {//<>{props.children}</>
            useConfig('lang', locale)
            // Detect locale
            // (Use as advanaced locale detection strategy as you like. 
            // More info: https://github.com/ivanhofer/typesafe-i18n/tree/main/packages/detectors)
            // const locale = detectLocale(navigatorDetector)

            // Load locales
            // (Use a data fetching solution that you prefer)
            const [localesLoaded, setLocalesLoaded] = useState(false)
            useEffect(() => {
                loadLocaleAsync(locale).then(() => setLocalesLoaded(true))
            }, [locale])

            if (!localesLoaded) {
                return null
            }
            return <TypesafeI18n locale={locale}>
                {children}
            </TypesafeI18n>
        }
    }
}

export function useLanguageQuery() {
    const [lang] = useConfig<string>('lang')
    return [{ lang }]
}