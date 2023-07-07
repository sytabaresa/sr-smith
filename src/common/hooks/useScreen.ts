import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash"

export const useScreen = (reactive = false) => {
    // const tailwindData = { screens: null }
    // console.log(tailwindData)
    const [screen, setScreen] = useState(getCurrentBreakpoint())
    useEffect(() => {
        if (reactive && typeof window != 'undefined')
            window.addEventListener('resize', debounce(() => {
                const bp = getCurrentBreakpoint()
                // console.log('resize Event', bp)
                setScreen(bp)
            }, 200))

    }, [])


    return useMemo(() => screen, [screen])
}

export const getCurrentBreakpoint = (): string => {
    if (typeof window != 'undefined') {
        const breakpointUnknown: string = 'unknown';
        const breakpointXS: string | null = document.getElementById('breakpoint-xs')?.offsetParent === null ? null : 'xs';
        const breakpointSM: string | null = document.getElementById('breakpoint-sm')?.offsetParent === null ? null : 'sm';
        const breakpointMD: string | null = document.getElementById('breakpoint-md')?.offsetParent === null ? null : 'md';
        const breakpointLG: string | null = document.getElementById('breakpoint-lg')?.offsetParent === null ? null : 'lg';
        const breakpointXL: string | null = document.getElementById('breakpoint-xl')?.offsetParent === null ? null : 'xl';
        const breakpoint2XL: string | null = document.getElementById('breakpoint-2xl')?.offsetParent === null ? null : '2xl';
        const breakpoint = breakpointXS ?? breakpointSM ?? breakpointMD ?? breakpointLG ?? breakpointXL ?? breakpoint2XL ?? breakpointUnknown;
        return breakpoint;
    } else {
        return 'xs'
    }
};

export const isMobile = (s: string) => ['xs', 'sm'].includes(s)

export const isDesktop = (s: string) => ['lg', 'xl', '2xl'].includes(s)