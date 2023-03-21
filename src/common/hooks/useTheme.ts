import { useEffect } from "react";
import { useConfig } from "./useConfig";

export const useTheme = (def: string = '') => {
    //       state config hooks
    const [theme, _setTheme] = useConfig('theme', def)
    useEffect(() => {
        // console.log('use', theme)
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme])

    return [theme, _setTheme] as [string, React.Dispatch<React.SetStateAction<string>>]
}