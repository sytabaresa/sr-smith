import TypesafeI18n, { useI18nContext } from "./i18n-react";
import { useEffect, useState } from "react";
import { Locales } from "./i18n-types";
import { loadLocaleAsync } from "./i18n-util.async";
import { useRouter } from "@modules/router";
import { loadLocale } from "./i18n-util.sync";
import { locales } from "./i18n-util";
import { langAtom } from "@core/atoms/common";
import { useAtom } from "jotai";

export function useTranslation() {
    const { LL } = useI18nContext()

    // const { T } = useT();
    return {
        t: LL,
        TranslationWrapper: ({ children }: { children: preact.ComponentChildren, locale: Locales }) => {//<>{props.children}</>
            const { useParams } = useRouter()
            const params = useParams();
            const [lang, setLang] = useAtom(langAtom)
            // Detect locale
            // (Use as advanaced locale detection strategy as you like. 
            // More info: https://github.com/ivanhofer/typesafe-i18n/tree/main/packages/detectors)
            // const locale = detectLocale(navigatorDetector)

            const [localesLoaded, setLocalesLoaded] = useState(false) //replace with Suspense (React 18)


            useEffect(() => {
                const parLang = params?.lang?.[0]
                const finalLang = parLang && locales.includes(parLang) ? parLang : lang
                loadLocaleAsync(finalLang).then(() => setLocalesLoaded(true))
                setLang(finalLang)
            }, [])

            loadLocale(lang)

            return <TypesafeI18n locale={lang}>
                {children}
            </TypesafeI18n>
        }
    }
}

export function useLanguageQuery() {
    const [lang] = useAtom(langAtom)
    return [{ lang }]
}