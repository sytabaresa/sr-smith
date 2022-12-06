import { useMediaQuery } from "react-responsive"

export const useScreen = () => {
    // const tailwindData = { screens: null }
    // console.log(tailwindData)
    const screens = require('../../../screens.json')

    const { sm = '1px', md = '1px', lg = '1px' } = screens || {}
    const isBigMobile = useMediaQuery({ minDeviceWidth: sm })
    const isTablet = useMediaQuery({ minDeviceWidth: md })
    const isDesktop = useMediaQuery({ minDeviceWidth: lg })

    if (isDesktop) return 'lg'
    if (isTablet) return 'md'
    if (isBigMobile) return 'sm'
    return 'xs'
}