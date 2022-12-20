import { useEffect, useState } from "react"


const DEFAULT_LANG = 'es'

export function useTranslation() {
    return { t }
}


export function useLanguageQuery() {
    return [{ lang: 'es' }]
}

export function useLanguage(defaultLang: string = DEFAULT_LANG): [string, (config: string) => void] {
    const [lang, _setLang] = useState<string>(() => {
        let item
        if (typeof window !== "undefined") {
            item = window.localStorage.getItem('lang')
            if (!item) {
                window.localStorage.setItem('lang', defaultLang)
            }
        }
        return item || defaultLang
    })

    useEffect(() => {
        function checkConfig() {
            const item = window.localStorage.getItem('lang')

            if (item) {
                _setLang(item)
            }
        }

        window.addEventListener('storage', checkConfig)

        return () => {
            window.removeEventListener('storage', checkConfig)
        }
    }, [])

    useEffect(() => {
        window.localStorage.setItem("lang", lang)
        window.dispatchEvent(new Event("storage"));
    }, [lang])

    return [lang, _setLang]
}

function t(str: string) {
    return str
}