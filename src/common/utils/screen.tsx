import { useMediaQuery } from "react-responsive"
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../../tailwind.config.js'

const fullConfig = resolveConfig(tailwindConfig)

export const useScreen = () => {

    const isBigMobile = useMediaQuery({ minDeviceWidth: fullConfig.theme.screens.sm })
    const isTablet = useMediaQuery({ minDeviceWidth: fullConfig.theme.screens.md })
    const isDesktop = useMediaQuery({ minDeviceWidth: fullConfig.theme.screens.lg })

    if (isDesktop) return 'lg'
    if (isTablet) return 'md'
    if (isBigMobile) return 'sm'
    return 'xs'
}