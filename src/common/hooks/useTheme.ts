import { useEffect, useState } from "react";

export function useTheme(defaultTheme: string = 'light'): [string, (theme: string) => void] {
    const [_theme, _setTheme] = useState(() => {
        let item
        if (typeof window !== "undefined") {
            item = window.localStorage.getItem('theme')
            if (!item) {
                window.localStorage.setItem('theme', defaultTheme)
            }
        }
        return item || defaultTheme
    })

    useEffect(() => {
        function checkTheme() {
            const item = window.localStorage.getItem('theme')

            if (item) {
                _setTheme(item)
            }
        }

        window.addEventListener('storage', checkTheme)

        return () => {
            window.removeEventListener('storage', checkTheme)
        }
    }, [])

    useEffect(() => {
        setTheme(_theme)
    }, [_theme])

    return [_theme, _setTheme]
}

export function setTheme(theme: string) {
    window.localStorage.setItem("theme", theme)
    document.documentElement.setAttribute("data-theme", theme);
    window.dispatchEvent(new Event("storage")); //This is the important part
}

export function getTheme(): string {
    return window.localStorage.getItem("theme") as string
}