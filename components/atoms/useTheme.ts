import { useEffect, useState } from "react";

export function useTheme(defaultTheme: string = 'light'): [string, (theme: string) => void] {
    const [theme, setTheme] = useState(() => {
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
                setTheme(item)
            }
        }

        window.addEventListener('storage', checkTheme)

        return () => {
            window.removeEventListener('storage', checkTheme)
        }
    }, [])

    useEffect(() => {
        window.localStorage.setItem("theme", theme)
        window.dispatchEvent(new Event("storage")); //This is the important part
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme])

    return [theme, setTheme]
}