import { useEffect } from "react";
import { useConfig } from "./useConfig";

export const useTheme = () => {
    //       state config hooks
    const [theme, _setTheme] = useConfig('theme', 'light')
    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme])
}